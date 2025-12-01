
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CATEGORY_STATS_CONFIG } from "@/constants/dashboardData";

type CategoryStatsProps = {
  total: number;
  active: number;
  inactive: number;
};

export function CategoryStats({ total, active, inactive }: CategoryStatsProps) {
  const statsValues = [total, active, inactive];
  const stats = CATEGORY_STATS_CONFIG.map((config, index) => ({
    ...config,
    value: statsValues[index],
  }));

  return (
    <div className="grid gap-4 md:grid-cols-3">
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
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
