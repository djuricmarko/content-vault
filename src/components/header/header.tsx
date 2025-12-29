'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { Menu } from '@base-ui/react/menu';
import { AlertDialog } from '@base-ui/react/alert-dialog';
import { Ellipsis, Trash } from "lucide-react";
import { deleteCategory } from "@/actions/deleteCategory";
import { Button } from "@/components/button";
import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  categoryId?: string;
}

export function Header({ title, categoryId }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = () => {
    if (!categoryId) return;

    startTransition(async () => {
      const result = await deleteCategory(categoryId);

      if (result.success) {
        setOpen(false);
        router.push('/dashboard');
      } else {
        setError(result.error ?? 'Failed to delete category');
      }
    });
  };

  return (
    <div className={styles.title}>
      <h2>{title}</h2>
      {categoryId && (
        <>
          <Menu.Root>
            <Menu.Trigger className={styles.options}>
              <Ellipsis />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={10}>
                <Menu.Popup className={styles.dropdownContent}>
                  <Menu.Item
                    className={styles.dropdownItem}
                    onClick={() => setOpen(true)}
                  >
                    <Trash size={16} color="red" />
                    Delete
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>

          <AlertDialog.Root open={open} onOpenChange={setOpen}>
            <AlertDialog.Portal>
              <AlertDialog.Backdrop className={styles.overlay} />
              <AlertDialog.Popup className={styles.dialogContent}>
                <AlertDialog.Title className={styles.dialogTitle}>
                  Are you sure you want to delete this category?
                </AlertDialog.Title>
                <AlertDialog.Description className={styles.dialogDescription}>
                  Deleting this category will also permanently delete all entries belonging to it. This action cannot be undone.
                </AlertDialog.Description>
                {error && <p className={styles.error}>{error}</p>}
                <div className={styles.dialogActions}>
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
        </>
      )}
    </div>
  );
}
