import { OrdersDashboard } from "@/components/layouts/dashboard/orders";

import { getAllOrders, getOrdersStats } from "@/actions/dash-order-action";
import { OrderStatus } from "@/generated/prisma/enums";

type SearchParams = Promise<{
  page?: string;
  limit?: string;
  search?: string;
  status?: OrderStatus | "all";
}>;

export default async function DashboardOrdersPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  const page = Number(searchParams.page) || 1;
  const limit = Number(searchParams.limit) || 10;
  const search = searchParams.search || "";
  const status = searchParams.status || "all";

  const [result, stats] = await Promise.all([
    getAllOrders({ page, limit, search, status }),
    getOrdersStats(),
  ]);

  return (
    <div className="dashboard-container space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
        <p className="text-muted-foreground">
          Kelola semua pesanan pelanggan Anda
        </p>
      </div>

      <OrdersDashboard
        orders={result.orders}
        pagination={result.pagination}
        stats={stats}
      />
    </div>
  );
}
