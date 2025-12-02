import type { TemplateModel } from "@/generated/prisma/models";

import EmptyState from "./EmptyState";
import TemplatesGrid from "./TemplatesGrid";
import TemplatesPagination from "./TemplatesPagination";

type TemplateWithCategory = TemplateModel & {
  category: {
    id: string;
    name: string;
  };
};

interface TemplatesListProps {
  templates: TemplateWithCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  onPageChange: (page: number) => void;
}

export default function TemplatesList({
  templates,
  pagination,
  onPageChange,
}: TemplatesListProps) {
  if (templates.length === 0) {
    return <EmptyState />;
  }

  return (
    <>
      <TemplatesGrid templates={templates} />

      {pagination.total > 0 && (
        <TemplatesPagination
          currentPage={pagination.page}
          totalPages={pagination.total_pages}
          totalItems={pagination.total}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
}
