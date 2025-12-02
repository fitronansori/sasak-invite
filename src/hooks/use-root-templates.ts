"use client";

import { useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

type RootTemplatesActions = {
  onSearchChange: (query: string) => void;
  onCategoryChange: (categoryId: string) => void;
  onPageChange: (page: number) => void;
};

export function useRootTemplates(): RootTemplatesActions {
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

      router.push(`/templates?${params.toString()}`);
    },
    [router, searchParams]
  );

  const handleSearchChange = useCallback(
    (query: string) => {
      updateURL({ search: query });
    },
    [updateURL]
  );

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      // Filter out "all" value to avoid sending it to the API
      updateURL({ category: categoryId === "all" ? "" : categoryId });
    },
    [updateURL]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ page });
    },
    [updateURL]
  );

  return {
    onSearchChange: handleSearchChange,
    onCategoryChange: handleCategoryChange,
    onPageChange: handlePageChange,
  };
}
