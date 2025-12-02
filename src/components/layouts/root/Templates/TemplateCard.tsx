import Image from "next/image";
import Link from "next/link";

import { Eye, ShoppingCart } from "lucide-react";

import { formatCurrency } from "@/lib/utils";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

type Props = {
  id: string;
  title: string;
  image?: string;
  price: number;
  discount_price?: number;
  demo_url?: string;
  priority?: boolean;
};

export default function TemplateCard({
  id,
  title,
  image,
  price,
  discount_price,
  demo_url,
  priority = false,
}: Props) {
  return (
    <Card className="overflow-hidden py-0">
      <CardContent className="p-0">
        <Link href={`/templates/${id}`}>
          <AspectRatio ratio={1 / 1}>
            {image ? (
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={priority}
                loading={priority ? "eager" : "lazy"}
              />
            ) : (
              <div className="from-primary/20 to-chart-4/30 h-full w-full bg-linear-to-br transition-transform hover:scale-105" />
            )}
          </AspectRatio>
        </Link>

        <div className="p-4">
          <Link href={`/templates/${id}`}>
            <CardTitle className="hover:text-primary mb-2 text-lg transition-colors">
              {title}
            </CardTitle>
          </Link>
          <div className="mb-4 flex items-center gap-2">
            {discount_price ? (
              <>
                <span className="text-primary text-lg font-bold">
                  {formatCurrency(discount_price)}
                </span>
                <span className="text-muted-foreground text-sm line-through">
                  {formatCurrency(price)}
                </span>
              </>
            ) : (
              <span className="text-primary text-lg font-bold">
                {formatCurrency(price)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Button size="sm" className="flex-1" asChild>
              <Link href={`/templates/${id}`}>
                <ShoppingCart className="size-4" /> Pesan
              </Link>
            </Button>

            {demo_url && (
              <Button size="sm" variant="outline" asChild>
                <a href={demo_url} target="_blank" rel="noopener noreferrer">
                  <Eye className="size-4" /> Demo
                </a>
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
