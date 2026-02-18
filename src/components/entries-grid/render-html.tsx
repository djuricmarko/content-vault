'use client';

import { useSyncExternalStore } from "react";
import DOMPurify from 'isomorphic-dompurify';

const emptySubscribe = () => () => {};

export function RenderHtml({ className, html }: { className?: string; html: string }) {
  const isClient = useSyncExternalStore(emptySubscribe, () => true, () => false);
  // Sanitized via DOMPurify to prevent XSS before injecting HTML
  const cleanHtml = DOMPurify.sanitize(html);

  return <div className={className} dangerouslySetInnerHTML={{ __html: isClient ? cleanHtml : '' }} />;
}
