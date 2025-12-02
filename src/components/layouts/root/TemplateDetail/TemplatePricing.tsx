import Link from "next/link";

import { Eye, ShoppingCart } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface TemplatePricingProps {
  price: number;
  discount_price?: number;
  lynk_id_url: string;
  demo_url?: string;
}

export default function TemplatePricing({
  price,
  discount_price,
  lynk_id_url,
  demo_url,
}: TemplatePricingProps) {
  const discountPercentage = discount_price
    ? Math.round(((price - discount_price) / price) * 100)
    : 0;

  const finalPrice = discount_price || price;

  return (
    <Card>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p className="text-muted-foreground mb-2 text-sm">Harga</p>
            
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-primary text-3xl font-bold">
                {formatCurrency(finalPrice)}
              </span>
              {discount_price && (
                <>
                  <span className="text-muted-foreground text-lg line-through">
                    {formatCurrency(price)}
                  </span>
                  <Badge variant="destructive">-{discountPercentage}%</Badge>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <Button size="lg" className="flex-1" asChild>
              <Link href={lynk_id_url} target="_blank">
                <ShoppingCart className="size-5" />
                Beli Sekarang
              </Link>
            </Button>

            {demo_url && (
              <Button size="lg" variant="outline" asChild>
                <a href={demo_url} target="_blank" rel="noopener noreferrer">
                  <Eye className="size-5" />
                  Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
