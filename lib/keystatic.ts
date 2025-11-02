import { createReader } from '@keystatic/core/reader';
import keystaticConfig from '@/keystatic.config';
import * as fs from 'fs';
import * as path from 'path';

// Type definitions for news article entries
export interface NewsSource {
  name: string;
  url?: string;
}

export interface NewsEntry {
  title: string | { name: string; slug: string }; // Support both string and slug field format (with slugField, it will be object from fields.slug())
  slug?: { name: string; slug: string }; // Some entries have slug field
  date: string | null;
  // Old format (backward compatibility)
  source1?: string;
  source1Url?: string;
  source2?: string;
  source2Url?: string;
  source3?: string;
  source3Url?: string;
  // New format - readonly to match Keystatic return type
  sources?: readonly { readonly name: string; readonly url: string | null }[];
  summary?: string;
  tags?: readonly string[];
  content: any; // Document field (rich text structure) - now in content.mdoc file
  published?: boolean;
}

export interface NewsArticleEntry {
  entry: NewsEntry;
  slug: string;
}

export interface TransformedNewsArticle {
  title: string;
  date: string;
  excerpt: string;
  sources: NewsSource[];
  sourceUrl?: string; // First source URL for title link (external posts only)
  slug: string;
  published: boolean;
  isInternal: boolean; // true if no sources (internal post), false if has sources (external news)
}

export const reader = createReader(process.cwd(), keystaticConfig);

