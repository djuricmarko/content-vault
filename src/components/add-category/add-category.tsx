'use client';

import { useActionState, useState, useRef } from "react";
import { createCategory } from "@/actions/createCategory";
import { Dialog } from "@/components/dialog";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { IconPicker } from "@/components/icon-picker";
import styles from './add-category.module.css';

interface Props {
  triggerClassName?: string;
}

export function AddCategory({ triggerClassName }: Props) {
  const [state, formAction, isPending] = useActionState(createCategory, { success: false, error: '' });
  const [open, setOpen] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <Dialog
      trigger="Create new category"
      icon="plus"
      title="Create new category"
      description="Enter the name of the new category"
      open={open}
      setOpen={setOpen}
      triggerClassName={triggerClassName}
    >
      <form ref={formRef} action={formAction} className={styles.form}>
        <div className={styles.inputWrapper}>
          <div className={styles.inputRow}>
            <Input
              type="text"
              name="name"
              placeholder="Enter category name"
            />
            <IconPicker name="icon" />
          </div>
          {state?.error && <p className={styles.error}>{state.error}</p>}
        </div>
        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </Dialog>
  );
}
