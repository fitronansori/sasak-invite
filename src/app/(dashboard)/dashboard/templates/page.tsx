import { DashboardPageHeader } from "@/components/layouts/dashboard/DashboardPageHeader";
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
      <DashboardPageHeader
        title="Template"
        description="Kelola template undangan Anda"
      />

      <TemplatesDashboard
        templates={result.templates}
        pagination={result.pagination}
        categories={categories}
        stats={stats}
      />
    </div>
  );
}
