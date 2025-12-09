"use client";

import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { formatCurrency } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

import { createOrder } from "@/actions/dash-order-action";
import { getAllTemplates } from "@/actions/dash-template-action";
import { OrderStatus, type Template } from "@/generated/prisma";

const statusLabels: Record<OrderStatus, string> = {
  PENDING: "Menunggu",
  PROCESSING: "Diproses",
  PAID: "Dibayar",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
  REFUNDED: "Dikembalikan",
};

const paymentMethods = [
  { value: "bank_transfer", label: "Transfer Bank" },
  { value: "bca", label: "BCA" },
  { value: "mandiri", label: "Mandiri" },
  { value: "bni", label: "BNI" },
  { value: "bri", label: "BRI" },
  { value: "e_wallet", label: "E-Wallet" },
  { value: "gopay", label: "GoPay" },
  { value: "ovo", label: "OVO" },
  { value: "dana", label: "DANA" },
  { value: "shopeepay", label: "ShopeePay" },
  { value: "qris", label: "QRIS" },
  { value: "credit_card", label: "Kartu Kredit" },
  { value: "cash", label: "Cash" },
  { value: "other", label: "Lainnya" },
];

const createOrderFormSchema = z.object({
  customer_name: z.string().min(1, "Nama pelanggan wajib diisi"),
  customer_email: z
    .string()
    .min(1, "Email pelanggan wajib diisi")
    .email("Format email tidak valid"),
  customer_phone: z.string().optional(),
  status: z.nativeEnum(OrderStatus),
  payment_method: z.string().optional(),
  payment_proof: z
    .string()
    .url("URL bukti pembayaran tidak valid")
    .optional()
    .or(z.literal("")),
  notes: z.string().optional(),
  order_items: z
    .array(
      z.object({
        template_id: z.string().min(1, "Template wajib dipilih"),
        quantity: z.number().min(1, "Minimal 1"),
      })
    )
    .min(1, "Minimal 1 item harus dipilih"),
});

type CreateOrderFormValues = z.infer<typeof createOrderFormSchema>;

export function CreateOrderDialog() {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loadingTemplates, setLoadingTemplates] = useState(false);

  const form = useForm<CreateOrderFormValues>({
    resolver: zodResolver(createOrderFormSchema),
    defaultValues: {
      customer_name: "",
      customer_email: "",
      customer_phone: "",
      status: OrderStatus.PENDING,
      payment_method: "",
      payment_proof: "",
      notes: "",
      order_items: [{ template_id: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "order_items",
  });

  useEffect(() => {
    if (open) {
      loadTemplates();
    }
  }, [open]);

  const loadTemplates = async () => {
    setLoadingTemplates(true);
    try {
      const result = await getAllTemplates();
      setTemplates(result.templates);
    } catch {
      toast.error("Gagal memuat template");
    } finally {
      setLoadingTemplates(false);
    }
  };

  const calculateTotal = () => {
    const items = form.watch("order_items");
    let total = 0;

    items.forEach((item) => {
      const template = templates.find((t) => t.id === item.template_id);
      if (template) {
        const price = template.discount_price || template.price;
        total += price * item.quantity;
      }
    });

    return total;
  };

  const onSubmit = async (data: CreateOrderFormValues) => {
    setIsSubmitting(true);

    // Calculate prices for each item
    const orderItemsWithPrice = data.order_items.map((item) => {
      const template = templates.find((t) => t.id === item.template_id);
      const price = template?.discount_price || template?.price || 0;
      return {
        template_id: item.template_id,
        quantity: item.quantity,
        price,
      };
    });

    const total_amount = calculateTotal();

    const result = await createOrder({
      customer_name: data.customer_name,
      customer_email: data.customer_email,
      customer_phone: data.customer_phone,
      status: data.status,
      payment_method: data.payment_method,
      payment_proof: data.payment_proof,
      notes: data.notes,
      total_amount,
      order_items: orderItemsWithPrice,
    });

    if (result.success) {
      toast.success("Order berhasil dibuat");
      setOpen(false);
      form.reset();
    } else {
      toast.error(result.error || "Gagal membuat order");
    }

    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Tambah Order
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Tambah Order Baru</DialogTitle>
          <DialogDescription>
            Buat order baru untuk pelanggan. Klik simpan setelah selesai.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Customer Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Informasi Pelanggan</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="customer_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Pelanggan</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customer_email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Pelanggan</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="customer_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>No. Telepon (Opsional)</FormLabel>
                    <FormControl>
                      <Input placeholder="08123456789" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Order Items */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Item Order</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => append({ template_id: "", quantity: 1 })}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Tambah Item
                </Button>
              </div>

              {fields.map((field, index) => (
                <Card key={field.id}>
                  <CardContent>
                    <div className="flex gap-4">
                      <FormField
                        control={form.control}
                        name={`order_items.${index}.template_id`}
                        render={({ field }) => (
                          <FormItem className="flex-1">
                            <FormLabel>Template</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Pilih template" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {loadingTemplates ? (
                                  <SelectItem value="loading" disabled>
                                    Loading...
                                  </SelectItem>
                                ) : (
                                  templates.map((template) => (
                                    <SelectItem
                                      key={template.id}
                                      value={template.id}
                                    >
                                      {template.title}
                                    </SelectItem>
                                  ))
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name={`order_items.${index}.quantity`}
                        render={({ field }) => (
                          <FormItem className="w-24">
                            <FormLabel>Qty</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                min={1}
                                {...field}
                                onChange={(e) =>
                                  field.onChange(parseInt(e.target.value))
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {fields.length > 1 && (
                        <div className="flex items-end">
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => remove(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}

              <div className="flex justify-end">
                <div className="text-right">
                  <p className="text-muted-foreground text-sm">Total</p>
                  <p className="text-primary text-2xl font-bold">
                    {formatCurrency(calculateTotal())}
                  </p>
                </div>
              </div>
            </div>

            {/* Order Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Detail Order</h3>
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status Order</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {Object.entries(statusLabels).map(
                            ([value, label]) => (
                              <SelectItem key={value} value={value}>
                                {label}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="payment_method"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Metode Pembayaran (Opsional)</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih metode pembayaran" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {paymentMethods.map((method) => (
                            <SelectItem key={method.value} value={method.value}>
                              {method.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="payment_proof"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL Bukti Pembayaran (Opsional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://example.com/bukti.jpg"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Catatan (Opsional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Tambahkan catatan untuk order ini..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Menyimpan..." : "Simpan"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
