'use client';

import { Category } from "@/db/schema";

interface Props {
  initialCategories: Category[];
}

export function CategoryDropdown({ initialCategories }: Props) {
  return (
    <select name="category">
      {initialCategories.map(({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
}
