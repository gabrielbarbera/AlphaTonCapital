'use client';

import { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';

interface SanitizedHTMLProps {
  html: string;
}

export default function SanitizedHTML({ html }: SanitizedHTMLProps) {
  const [sanitized, setSanitized] = useState(html);

  useEffect(() => {
    // Enhanced client-side sanitization with DOMPurify
    const cleaned = DOMPurify.sanitize(html, {
      ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 's', 'a', 'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'blockquote', 'pre', 'code', 'img', 'hr'],
      ALLOWED_ATTR: ['href', 'src', 'alt', 'title', 'target', 'rel'],
      ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    });
    setSanitized(cleaned);
  }, [html]);

  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}

