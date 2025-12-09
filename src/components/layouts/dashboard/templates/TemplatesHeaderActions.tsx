import { CreateTemplateDialog } from "@/components/layouts/dashboard/templates/CreateTemplateDialog";
import { TemplateFilters } from "@/components/layouts/dashboard/templates/TemplateFilters";

import type { Category } from "@/generated/prisma";

type TemplatesHeaderActionsProps = {
  categories: Category[];
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onStatusChange: (status: string) => void;
};

export function TemplatesHeaderActions({
  categories,
  onSearchChange,
  onCategoryChange,
  onStatusChange,
}: TemplatesHeaderActionsProps) {
  return (
    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
      <TemplateFilters
        categories={categories}
        onSearchChange={onSearchChange}
        onCategoryChange={onCategoryChange}
        onStatusChange={onStatusChange}
      />
      <CreateTemplateDialog categories={categories} />
    </div>
  );
}
