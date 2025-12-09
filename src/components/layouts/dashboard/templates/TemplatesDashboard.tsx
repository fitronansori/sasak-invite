"use client";

import { TemplateStats } from "@/components/layouts/dashboard/templates/TemplateStats";
import { TemplatesContent } from "@/components/layouts/dashboard/templates/TemplatesContent";
import { TemplatesHeaderActions } from "@/components/layouts/dashboard/templates/TemplatesHeaderActions";

import type { TemplateWithCategory } from "@/actions/dash-template-action";
import type { Category } from "@/generated/prisma";
import { useTemplatesActions } from "@/hooks/use-templates-actions";

type TemplatesDashboardProps = {
  templates: TemplateWithCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  categories: Category[];
  stats: {
    total: number;
    active: number;
    inactive: number;
    featured: number;
  };
};

export function TemplatesDashboard({
  templates,
  pagination,
  categories,
  stats,
}: TemplatesDashboardProps) {
  const actions = useTemplatesActions();

  return (
    <div className="space-y-6">
      <TemplateStats
        total={stats.total}
        active={stats.active}
        inactive={stats.inactive}
        featured={stats.featured}
      />

      <TemplatesHeaderActions
        categories={categories}
        onSearchChange={actions.onSearchChange}
        onCategoryChange={actions.onCategoryChange}
        onStatusChange={actions.onStatusChange}
      />

      <TemplatesContent
        templates={templates}
        categories={categories}
        pagination={pagination}
        onPageChange={actions.onPageChange}
        onPageSizeChange={actions.onPageSizeChange}
      />
    </div>
  );
}
