import { TemplatesDashboard } from "@/components/layouts/dashboard/templates/TemplatesDashboard";

import { getActiveCategories } from "@/actions/dash-category-action";
import {
  getAllTemplates,
  getTemplatesStats,
} from "@/actions/dash-template-action";

type SearchParams = Promise<{
  page?: string;
  limit?: string;
  search?: string;
  categoryId?: string;
  status?: "all" | "active" | "inactive" | "featured";
}>;

export default async function DashboardTemplatesPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = searchParams.search || "";
  const categoryId = searchParams.categoryId || "";
  const status = searchParams.status || "all";

  const [result, stats, categories] = await Promise.all([
    getAllTemplates({ page, limit, search, categoryId, status }),
    getTemplatesStats(),
    getActiveCategories(),
  ]);

  return (
    <div className="dashboard-container space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Template</h1>
        <p className="text-muted-foreground">Kelola template undangan Anda</p>
      </div>

      <TemplatesDashboard
        templates={result.templates}
        pagination={result.pagination}
        categories={categories}
        stats={stats}
      />
    </div>
  );
}
