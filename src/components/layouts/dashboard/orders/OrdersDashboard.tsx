
"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { CreateOrderDialog } from "./CreateOrderDialog";
import { OrdersTable } from "./OrdersTable";
import { OrderStats } from "./OrderStats";
import { OrderFilters } from "./OrderFilters";
import { OrdersPagination } from "./OrdersPagination";
import type { OrderWithItems } from "@/actions/dash-order-action";

type OrdersDashboardProps = {
  orders: OrderWithItems[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  stats: {
    total: number;
    pending: number;
    processing: number;
    paid: number;
    completed: number;
    cancelled: number;
    total_revenue: number;
  };
};

export function OrdersDashboard({
  orders,
  pagination,
  stats,
}: OrdersDashboardProps) {
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
      <OrderStats
        total={stats.total}
        pending={stats.pending}
        processing={stats.processing}
        paid={stats.paid}
        completed={stats.completed}
        cancelled={stats.cancelled}
        total_revenue={stats.total_revenue}
      />

      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <OrderFilters
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
        />
        <CreateOrderDialog />
      </div>

      <OrdersTable orders={orders} />

      {pagination.total > 0 && (
        <OrdersPagination
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
