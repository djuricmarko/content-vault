import { Button as BaseButton } from '@base-ui/react/button';
import styles from './button.module.css';

type ButtonVariant = 'primary' | 'secondary';

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: ButtonVariant;
};

export function Button({ className, children, variant = 'primary', ...props }: ButtonProps) {
  const variantClass = variant === 'primary' ? styles.primary : styles.secondary;
  const buttonClassName = `${styles.button} ${variantClass} ${className || ''}`;

  return (
    <BaseButton className={buttonClassName.trim()} {...props}>
      {children}
    </BaseButton>
  );
}
