'use client';

import { useActionState, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { createCategory } from "@/actions/createCategory";
import { Dialog } from "@/components/dialog";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import styles from './add-category.module.css';

export function AddCategory() {
  const [state, formAction, isPending] = useActionState(createCategory, { success: false, error: '' });
  const [open, setOpen] = useState(false);
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      queueMicrotask(() => setOpen(false));
      formRef.current?.reset();
      router.push(`/dashboard/category/${state.id}`)
    }
  }, [router, state]);

  return (
    <Dialog
      trigger="Create new category"
      icon="plus"
      title="Create new category"
      description="Enter the name of the new category"
      open={open}
      setOpen={setOpen}
    >
      <form action={formAction} className={styles.form}>
        <div className={styles.inputWrapper}>
          <Input
            type="text"
            name="name"
            placeholder="Enter category name"
          />
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
