'use client';

import { Dialog } from "@base-ui/react/dialog";
import { XIcon } from "lucide-react";
import styles from "./close-button.module.css";

interface Props {
  label?: string;
}

export function CloseButton({ label = "Close" }: Props) {
  return (
    <Dialog.Close className={styles.closeButton} aria-label={label}>
      <XIcon size={20} />
    </Dialog.Close>
  );
}
