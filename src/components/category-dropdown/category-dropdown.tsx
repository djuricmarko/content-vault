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
      <Select.Trigger className={styles.select} aria-label="Select category">
        <Select.Value className={styles.selectValue} />
        <Select.Icon className={styles.selectIcon}>
          <ChevronDown />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={5} alignItemWithTrigger={false}>
          <Select.Popup className={styles.popup}>
            <Select.ScrollUpArrow className={styles.scrollArrow} />
            <Select.List className={styles.list}>
              {initialCategories.map(({ name, id }) => (
                <Select.Item key={id} value={id} className={styles.item}>
                  <Select.ItemIndicator className={styles.itemIndicator}>
                    <Check className={styles.itemIndicatorIcon} />
                  </Select.ItemIndicator>
                  <Select.ItemText className={styles.itemText}>{name}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
            <Select.ScrollDownArrow className={styles.scrollArrow} />
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
