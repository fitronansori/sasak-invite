import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { getDashboardStats } from "@/actions/dashboard-action";
import {
  DASHBOARD_STATS_CONFIG,
  QUICK_ACTIONS,
} from "@/constants/dashboardData";

const Dashboard = async () => {
  const stats = await getDashboardStats();

  return (
    <section className="dashboard-container space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Selamat datang kembali! Berikut ringkasan bisnis Anda
        </p>
      </div>

      {/* Statistik Ringkasan */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS_CONFIG.map((config) => (
          <Card key={config.title} className="gap-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {config.title}
              </CardTitle>

              <div className={`rounded-lg p-2 ${config.bgColor}`}>
                <config.icon className={`h-4 w-4 ${config.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {config.getValueKey(stats)}
              </div>
              <CardDescription>{config.getTrend(stats)}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Menu Cepat */}
      <div>
        <h2 className="mb-4 text-2xl font-semibold">Menu Cepat</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="h-full cursor-pointer gap-2 transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className={`rounded-lg p-3 ${action.bgColor} w-fit`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>

                  <CardTitle className="mt-4 text-lg">{action.title}</CardTitle>
                </CardHeader>

                <CardContent>
                  <CardDescription>{action.description}</CardDescription>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
