'use client';

import { useEffect, useState } from 'react';
import { Interweave } from 'interweave';

export function RenderHtml({ className, html }: { className: string, html: string }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsClient(true);
  }, []);

  return isClient ? <Interweave suppressHydrationWarning content={html} className={className} /> : <span>Content</span>;
}
