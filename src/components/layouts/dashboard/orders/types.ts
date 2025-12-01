import type { OrderWithItems } from "@/actions/dash-order-action";

export type OrdersPagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type OrdersStats = {
  total: number;
  pending: number;
  processing: number;
  paid: number;
  completed: number;
  cancelled: number;
  total_revenue: number;
};

export type OrdersDashboardProps = {
  orders: OrderWithItems[];
  pagination: OrdersPagination;
  stats: OrdersStats;
};
