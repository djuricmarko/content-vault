'use client';

import { useEffect, useState } from "react";
import DOMPurify from 'isomorphic-dompurify';

export function RenderHtml({ className, html }: { className: string, html: string }) {
  const [isClient, setIsClient] = useState(false);
  const cleanHtml = DOMPurify.sanitize(html);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  return <div className={className} dangerouslySetInnerHTML={{ __html: isClient ? cleanHtml : '' }} />;
}
