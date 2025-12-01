
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
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kategori</h1>
        <p className="text-muted-foreground">
          Kelola kategori template undangan Anda
        </p>
      </div>

      <CategoriesDashboard categories={categories} stats={stats} />
    </div>
  );
}
