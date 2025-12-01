"use client";

import { Bar, BarChart, CartesianGrid, Legend, XAxis, YAxis } from "recharts";

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

import { CHART_CONFIG } from "@/constants/dashboardData";

type TopTemplate = {
  id: string;
  title: string;
  orders_count: number;
  total_revenue: number;
  category_name: string;
};

type TopTemplatesChartProps = {
  data: TopTemplate[];
};

export function TopTemplatesChart({ data }: TopTemplatesChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Template Terpopuler
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          5 template dengan penjualan tertinggi
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <ChartContainer
          config={CHART_CONFIG}
          className="h-[300px] w-full md:h-[300px]"
        >
          <BarChart data={data} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis type="number" tick={{ fontSize: 10 }} />
            <YAxis
              dataKey="title"
              type="category"
              width={80}
              tick={{ fontSize: 9 }}
              tickFormatter={(value) => {
                // Truncate long titles on mobile
                return value.length > 12
                  ? value.substring(0, 12) + "..."
                  : value;
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend wrapperStyle={{ fontSize: "11px" }} iconSize={10} />
            <Bar
              dataKey="orders_count"
              fill="#3b82f6"
              name="Jumlah Order"
              radius={[4, 4, 0, 0]}
            />
            <Bar
              dataKey="total_revenue"
              fill="#10b981"
              name="Total Revenue"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
