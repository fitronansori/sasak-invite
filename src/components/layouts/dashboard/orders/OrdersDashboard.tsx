"use client";

import { useOrdersURL } from "@/hooks/use-orders-url";

import { CreateOrderDialog } from "./CreateOrderDialog";
import { OrderFilters } from "./OrderFilters";
import { OrderStats } from "./OrderStats";
import { OrdersPagination } from "./OrdersPagination";
import { OrdersTable } from "./OrdersTable";
import type { OrdersDashboardProps } from "./types";

export function OrdersDashboard({
  orders,
  pagination,
  stats,
}: OrdersDashboardProps) {
  const {
    handleSearchChange,
    handleStatusChange,
    handlePageChange,
    handlePageSizeChange,
  } = useOrdersURL();

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
