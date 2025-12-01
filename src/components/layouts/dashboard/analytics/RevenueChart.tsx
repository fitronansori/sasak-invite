"use client";

import { CartesianGrid, Legend, Line, LineChart, XAxis, YAxis } from "recharts";

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

type RevenueByMonth = {
  month: string;
  revenue: number;
  orders: number;
};

type RevenueChartProps = {
  data: RevenueByMonth[];
};

export function RevenueChart({ data }: RevenueChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base md:text-lg">
          Revenue & Orders (6 Bulan Terakhir)
        </CardTitle>
        <CardDescription className="text-xs md:text-sm">
          Tren pendapatan dan jumlah pesanan
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 md:px-6">
        <ChartContainer
          config={CHART_CONFIG}
          className="h-[250px] w-full md:h-[300px]"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              tick={{ fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis yAxisId="left" tick={{ fontSize: 10 }} width={45} />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fontSize: 10 }}
              width={45}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend wrapperStyle={{ fontSize: "12px" }} iconSize={10} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              strokeWidth={2}
              name="Revenue (IDR)"
              dot={{ r: 3 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="orders"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Jumlah Order"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
