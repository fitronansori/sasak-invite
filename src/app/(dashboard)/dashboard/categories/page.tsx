import { DashboardPageHeader } from "@/components/layouts/dashboard/DashboardPageHeader";
import { CategoriesDashboard } from "@/components/layouts/dashboard/categories";

import {
  getAllCategories,
  getCategoriesStats,
} from "@/actions/dash-category-action";

export default async function DashboardCategoriesPage() {
  const [categories, stats] = await Promise.all([
    getAllCategories(),
    getCategoriesStats(),
  ]);

  return (
    <div className="dashboard-container space-y-6">
      <DashboardPageHeader
        title="Kategori"
        description="Kelola kategori template undangan Anda"
      />

      <CategoriesDashboard categories={categories} stats={stats} />
    </div>
  );
}
