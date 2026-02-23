'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { deleteCategory } from "@/actions/deleteCategory";
import { useToast } from "@/components/toast";
import { Button } from "@/components/button";
import styles from './delete-category-dialog.module.css';

interface Props {
  categoryId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function DeleteCategoryDialog({ categoryId, open, onOpenChange }: Props) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const toastManager = useToast();

  function handleDelete() {
    startTransition(async () => {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        onOpenChange(false);
        toastManager.add({
          type: "success",
          title: "Category deleted",
          description: "The category and its entries have been removed.",
        });
        router.push('/dashboard');
      } else {
        setError(result.error ?? 'Failed to delete category');
      }
    });
  }

  return (
    <AlertDialog.Root open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Backdrop className={styles.overlay} />
        <AlertDialog.Popup className={styles.content}>
          <AlertDialog.Title className={styles.title}>
            Are you sure you want to delete this category?
          </AlertDialog.Title>
          <AlertDialog.Description className={styles.description}>
            Deleting this category will also permanently delete all entries belonging to it. This action cannot be undone.
          </AlertDialog.Description>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.actions}>
            <AlertDialog.Close render={<Button variant="secondary" />}>
              Cancel
            </AlertDialog.Close>
            <Button
              onClick={handleDelete}
              disabled={isPending}
              className={styles.deleteButton}
            >
              {isPending ? 'Deleting...' : 'Confirm'}
            </Button>
          </div>
        </AlertDialog.Popup>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
