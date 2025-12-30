'use client';

import { ReactNode } from "react";
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { XIcon } from "lucide-react";
import styles from './dialog.module.css';

interface Props {
  trigger: string,
  icon: IconName,
  title: string,
  description: string,
  open?: boolean,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>
  children: ReactNode
}

export function Dialog({
  trigger,
  icon,
  title,
  description,
  open,
  setOpen,
  children
}: Props) {
  return (
    <BaseDialog.Root open={open} onOpenChange={setOpen}>
      <BaseDialog.Trigger className={styles.trigger}>
        <DynamicIcon name={icon} size={16} />
        {trigger}
      </BaseDialog.Trigger>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.overlay} />
        <BaseDialog.Popup className={styles.content}>
          <BaseDialog.Title className={styles.title}>
            {title}
          </BaseDialog.Title>
          <BaseDialog.Description className={styles.description}>
            {description}
          </BaseDialog.Description>
          {children}
          <BaseDialog.Close className={styles.close} aria-label="Close dialog">
            <XIcon size={25} />
          </BaseDialog.Close>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
