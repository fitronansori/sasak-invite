import { Activity, Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { ORDER_STATUS_LABELS } from "@/constants/dashboardData";

type OrderItem = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total_amount: number;
  status: string;
  created_at: Date;
  order_items: Array<{ id: string }>;
};

type RecentActivityCardProps = {
  orders: OrderItem[];
  formatCurrency: (amount: number) => string;
};

export function RecentActivityCard({
  orders,
  formatCurrency,
}: RecentActivityCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Aktivitas Terbaru
        </CardTitle>
        <CardDescription>5 pesanan terbaru</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div key={order.id}>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium">{order.order_number}</p>
                    <Badge
                      variant={
                        order.status === "COMPLETED"
                          ? "default"
                          : order.status === "PENDING"
                            ? "secondary"
                            : "outline"
                      }
                    >
                      {ORDER_STATUS_LABELS[order.status]}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    {order.customer_name} • {order.customer_email}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {order.order_items.length} item •{" "}
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>
                <div className="text-muted-foreground text-right text-sm">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(order.created_at).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </div>
                </div>
              </div>
              {index < orders.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
