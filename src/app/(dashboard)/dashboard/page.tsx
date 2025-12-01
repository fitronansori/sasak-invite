import { DashboardPageHeader } from "@/components/layouts/dashboard/DashboardPageHeader";
import { DashboardStatsSection } from "@/components/layouts/dashboard/DashboardStats";
import { QuickActionsSection } from "@/components/layouts/dashboard/QuickActions";

import { getDashboardStats } from "@/actions/dashboard-action";

const Dashboard = async () => {
  const stats = await getDashboardStats();

  return (
    <section className="dashboard-container space-y-8">
      <DashboardPageHeader
        title="Dashboard"
        description="Selamat datang kembali! Berikut ringkasan bisnis Anda"
      />

      <DashboardStatsSection stats={stats} />

      <QuickActionsSection />
    </section>
  );
};

export default Dashboard;
