'use client';

import { Category } from "@/lib/drizzle/schema";

interface Props {
  initialCategories: Category[];
  defaultValue?: string;
}

export function CategoryDropdown({ initialCategories, defaultValue }: Props) {
  return (
    <select name="category" defaultValue={defaultValue}>
      {initialCategories.map(({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
}
