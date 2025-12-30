'use client';

import { Select } from '@base-ui/react/select';
import { Category } from "@/lib/drizzle/schema";
import { ChevronDown, Check } from 'lucide-react';
import styles from './category-dropdown.module.css';

interface Props {
  initialCategories: Category[];
  defaultValue?: string;
}

export function CategoryDropdown({ initialCategories, defaultValue }: Props) {
  const items = initialCategories.map(cat => (
    { label: cat.name, value: cat.id }
  ));

  return (
    <Select.Root
      items={items}
      defaultValue={defaultValue || initialCategories[0].id}
      name="category"
    >
      <Select.Trigger className={styles.Select} aria-label="Select category">
        <Select.Value />
        <Select.Icon className={styles.SelectIcon}>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner className={styles.Positioner} sideOffset={8}>
          <Select.Popup className={styles.Popup}>
            <Select.ScrollUpArrow className={styles.ScrollArrow} />
            <Select.List className={styles.List}>
              {initialCategories.map(({ name, id }) => (
                <Select.Item key={id} value={id} className={styles.Item}>
                  <Select.ItemIndicator className={styles.ItemIndicator}>
                    <Check className={styles.ItemIndicatorIcon} />
                  </Select.ItemIndicator>
                  <Select.ItemText className={styles.ItemText}>{name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
            <Select.ScrollDownArrow className={styles.ScrollArrow} />
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
