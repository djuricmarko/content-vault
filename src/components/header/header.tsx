import { Menu } from '@base-ui/react/menu';
import { Ellipsis, Trash } from "lucide-react";
import styles from "./header.module.css";

export function Header({ title }: { title: string }) {
  return (
    <div className={styles.title}>
      <h2>{title}</h2>
      <Menu.Root>
        <Menu.Trigger className={styles.options}>
          <Ellipsis />
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner sideOffset={10}>
            <Menu.Popup className={styles.dropdownContent}>
              <Menu.Item className={styles.dropdownItem}>
                <Trash size={16} color="red" />
                Delete
              </Menu.Item>
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    </div>
  );
}
