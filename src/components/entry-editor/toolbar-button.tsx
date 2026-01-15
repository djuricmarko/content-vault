'use client';

import type { ReactNode } from 'react';
import { Tooltip } from '@base-ui/react/tooltip';
import { Toolbar } from '@base-ui/react/toolbar';
import styles from './entry-editor.module.css';

interface ToolbarButtonProps {
  value?: string;
  'aria-label': string;
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
  tooltip: string;
}

export function ToolbarButton({
  tooltip,
  children,
  className,
  ...buttonProps
}: ToolbarButtonProps) {
  return (
    <Tooltip.Provider delay={100}>
      <Tooltip.Root>
        <Tooltip.Trigger
          render={<Toolbar.Button className={className} {...buttonProps} />}
        >
          {children}
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={6}>
            <Tooltip.Popup className={styles.tooltip}>
              {tooltip}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
