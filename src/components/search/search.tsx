import { Input } from '@base-ui/react/input';
import styles from './search.module.css';

export function Search() {
  return (
    <Input
      placeholder="Search for content entries"
      className={styles.search}
    />
  );
}
