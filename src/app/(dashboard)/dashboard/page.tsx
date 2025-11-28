import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DASHBOARD_STATS, QUICK_ACTIONS } from "@/constants/dashboardData";

const Dashboard = () => {
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
        {DASHBOARD_STATS.map((stat) => (
          <Card key={stat.title} className="gap-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>

              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <CardDescription>{stat.trend}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Menu Cepat */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">Menu Cepat</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {QUICK_ACTIONS.map((action) => (
            <Link key={action.title} href={action.href}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full gap-2">
                <CardHeader>
                  <div className={`p-3 rounded-lg ${action.bgColor} w-fit`}>
                    <action.icon className={`h-6 w-6 ${action.color}`} />
                  </div>

                  <CardTitle className="text-lg mt-4">{action.title}</CardTitle>
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
