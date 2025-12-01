"use client";

import type { CategoryModel } from "@/generated/prisma/models";

import { CategoriesTable } from "./CategoriesTable";
import { CategoryStats } from "./CategoryStats";
import { CreateCategoryDialog } from "./CreateCategoryDialog";

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
