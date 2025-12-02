"use client";

import TemplatesList from "@/components/layouts/root/Templates/TemplatesList";
import TemplatesFilter from "@/components/layouts/root/TemplatesFilter";

import type { CategoryModel, TemplateModel } from "@/generated/prisma/models";
import { useRootTemplates } from "@/hooks/use-root-templates";

type TemplateWithCategory = TemplateModel & {
  category: {
    id: string;
    name: string;
  };
};

interface TemplatesContainerProps {
  templates: TemplateWithCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  categories: CategoryModel[];
}

export default function TemplatesContainer({
  templates,
  pagination,
  categories,
}: TemplatesContainerProps) {
  const actions = useRootTemplates();

  return (
    <>
      <TemplatesFilter
        categories={categories}
        onSearchChange={actions.onSearchChange}
        onCategoryChange={actions.onCategoryChange}
      />

      <TemplatesList
        templates={templates}
        pagination={pagination}
        onPageChange={actions.onPageChange}
      />
    </>
  );
}
