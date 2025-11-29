"use client";

import { useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { CreateTemplateDialog } from "@/components/layouts/dashboard/templates/CreateTemplateDialog";
import { TemplateFilters } from "@/components/layouts/dashboard/templates/TemplateFilters";
import { TemplateStats } from "@/components/layouts/dashboard/templates/TemplateStats";
import { TemplatesPagination } from "@/components/layouts/dashboard/templates/TemplatesPagination";
import { TemplatesTable } from "@/components/layouts/dashboard/templates/TemplatesTable";

import type { TemplateWithCategory } from "@/actions/dash-template-action";
import type { CategoryModel } from "@/generated/prisma/models";

type TemplatesDashboardProps = {
  templates: TemplateWithCategory[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  categories: CategoryModel[];
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
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateURL = useCallback(
    (updates: Record<string, string | number>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value) {
          params.set(key, value.toString());
        } else {
          params.delete(key);
        }
      });

      // Reset to page 1 when filters change (except when page itself changes)
      if (!updates.page && params.has("page")) {
        params.set("page", "1");
      }

      router.push(`?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearchChange = (query: string) => {
    updateURL({ search: query });
  };

  const handleCategoryChange = (categoryId: string) => {
    updateURL({ categoryId });
  };

  const handleStatusChange = (status: string) => {
    updateURL({ status });
  };

  const handlePageChange = (page: number) => {
    updateURL({ page });
  };

  const handlePageSizeChange = (size: number) => {
    updateURL({ limit: size, page: 1 });
  };

  return (
    <div className="space-y-6">
      <TemplateStats
        total={stats.total}
        active={stats.active}
        inactive={stats.inactive}
        featured={stats.featured}
      />

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <TemplateFilters
          categories={categories}
          onSearchChange={handleSearchChange}
          onCategoryChange={handleCategoryChange}
          onStatusChange={handleStatusChange}
        />
        <CreateTemplateDialog categories={categories} />
      </div>

      <TemplatesTable templates={templates} categories={categories} />

      {pagination.total > 0 && (
        <TemplatesPagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
          pageSize={pagination.limit}
          totalItems={pagination.total}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
}
