"use client";

import TemplatesList from "@/components/layouts/root/Templates/TemplatesList";
import TemplatesFilter from "@/components/layouts/root/TemplatesFilter";

import type { Category, Template } from "@/generated/prisma";
import { useRootTemplates } from "@/hooks/use-root-templates";

type TemplateWithCategory = Template & {
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
  categories: Category[];
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
