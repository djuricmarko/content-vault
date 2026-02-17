"use client";

import { useState } from "react";
import {
  Folder,
  Book,
  Star,
  Heart,
  Code,
  Music,
  Camera,
  Globe,
  Briefcase,
  GraduationCap,
  Lightbulb,
  Palette,
  ShoppingBag,
  Gamepad2,
  Plane,
  Home,
  Utensils,
  Dumbbell,
  Leaf,
  Film,
  Pen,
  Coffee,
  Bookmark,
  Archive,
  type LucideIcon,
} from "lucide-react";
import styles from "./icon-picker.module.css";

const ICONS: { name: string; icon: LucideIcon }[] = [
  { name: "folder", icon: Folder },
  { name: "book", icon: Book },
  { name: "bookmark", icon: Bookmark },
  { name: "star", icon: Star },
  { name: "heart", icon: Heart },
  { name: "code", icon: Code },
  { name: "music", icon: Music },
  { name: "camera", icon: Camera },
  { name: "globe", icon: Globe },
  { name: "briefcase", icon: Briefcase },
  { name: "graduation-cap", icon: GraduationCap },
  { name: "lightbulb", icon: Lightbulb },
  { name: "palette", icon: Palette },
  { name: "shopping-bag", icon: ShoppingBag },
  { name: "gamepad-2", icon: Gamepad2 },
  { name: "plane", icon: Plane },
  { name: "home", icon: Home },
  { name: "utensils", icon: Utensils },
  { name: "dumbbell", icon: Dumbbell },
  { name: "leaf", icon: Leaf },
  { name: "film", icon: Film },
  { name: "pen", icon: Pen },
  { name: "coffee", icon: Coffee },
  { name: "archive", icon: Archive },
];

interface Props {
  name: string;
  defaultValue?: string;
}

export function IconPicker({ name, defaultValue = "folder" }: Props) {
  const [selected, setSelected] = useState(defaultValue);

  return (
    <div className={styles.picker}>
      <input type="hidden" name={name} value={selected} />
      <p className={styles.label}>Choose an icon</p>
      <div className={styles.grid}>
        {ICONS.map(({ name: iconName, icon: Icon }) => (
          <button
            key={iconName}
            type="button"
            className={`${styles.iconButton} ${selected === iconName ? styles.active : ""}`}
            onClick={() => setSelected(iconName)}
            aria-label={iconName}
          >
            <Icon size={16} />
          </button>
        ))}
      </div>
    </div>
  );
}
