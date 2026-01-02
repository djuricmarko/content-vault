'use client';

import { useState, useEffect } from 'react';
import { Dialog } from '@base-ui/react/dialog';
import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from '@/components/theme-provider';
import { Button } from '@/components/button';
import { CloseButton } from '@/components/close-button';
import styles from './settings-dialog.module.css';

type Theme = 'light' | 'dark' | 'system';

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const themeOptions: { value: Theme; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Monitor },
];

export function SettingsDialog({ open, onOpenChange }: Props) {
  const { theme, setTheme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState<Theme>(theme);

  useEffect(() => {
    if (open) {
      queueMicrotask(() => setSelectedTheme(theme));
    }
  }, [open, theme]);

  const handleCancel = () => {
    setSelectedTheme(theme);
    onOpenChange(false);
  };

  const handleSave = () => {
    setTheme(selectedTheme);
    onOpenChange(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Backdrop className={styles.overlay} />
        <Dialog.Popup className={styles.content}>
          <Dialog.Title className={styles.title}>Settings</Dialog.Title>
          <Dialog.Description className={styles.description}>
            Customize your experience
          </Dialog.Description>

          <div className={styles.section}>
            <label className={styles.sectionLabel}>Appearance</label>
            <div className={styles.themeOptions}>
              {themeOptions.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  className={`${styles.themeOption} ${selectedTheme === value ? styles.themeOptionSelected : ''}`}
                  onClick={() => setSelectedTheme(value)}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            <Button variant="secondary" onClick={handleCancel}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save
            </Button>
          </div>

          <CloseButton label="Close settings" />
        </Dialog.Popup>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
