import React from 'react';
import { createElement } from 'react';
import SanitizedHTML from './SanitizedHTML';

// Server-safe version without DOMPurify - basic sanitization
function basicSanitize(html: string): string {
  // Remove script tags and event handlers (basic XSS protection)
  return html
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+="[^"]*"/gi, '')
    .replace(/on\w+='[^']*'/gi, '')
    .replace(/javascript:/gi, '');
}

export function renderMarkdoc(content: any): React.ReactNode {
  if (!content) return null;
  
  // If content is a function (Keystatic document), call it
  if (typeof content === 'function') {
    try {
      const elements = content();
      
      // Render document elements recursively
      return renderDocumentElements(elements);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Error calling content function:', error);
      }
      return null;
    }
  }
  
  // If content is already an array of elements
  if (Array.isArray(content)) {
    return renderDocumentElements(content);
  }
  
  // If content is a single object (not an array), wrap it in an array
  if (content && typeof content === 'object') {
    return renderDocumentElements([content]);
  }
  
  // If content is a string, render as HTML (for imported posts) - sanitize for XSS protection
  if (typeof content === 'string') {
    // Use basic sanitization on server, enhanced sanitization on client
    const serverSanitized = basicSanitize(content);
    return <SanitizedHTML html={serverSanitized} />;
  }
  
  return null;
}

function renderDocumentElements(elements: any): React.ReactNode {
  // Ensure elements is an array
  if (!elements) {
    return null;
  }
  
  // If it's not an array, try to convert it
  let elementsArray: any[];
  if (Array.isArray(elements)) {
    elementsArray = elements;
  } else if (typeof elements === 'object') {
    // Single object - wrap it in an array
    elementsArray = [elements];
  } else {
    // Not an object or array, return null
    return null;
  }
  
  return elementsArray.map((element, index) => {
    if (typeof element === 'string') {
      return <React.Fragment key={index}>{element}</React.Fragment>;
    }
    
    if (!element || typeof element !== 'object') {
      return null;
    }
    
    const { type, children, ...props } = element;
    
    switch (type) {
      case 'paragraph':
        return (
          <p key={index} {...props}>
            {renderDocumentElements(children || [])}
          </p>
        );
      
      case 'heading':
        const level = props.level || 1;
        const HeadingTag = `h${level}`;
        return createElement(
          HeadingTag,
          { key: index, ...props },
          renderDocumentElements(children || [])
        );
      
      case 'strong':
        return (
          <strong key={index} {...props}>
            {renderDocumentElements(children || [])}
          </strong>
        );
      
      case 'emphasis':
        return (
          <em key={index} {...props}>
            {renderDocumentElements(children || [])}
          </em>
        );
      
      case 'link':
        return (
          <a key={index} href={props.href} {...props}>
            {renderDocumentElements(children || [])}
          </a>
        );
      
      case 'list':
        const ListTag = props.ordered ? 'ol' : 'ul';
        return (
          <ListTag key={index} {...props}>
            {renderDocumentElements(children || [])}
          </ListTag>
        );
      
      case 'listItem':
        return (
          <li key={index} {...props}>
            {renderDocumentElements(children || [])}
          </li>
        );
      
      case 'code':
        return (
          <code key={index} {...props}>
            {renderDocumentElements(children || [])}
          </code>
        );
      
      case 'codeBlock':
        return (
          <pre key={index} {...props}>
            <code>
              {renderDocumentElements(children || [])}
            </code>
          </pre>
        );
      
      case 'blockquote':
        return (
          <blockquote key={index} {...props}>
            {renderDocumentElements(children || [])}
          </blockquote>
        );
      
      case 'image':
        return (
          <img key={index} src={props.src} alt={props.alt || ''} {...props} />
        );
      
      case 'hardBreak':
        return <br key={index} />;
      
      case 'horizontalRule':
        return <hr key={index} {...props} />;
      
      default:
        // For unknown types, try to render children
        if (children) {
          return (
            <div key={index} {...props}>
              {renderDocumentElements(children)}
            </div>
          );
        }
        return null;
    }
  });
}

