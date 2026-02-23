'use client';

import { ReactNode } from "react";
import { Toast } from "@base-ui/react/toast";
import { DynamicIcon } from "lucide-react/dynamic";
import { toastManager } from "@/lib/toast-manager";
import styles from "./toast.module.css";

export function ToastProvider({ children }: { children: ReactNode }) {
  return (
    <Toast.Provider toastManager={toastManager} timeout={40000}>
      {children}
      <Toast.Portal>
        <Toast.Viewport className={styles.viewport}>
          <ToastList />
        </Toast.Viewport>
      </Toast.Portal>
    </Toast.Provider>
  );
}

function ToastList() {
  const { toasts } = Toast.useToastManager();

  return toasts.map((toast) => (
    <Toast.Root key={toast.id} toast={toast} className={styles.root}>
      <Toast.Content className={styles.content}>
        <div className={styles.icon} data-type={toast.type}>
          {toast.type === "success" && <DynamicIcon name="circle-check" size={18} />}
          {toast.type === "error" && <DynamicIcon name="circle-x" size={18} />}
        </div>
        <div className={styles.text}>
          <Toast.Title className={styles.title} />
          <Toast.Description className={styles.description} />
        </div>
        <Toast.Close className={styles.close} aria-label="Dismiss notification">
          <DynamicIcon name="x" size={14} />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
  ));
}

export function useToast() {
  return Toast.useToastManager();
}
