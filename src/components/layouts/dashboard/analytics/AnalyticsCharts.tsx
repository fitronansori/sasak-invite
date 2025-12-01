"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  XAxis,
  YAxis,
} from "recharts";

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
  CHART_CONFIG,
  ORDER_STATUS_COLORS,
  ORDER_STATUS_LABELS,
} from "@/constants/dashboardData";

type RevenueByMonth = {
  month: string;
  revenue: number;
  orders: number;
};

type OrdersByStatus = {
  status: string;
  count: number;
  percentage: number;
};

type TopTemplate = {
  id: string;
  title: string;
  orders_count: number;
  total_revenue: number;
  category_name: string;
};

type CategoryPerformance = {
  category_name: string;
  templates_count: number;
  orders_count: number;
  total_revenue: number;
};

type AnalyticsChartsProps = {
  revenueByMonth: RevenueByMonth[];
  ordersByStatus: OrdersByStatus[];
  topTemplates: TopTemplate[];
  categoryPerformance: CategoryPerformance[];
};

export function AnalyticsCharts({
  revenueByMonth,
  ordersByStatus,
  topTemplates,
  categoryPerformance,
}: AnalyticsChartsProps) {
  return (
    <>
      {/* Charts Row 1: Revenue & Orders by Status */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Revenue Chart */}
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
              <LineChart data={revenueByMonth}>
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

        {/* Orders by Status */}
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
            <ChartContainer
              config={CHART_CONFIG}
              className="h-[250px] w-full md:h-[300px]"
            >
              <PieChart>
                <Pie
                  data={ordersByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, percentage }) => {
                    // Hide labels on very small screens
                    if (
                      typeof window !== "undefined" &&
                      window.innerWidth < 640
                    ) {
                      return "";
                    }
                    return `${ORDER_STATUS_LABELS[status]}: ${percentage.toFixed(1)}%`;
                  }}
                  outerRadius={60}
                  fill="#8884d8"
                  dataKey="count"
                  style={{ fontSize: "10px" }}
                >
                  {ordersByStatus.map((entry) => (
                    <Cell
                      key={entry.status}
                      fill={ORDER_STATUS_COLORS[entry.status]}
                    />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
                <Legend
                  wrapperStyle={{ fontSize: "11px" }}
                  iconSize={8}
                  formatter={(value) => ORDER_STATUS_LABELS[value] || value}
                />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2: Top Templates & Category Performance */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Top Templates */}
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
              <BarChart data={topTemplates} layout="horizontal">
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

        {/* Category Performance */}
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
              <BarChart data={categoryPerformance}>
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
      </div>
    </>
  );
}
