'use client';

import { Dialog as RadixDialog } from 'radix-ui';
import { Plus, XIcon } from "lucide-react";
import styles from './dialog.module.css';
import { ReactNode } from "react";

interface Props {
  trigger: string,
  title: string,
  description: string,
  children: ReactNode
}

export function Dialog({ trigger, title, description, children }: Props) {
  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger className={styles.trigger}>
        <Plus size={16} />
        {trigger}
      </RadixDialog.Trigger>
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content className={styles.content}>
          <RadixDialog.Title className={styles.title}>
            {title}
          </RadixDialog.Title>
          <RadixDialog.Description className={styles.description}>
            {description}
          </RadixDialog.Description>
          {children}
          <RadixDialog.Close asChild>
            <button className={styles.close} aria-label="Close">
              <XIcon size={25} />
            </button>
          </RadixDialog.Close>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