// Extract plain text from Keystatic document field (for excerpt generation)
// Handles both Markdoc AST format and plain Markdown strings
function extractTextFromDocument(content: any): string {
  if (!content) return '';
  
  // If it's already a string (Markdown or plain text), strip Markdown formatting
  if (typeof content === 'string') {
    // Remove Markdown syntax for excerpt
    return content
      .replace(/#{1,6}\s+/g, '') // Headers
      .replace(/\*\*(.*?)\*\*/g, '$1') // Bold
      .replace(/\*(.*?)\*/g, '$1') // Italic
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Links
      .replace(/`([^`]+)`/g, '$1') // Code
      .replace(/<[^>]*>/g, '') // HTML tags
      .trim();
  }
  
  // If it's a function (Keystatic Markdoc document), call it to get elements
  if (typeof content === 'function') {
    try {
      const result = content();
      // Recursively process the result (might be array or object)
      return extractTextFromDocument(result);
    } catch (e) {
      // If calling fails, return empty string
      return '';
    }
  }
  
  // If it's an array of elements, extract text recursively
  if (Array.isArray(content)) {
    const texts: string[] = [];
    for (const element of content) {
      if (typeof element === 'string') {
        texts.push(element);
      } else if (element && typeof element === 'object') {
        // Markdoc format: elements have 'type' (paragraph, heading, strong, etc.) and 'children' array
        // Traverse the children array recursively - this is the primary way to extract text
        
        // First priority: children array (Markdoc AST structure)
        if (Array.isArray(element.children)) {
          const childText = extractTextFromDocument(element.children);
          if (childText) texts.push(childText);
        }
        // Second priority: text property (direct text nodes)
        else if (element.text && typeof element.text === 'string') {
          texts.push(element.text);
        }
        // Third priority: content property (some Markdoc nodes)
        else if (element.content) {
          if (typeof element.content === 'string') {
            texts.push(element.content);
          } else {
            const contentText = extractTextFromDocument(element.content);
            if (contentText) texts.push(contentText);
          }
        }
        // Fourth priority: direct string children
        else if (typeof element.children === 'string') {
          texts.push(element.children);
        }
        // Fifth priority: value property (some nodes store text here)
        else if (element.value && typeof element.value === 'string') {
          texts.push(element.value);
        }
      }
    }
    return texts.filter(Boolean).join(' ').trim();
  }
  
  // If it's a single element with children
  if (content && typeof content === 'object') {
    // Check for children array
    if (Array.isArray(content.children)) {
      return extractTextFromDocument(content.children);
    }
    // Check for text property
    if (content.text && typeof content.text === 'string') {
      return content.text;
    }
    // Check for content property
    if (content.content && typeof content.content === 'string') {
      return content.content;
    }
    // If children is a string
    if (typeof content.children === 'string') {
      return content.children;
    }
  }
  
  return '';
}

// Generate excerpt from content (trim to ~200 characters)
function generateExcerpt(content: any, maxLength: number = 200): string {
  // Extract plain text from document field
  const textContent = extractTextFromDocument(content);
  if (!textContent) return '';
  
  // Remove extra whitespace and newlines
  const cleaned = textContent.replace(/\s+/g, ' ').trim();
  
  // If content is shorter than maxLength, return as is
  if (cleaned.length <= maxLength) return cleaned;
  
  // Trim to maxLength and find the last complete word
  let trimmed = cleaned.substring(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(' ');
  
  // If we found a space near the end, trim there (more natural break)
  if (lastSpace > maxLength * 0.8) {
    trimmed = trimmed.substring(0, lastSpace);
  }
  
  return trimmed + '...';
}

// Get all published news articles, sorted by date (newest first)
export async function getAllNewsArticles() {
  const allArticles = await reader.collections.news.all();
  
  return allArticles
    .filter((article) => article.entry.published !== false && article.entry.date)
    .sort((a, b) => {
      const dateA = a.entry.date ? new Date(a.entry.date).getTime() : 0;
      const dateB = b.entry.date ? new Date(b.entry.date).getTime() : 0;
      return dateB - dateA; // Newest first
    });
}

// Get single news article by slug
export async function getNewsArticle(slug: string) {
  return await reader.collections.news.read(slug);
}

// Transform Keystatic article to component-friendly format
export function transformNewsArticle(article: NewsArticleEntry): TransformedNewsArticle {
  const entry = article.entry;
  
  // Extract title - handle slug field format { name: "...", slug: "..." }
  let title = '';
  if (entry.title && typeof entry.title === 'object' && entry.title.name) {
    // Handle slug field format { name: "...", slug: "..." }
    title = entry.title.name.trim();
  } else if (entry.title && typeof entry.title === 'string') {
    // Fallback: handle direct title string (for backward compatibility)
    title = entry.title.trim();
  } else if (!title && article.slug) {
    // Fallback: generate title from slug
    title = article.slug
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // Convert date to readable format (e.g., "October 29, 2025")
  const formattedDate = entry.date
    ? new Date(entry.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  // Collect sources with their URLs (only non-empty ones)
  const sources: NewsSource[] = [];
  let sourceUrl: string | undefined = undefined;

  // Primary: Check for sources array (new format)
  if (entry.sources && Array.isArray(entry.sources) && entry.sources.length > 0) {
    for (const source of entry.sources) {
      if (source && typeof source === 'object') {
        const sourceName = source.name && typeof source.name === 'string' ? source.name.trim() : '';
        const sourceUrlValue = source.url && typeof source.url === 'string' ? source.url.trim() : undefined;
        if (sourceName) {
          sources.push({ name: sourceName, url: sourceUrlValue });
          if (!sourceUrl && sourceUrlValue) {
            sourceUrl = sourceUrlValue; // First source URL for title link
          }
        }
      }
    }
  }

  // Fallback: Check for old format (source1, source2, source3) for backward compatibility
  if (sources.length === 0) {
    // Source 1
    if (entry.source1 && entry.source1.trim()) {
      const source1Name = entry.source1.trim();
      const source1Url = entry.source1Url && entry.source1Url.trim() ? entry.source1Url.trim() : undefined;
      sources.push({ name: source1Name, url: source1Url });
      if (!sourceUrl && source1Url) {
        sourceUrl = source1Url; // First source URL for title link (backward compatibility)
      }
    }

    // Source 2
    if (entry.source2 && entry.source2.trim()) {
      const source2Name = entry.source2.trim();
      const source2Url = entry.source2Url && entry.source2Url.trim() ? entry.source2Url.trim() : undefined;
      sources.push({ name: source2Name, url: source2Url });
      if (!sourceUrl && source2Url) {
        sourceUrl = source2Url;
      }
    }

    // Source 3
    if (entry.source3 && entry.source3.trim()) {
      const source3Name = entry.source3.trim();
      const source3Url = entry.source3Url && entry.source3Url.trim() ? entry.source3Url.trim() : undefined;
      sources.push({ name: source3Name, url: source3Url });
      if (!sourceUrl && source3Url) {
        sourceUrl = source3Url;
      }
    }
  }

  // Determine if this is an internal post (no sources) or external news (has sources)
  const isInternal = sources.length === 0;
  // For internal posts, don't set sourceUrl (will link to internal page instead)
  if (isInternal) {
    sourceUrl = undefined;
  }

  // Generate excerpt from full content (extract text from Markdoc document field)
  // The content field with format: { contentField: 'content' } returns a function
  // that when called returns Markdoc AST nodes with type and children properties
  
  let excerpt = '';
  
  // Try multiple extraction strategies
  if (entry.content) {
    // Strategy 1: Extract text from Markdoc AST structure
    let rawText = extractTextFromDocument(entry.content);
    
    // Strategy 2: If function, try calling it and inspecting result
    if (!rawText && typeof entry.content === 'function') {
      try {
        const result = entry.content();
        // Result might be an array or object - extract recursively
        rawText = extractTextFromDocument(result);
        
        // If still no text, try inspecting the structure
        if (!rawText && Array.isArray(result)) {
          // Try to extract text from first few elements
          const firstElements = result.slice(0, 3);
          rawText = extractTextFromDocument(firstElements);
        }
      } catch (e) {
        // Function call failed, continue with other strategies
      }
    }
    
    // Strategy 3: If still no text, read the content.mdoc file directly
    if (!rawText) {
      try {
        // New structure: content is in content/news/{slug}/content.mdoc
        const contentFilePath = path.join(process.cwd(), 'content', 'news', article.slug, 'content.mdoc');
        if (fs.existsSync(contentFilePath)) {
          const bodyContent = fs.readFileSync(contentFilePath, 'utf-8').trim();
          if (bodyContent.length > 0) {
            // Extract first meaningful paragraph (skip HTML tags, get text)
            // Remove HTML tags first
            let textContent = bodyContent
              .replace(/<[^>]*>/g, ' ') // Replace HTML tags with space
              .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Convert markdown links to text
              .replace(/\*\*(.*?)\*\*/g, '$1') // Remove bold
              .replace(/\*(.*?)\*/g, '$1') // Remove italic
              .replace(/`([^`]+)`/g, '$1') // Remove code
              .replace(/\s+/g, ' ') // Normalize whitespace
              .trim();
            
            // Get first sentence or first 200 chars
            if (textContent.length > 20) {
              const sentences = textContent.match(/[^.!?]+[.!?]+/g);
              if (sentences && sentences.length > 0) {
                rawText = sentences[0].trim();
                // If sentence is too short, add another
                if (rawText.length < 50 && sentences.length > 1) {
                  rawText = sentences.slice(0, 2).join(' ').trim();
                }
              } else {
                // No sentence breaks, get first 200 chars
                rawText = textContent.substring(0, 200).trim();
              }
            }
          }
        }
      } catch (e) {
        // File read failed, continue
      }
    }
    
    // If we got text, clean it up and create excerpt
    if (rawText && rawText.length > 0) {
      // Clean up the text - remove HTML tags and extra whitespace
      const cleaned = rawText
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/&nbsp;/g, ' ') // Replace HTML entities
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/\s+/g, ' ') // Normalize whitespace
        .trim();
      
      if (cleaned.length > 20) {
        // Try to get first complete sentence(s)
        const sentences = cleaned.match(/[^.!?]+[.!?]+/g);
        if (sentences && sentences.length > 0) {
          let combined = sentences[0].trim();
          // If first sentence is short, try to get another
          if (combined.length < 50 && sentences.length > 1) {
            combined = sentences.slice(0, 2).join(' ').trim();
          }
          
          if (combined.length > 20 && combined.length < 300) {
            excerpt = combined;
          } else if (combined.length >= 300) {
            // Too long, truncate at word boundary
            excerpt = combined.substring(0, 200).trim();
            const lastSpace = excerpt.lastIndexOf(' ');
            if (lastSpace > 150) {
              excerpt = excerpt.substring(0, lastSpace).trim();
            }
            excerpt += '...';
          } else {
            // Too short, use first 200 chars
            excerpt = cleaned.substring(0, 200).trim();
            const lastSpace = excerpt.lastIndexOf(' ');
            if (lastSpace > 150) {
              excerpt = excerpt.substring(0, lastSpace).trim();
            }
            if (cleaned.length > 200) excerpt += '...';
          }
        } else {
          // No sentence breaks, just truncate at word boundary
          excerpt = cleaned.substring(0, 200).trim();
          const lastSpace = excerpt.lastIndexOf(' ');
          if (lastSpace > 150) {
            excerpt = excerpt.substring(0, lastSpace).trim();
          }
          if (cleaned.length > 200) excerpt += '...';
        }
      }
    }
  }
  
  // Final fallback
  if (!excerpt || excerpt.length === 0) {
    excerpt = 'No excerpt available.';
  }

  return {
    title: title || article.slug || 'Untitled',
    date: formattedDate,
    excerpt: excerpt || 'No excerpt available.',
    sources,
    sourceUrl,
    slug: article.slug,
    published: entry.published ?? true, // Default to true if not set
    isInternal,
  };
}

