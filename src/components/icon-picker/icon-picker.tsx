"use client";

import { Select } from "@base-ui/react/select";
import { Check } from "lucide-react";
import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import styles from "./icon-picker.module.css";

const ICONS: { name: IconName; label: string }[] = [
  { name: "folder", label: "Folder" },
  { name: "book", label: "Book" },
  { name: "bookmark", label: "Bookmark" },
  { name: "star", label: "Star" },
  { name: "heart", label: "Heart" },
  { name: "code", label: "Code" },
  { name: "music", label: "Music" },
  { name: "camera", label: "Camera" },
  { name: "globe", label: "Globe" },
  { name: "briefcase", label: "Briefcase" },
  { name: "graduation-cap", label: "Graduation Cap" },
  { name: "lightbulb", label: "Lightbulb" },
  { name: "palette", label: "Palette" },
  { name: "shopping-bag", label: "Shopping Bag" },
  { name: "gamepad-2", label: "Gamepad" },
  { name: "plane", label: "Plane" },
  { name: "home", label: "Home" },
  { name: "utensils", label: "Utensils" },
  { name: "dumbbell", label: "Dumbbell" },
  { name: "leaf", label: "Leaf" },
  { name: "film", label: "Film" },
  { name: "pen", label: "Pen" },
  { name: "coffee", label: "Coffee" },
  { name: "archive", label: "Archive" },
];

interface Props {
  name: string;
  defaultValue?: string;
}

export function IconPicker({ name, defaultValue = "folder" }: Props) {
  return (
    <Select.Root defaultValue={defaultValue} name={name}>
      <Select.Trigger className={styles.trigger} aria-label="Choose an icon">
        <Select.Value className={styles.triggerValue}>
          {(value) => <DynamicIcon name={value as IconName} size={16} />}
        </Select.Value>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner sideOffset={5} collisionPadding={10} alignItemWithTrigger={false}>
          <Select.Popup className={styles.popup}>
            <Select.ScrollUpArrow className={styles.scrollArrow} />
            <Select.List className={styles.list}>
              {ICONS.map(({ name: iconName, label }) => (
                <Select.Item key={iconName} value={iconName} className={styles.item}>
                  <Select.ItemIndicator className={styles.itemIndicator}>
                    <Check className={styles.itemIndicatorIcon} />
                  </Select.ItemIndicator>
                  <Select.ItemText className={styles.itemText}>
                    <DynamicIcon name={iconName} size={14} />
                    <span>{label}</span>
                  </Select.ItemText>
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
