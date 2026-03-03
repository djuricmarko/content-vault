'use client';

import { useState } from 'react';
import { Menu } from '@base-ui/react/menu';
import { Ellipsis, Trash } from "lucide-react";
import { DeleteCategoryDialog } from "@/components/delete-category-dialog";
import styles from "./header.module.css";

interface Props {
  categoryId?: string;
}

export function Header({ categoryId }: Props) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <div className={styles.header}>
      {categoryId && (
        <>
          <Menu.Root>
            <Menu.Trigger className={styles.options} aria-label="Category options">
              <Ellipsis />
            </Menu.Trigger>
            <Menu.Portal>
              <Menu.Positioner sideOffset={10}>
                <Menu.Popup className={styles.dropdownContent}>
                  <Menu.Item
                    className={styles.dropdownItem}
                    onClick={() => setDeleteDialogOpen(true)}
                  >
                    <Trash size={16} color="red" />
                    Delete
                  </Menu.Item>
                </Menu.Popup>
              </Menu.Positioner>
            </Menu.Portal>
          </Menu.Root>
          <DeleteCategoryDialog
            categoryId={categoryId}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
          />
        </>
      )}
    </div>
  );
}
