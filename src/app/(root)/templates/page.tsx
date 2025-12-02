import SectionHeader from "@/components/common/SectionHeader";
import TemplatesContainer from "@/components/layouts/root/TemplatesContainer";

import { getActiveCategories } from "@/actions/dash-category-action";
import { getTemplatesWithFilters } from "@/actions/templates-action";

interface TemplatesPageProps {
  searchParams: Promise<{
    search?: string;
    category?: string;
    page?: string;
  }>;
}

const TemplatesPage = async ({ searchParams }: TemplatesPageProps) => {
  const params = await searchParams;
  const search = params.search || "";
  const category = params.category || "";
  const page = Number(params.page) || 1;

  const [categories, result] = await Promise.all([
    getActiveCategories(),
    getTemplatesWithFilters({
      search,
      category_id: category,
      page,
      limit: 8,
    }),
  ]);

  const templates = result.success && result.data ? result.data : [];
  const pagination = result.pagination || {
    page: 1,
    limit: 8,
    total: 0,
    total_pages: 0,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SectionHeader
        title="Template Undangan"
        description="Pilih template undangan yang sesuai dengan kebutuhan Anda"
      />

      <TemplatesContainer
        templates={templates}
        pagination={pagination}
        categories={categories}
      />
    </div>
  );
};

export default TemplatesPage;
