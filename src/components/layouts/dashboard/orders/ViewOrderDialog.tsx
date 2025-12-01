
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";

import { OrderStatus } from "@/generated/prisma/enums";
import type { OrderWithItems } from "@/actions/dash-order-action";
import { formatCurrency } from "@/lib/utils";

type ViewOrderDialogProps = {
  order: OrderWithItems;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Menunggu",
  PROCESSING: "Diproses",
  PAID: "Dibayar",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  REFUNDED: "Dikembalikan",
};

const statusColors: Record<OrderStatus, string> = {
  PENDING: "bg-yellow-500",
  PROCESSING: "bg-blue-500",
  PAID: "bg-green-500",
  COMPLETED: "bg-emerald-500",
  CANCELLED: "bg-red-500",
  REFUNDED: "bg-orange-500",
};

export function ViewOrderDialog({
  order,
  open,
  onOpenChange,
}: ViewOrderDialogProps) {
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Detail Order</DialogTitle>
          <DialogDescription>
            Informasi lengkap tentang order ini
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Info */}
          <Card>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">No. Order</p>
                  <p className="font-mono font-semibold">{order.order_number}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge
                    className={`${statusColors[order.status]} mt-1`}
                  >
                    {statusLabels[order.status]}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Tanggal Order</p>
                  <p className="font-medium">{formatDate(order.created_at)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Pembayaran</p>
                  <p className="text-lg font-bold text-primary">
                    {formatCurrency(order.total_amount)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Separator />

          {/* Customer Info */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Informasi Pelanggan</h3>
            <Card>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Nama</p>
                    <p className="font-medium">{order.customer_name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{order.customer_email}</p>
                  </div>
                  {order.customer_phone && (
                    <div>
                      <p className="text-sm text-muted-foreground">No. Telepon</p>
                      <p className="font-medium">{order.customer_phone}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          <Separator />

          {/* Payment Info */}
          <div>
            <h3 className="mb-3 text-lg font-semibold">Informasi Pembayaran</h3>
            <Card>
              <CardContent>
                <div className="space-y-3">
                  {order.payment_method && (
                    <div>
                      <p className="text-sm text-muted-foreground">Metode Pembayaran</p>
                      <p className="font-medium">{order.payment_method}</p>
                    </div>
                  )}
                  {order.payment_proof && (
                    <div>
                      <p className="text-sm text-muted-foreground">Bukti Pembayaran</p>
                      <a
                        href={order.payment_proof}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary underline hover:text-primary/80"
                      >
                        Lihat Bukti
                      </a>
                    </div>
                  )}
                  {order.lynk_id_transaction_id && (
                    <div>
                      <p className="text-sm text-muted-foreground">ID Transaksi Lynk.id</p>
                      <p className="font-mono text-sm">{order.lynk_id_transaction_id}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Notes */}
          {order.notes && (
            <>
              <Separator />
              <div>
                <h3 className="mb-3 text-lg font-semibold">Catatan</h3>
                <Card>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{order.notes}</p>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {/* Order Items */}
          {order.order_items && order.order_items.length > 0 && (
            <>
              <Separator />
              <div>
                <h3 className="mb-3 text-lg font-semibold">
                  Item Order ({order.order_items.length})
                </h3>
                <div className="space-y-2">
                  {order.order_items.map((item) => (
                    <Card key={item.id}>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">{item.template?.title || "Template"}</p>
                            <p className="text-sm text-muted-foreground">
                              Qty: {item.quantity} × {formatCurrency(item.price)}
                            </p>
                          </div>
                          <p className="font-semibold">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
