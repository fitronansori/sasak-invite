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

type CategoryPerformance = {
  category_name: string;
  templates_count: number;
  orders_count: number;
  total_revenue: number;
};

type CategoryPerformanceChartProps = {
  data: CategoryPerformance[];
};

export function CategoryPerformanceChart({
  data,
}: CategoryPerformanceChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Performa Kategori
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Revenue berdasarkan kategori template
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <ChartContainer
          config={CHART_CONFIG}
          className="h-[300px] w-full md:h-[300px]"
        >
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="category_name"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={70}
              tickFormatter={(value) => {
                // Truncate long category names
                return value.length > 10
                  ? value.substring(0, 10) + "..."
                  : value;
              }}
            />
            <YAxis tick={{ fontSize: 10 }} width={50} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend wrapperStyle={{ fontSize: "11px" }} iconSize={10} />
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
