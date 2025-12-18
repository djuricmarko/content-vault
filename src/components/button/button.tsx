import { Button as BaseButton } from '@base-ui/react/button';
import styles from './button.module.css';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export function Button({ className, children, ...props }: ButtonProps) {
  const buttonClassName = `${styles.button} ${className || ''}`;

  return (
    <BaseButton className={buttonClassName.trim()} {...props}>
      {children}
    </BaseButton>
  );
}
