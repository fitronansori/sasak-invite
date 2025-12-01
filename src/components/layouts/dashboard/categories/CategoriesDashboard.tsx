
"use client";

import { CategoryStats } from "./CategoryStats";
import { CategoriesTable } from "./CategoriesTable";
import { CreateCategoryDialog } from "./CreateCategoryDialog";

import type { CategoryModel } from "@/generated/prisma/models";

type CategoriesDashboardProps = {
  categories: CategoryModel[];
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

      <div className="flex items-center justify-end">
        <CreateCategoryDialog />
      </div>

      <CategoriesTable categories={categories} />
    </div>
  );
}
