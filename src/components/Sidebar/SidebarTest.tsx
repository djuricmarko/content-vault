'use client';

import Link from "next/link";
import * as Dialog from '@radix-ui/react-dialog';
import * as VisuallyHidden from '@radix-ui/react-visually-hidden';
import { Menu, X, Home, Settings, User } from 'lucide-react';
import styles from './sidebar.module.css';
import { useState } from "react";

const NavLinks = () => (
  <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
    <Link href="/" className={styles.navLink}><Home size={18} /> Home</Link>
    <Link href="/profile" className={styles.navLink}><User size={18} /> Profile</Link>
    <Link href="/settings" className={styles.navLink}><Settings size={18} /> Settings</Link>
  </nav>
);

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* 1. Desktop Static Sidebar */}
      <aside className={styles.desktopSidebar}>
        <h2>MyApp</h2>
        <NavLinks />
      </aside>

      {/* 2. Mobile Off-Canvas Sidebar (using Radix Dialog) */}
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className={styles.mobileTrigger}>
            <Menu size={24} />
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className={styles.overlay} />
          <Dialog.Content className={styles.content}>

            {/* Accessibility: Title is required by Radix Dialog */}
            <Dialog.Title style={{ marginBottom: '20px', fontWeight: 'bold' }}>
              Menu
            </Dialog.Title>

            {/* Optional: Description for screen readers */}
            <VisuallyHidden.Root>
              <Dialog.Description>
                Mobile navigation menu
              </Dialog.Description>
            </VisuallyHidden.Root>

            <NavLinks />

            <Dialog.Close asChild>
              <button className={styles.closeButton} aria-label="Close">
                <X size={24} />
              </button>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
