import { ComponentProps } from "react";
import styles from "./input.module.css";

type Props = ComponentProps<"input">;

export function Input({ className, ...props }: Props) {
  return (
    <input
      className={className ? `${styles.input} ${className}` : styles.input}
      {...props}
    />
  );
}
