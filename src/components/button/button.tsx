import styles from './button.module.css';

type ButtonProps = React.ComponentPropsWithoutRef<'button'>;

export function Button({ className, children, ...props }: ButtonProps) {
  const buttonClassName = `${styles.button} ${className || ''}`;

  return (
    <button className={buttonClassName.trim()} {...props}>
      {children}
    </button>
  );
}
