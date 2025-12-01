
"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

import {
  CHART_CONFIG,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from "@/constants/dashboardData";

type OrdersByStatus = {
  status: string;
  count: number;
  percentage: number;
};

type StatusDistributionChartProps = {
  data: OrdersByStatus[];
};

export function StatusDistributionChart({ data }: StatusDistributionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Distribusi Status Pesanan
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Persentase pesanan berdasarkan status
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <ChartContainer config={CHART_CONFIG} className="h-[250px] md:h-[300px] w-full">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ status, percentage }) => {
                // Hide labels on very small screens
                if (typeof window !== 'undefined' && window.innerWidth < 640) {
                  return '';
                }
                return `${ORDER_STATUS_LABELS[status]}: ${percentage.toFixed(1)}%`;
              }}
              outerRadius={60}
              fill="#8884d8"
              dataKey="count"
              style={{ fontSize: '10px' }}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={ORDER_STATUS_COLORS[entry.status]}
                />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend 
              wrapperStyle={{ fontSize: '11px' }}
              iconSize={8}
              formatter={(value) => ORDER_STATUS_LABELS[value] || value}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
