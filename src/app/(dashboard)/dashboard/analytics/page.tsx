
import {
  getAnalyticsOverview,
  getRevenueByMonth,
  getOrdersByStatus,
  getTopTemplates,
  getCategoryPerformance,
  getRecentOrders,
} from "@/actions/dash-analytics-action";

import { AnalyticsOverviewCards } from "@/components/layouts/dashboard/analytics/AnalyticsOverviewCards";
import { RevenueChart } from "@/components/layouts/dashboard/analytics/RevenueChart";
import { StatusDistributionChart } from "@/components/layouts/dashboard/analytics/StatusDistributionChart";
import { TopTemplatesChart } from "@/components/layouts/dashboard/analytics/TopTemplatesChart";
import { CategoryPerformanceChart } from "@/components/layouts/dashboard/analytics/CategoryPerformanceChart";
import { RecentActivityCard } from "@/components/layouts/dashboard/analytics/RecentActivityCard";
import { AdditionalStatsCards } from "@/components/layouts/dashboard/analytics/AdditionalStatsCards";
import { formatCurrency } from "@/lib/utils";

const DashboardAnalytics = async () => {
  const [
    overview,
    revenueByMonth,
    ordersByStatus,
    topTemplates,
    categoryPerformance,
    recentOrders,
  ] = await Promise.all([
    getAnalyticsOverview(),
    getRevenueByMonth(),
    getOrdersByStatus(),
    getTopTemplates(),
    getCategoryPerformance(),
    getRecentOrders(5),
  ]);

  return (
    <section className="dashboard-container space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          Dashboard Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Analisis performa dan statistik bisnis Anda
        </p>
      </div>

      {/* Overview Stats */}
      <AnalyticsOverviewCards data={overview} />

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <RevenueChart data={revenueByMonth} />
        <StatusDistributionChart data={ordersByStatus} />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <TopTemplatesChart data={topTemplates} />
        <CategoryPerformanceChart data={categoryPerformance} />
      </div>

      {/* Recent Activity */}
      <RecentActivityCard 
        orders={recentOrders} 
        formatCurrency={formatCurrency}
      />

      {/* Additional Stats */}
      <AdditionalStatsCards overview={overview} />
    </section>
  );
};

export default DashboardAnalytics;
