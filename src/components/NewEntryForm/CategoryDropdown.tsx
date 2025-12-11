'use client';

import { useEffect, useState } from "react";
import { Category } from "@/db/schema";
import { getUserCategories } from "./actions";

export function CategoryDropdown() {
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getUserCategories();
        setCategoryList(data);
      } catch (error) {
        console.error("Failed to load categories", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading categories...</p>;
  }

  return (
    <select name="category">
      {categoryList.map(({ id, name }) => (
        <option key={id} value={id}>{name}</option>
      ))}
    </select>
  );
}
