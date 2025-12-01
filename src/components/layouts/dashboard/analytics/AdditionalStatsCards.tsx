import { CheckCircle, Clock, Star } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type AnalyticsOverview = {
  total_templates: number;
  total_categories: number;
  total_orders: number;
  total_revenue: number;
  active_templates: number;
  featured_templates: number;
  pending_orders: number;
  completed_orders: number;
};

type AdditionalStatsCardsProps = {
  overview: AnalyticsOverview;
};

export function AdditionalStatsCards({ overview }: AdditionalStatsCardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Template Unggulan
          </CardTitle>
          <Star className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {overview.featured_templates}
          </div>
          <p className="text-muted-foreground text-xs">
            Dari {overview.total_templates} template
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Pesanan Menunggu
          </CardTitle>
          <Clock className="h-4 w-4 text-yellow-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{overview.pending_orders}</div>
          <p className="text-muted-foreground text-xs">Perlu diproses segera</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Tingkat Penyelesaian
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {overview.total_orders > 0
              ? (
                  (overview.completed_orders / overview.total_orders) *
                  100
                ).toFixed(1)
              : 0}
            %
          </div>
          <p className="text-muted-foreground text-xs">
            {overview.completed_orders} dari {overview.total_orders} pesanan
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
