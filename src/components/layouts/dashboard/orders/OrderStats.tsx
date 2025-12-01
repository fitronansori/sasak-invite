
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ORDER_STATS_CONFIG } from "@/constants/dashboardData";

type OrderStatsProps = {
  total: number;
  pending: number;
  processing: number;
  paid: number;
  completed: number;
  cancelled: number;
  total_revenue: number;
};

export function OrderStats({
  total,
  pending,
  completed,
  cancelled,
  total_revenue,
}: OrderStatsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const statsValues = [
    { value: total, isFormatted: false },
    { value: formatCurrency(total_revenue), isFormatted: true },
    { value: pending, isFormatted: false },
    { value: completed, isFormatted: false },
    { value: cancelled, isFormatted: false },
  ];

  const stats = ORDER_STATS_CONFIG.map((config, index) => ({
    ...config,
    value: statsValues[index].value,
  }));

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <div className={`rounded-full p-2 ${stat.bgColor}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
