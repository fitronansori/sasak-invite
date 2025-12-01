"use client";

import { useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

/**
 * Custom hook untuk mengelola URL parameters pada halaman orders
 * Menyediakan fungsi helper untuk update search, status, page, dan limit
 */
export function useOrdersURL() {
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

  const handleSearchChange = useCallback(
    (query: string) => {
      updateURL({ search: query });
    },
    [updateURL]
  );

  const handleStatusChange = useCallback(
    (status: string) => {
      updateURL({ status });
    },
    [updateURL]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateURL({ page });
    },
    [updateURL]
  );

  const handlePageSizeChange = useCallback(
    (size: number) => {
      updateURL({ limit: size, page: 1 });
    },
    [updateURL]
  );

  return {
    handleSearchChange,
    handleStatusChange,
    handlePageChange,
    handlePageSizeChange,
  };
}
