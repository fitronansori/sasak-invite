"use client";

import type { Category } from "@/generated/prisma";

import { CategoriesTable } from "./CategoriesTable";
import { CategoryActions } from "./CategoryActions";
import { CategoryStats } from "./CategoryStats";

type CategoriesDashboardProps = {
  categories: Category[];
  stats: {
    total: number;
    active: number;
    inactive: number;
  };
};

export function CategoriesDashboard({
  categories,
  stats,
}: CategoriesDashboardProps) {
  return (
    <div className="space-y-6">
      <CategoryStats
        total={stats.total}
        active={stats.active}
        inactive={stats.inactive}
      />

      <CategoryActions />

      <CategoriesTable categories={categories} />
    </div>
  );
}
