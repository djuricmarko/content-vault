'use client';

import { ReactNode } from "react";
import { Dialog } from '@base-ui/react/dialog';
import { CloseButton } from "@/components/close-button";
import styles from './sheet.module.css';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export function Sheet({ open, onOpenChange, children }: Props) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.overlay} />
        <Dialog.Popup className={styles.content}>
          <CloseButton label="Close menu" />
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
