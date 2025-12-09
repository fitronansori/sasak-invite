import { TemplatesPagination } from "@/components/layouts/dashboard/templates/TemplatesPagination";
import { TemplatesTable } from "@/components/layouts/dashboard/templates/TemplatesTable";

import type { TemplateWithCategory } from "@/actions/dash-template-action";
import type { Category } from "@/generated/prisma";

type TemplatesContentProps = {
  templates: TemplateWithCategory[];
  categories: Category[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export function TemplatesContent({
  templates,
  categories,
  pagination,
  onPageChange,
  onPageSizeChange,
}: TemplatesContentProps) {
  return (
    <div className="space-y-6">
      <TemplatesTable templates={templates} categories={categories} />

      {pagination.total > 0 && (
        <TemplatesPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          pageSize={pagination.limit}
          totalItems={pagination.total}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
        />
      )}
    </div>
  );
}
