import Link from "next/link";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/button";
import styles from "./header.module.css";

interface Props {
  href: string;
  label: string;
}

export function HeaderNewButton({ href, label }: Props) {
  return (
    <Link href={href} aria-label={label}>
      <Button className={styles.new}>
        <CirclePlus size={15} />
        <span>{label}</span>
      </Button>
    </Link>
  );
}
