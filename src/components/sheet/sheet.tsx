'use client';

import { ReactNode } from "react";
import { Dialog } from '@base-ui/react/dialog';
import { XIcon } from "lucide-react";
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
          <Dialog.Close className={styles.close}>
            <XIcon size={20} />
          </Dialog.Close>
          {children}
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
