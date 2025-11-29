import { Check, Globe, MessageSquare, ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  name: string;
  price: string;
  description: string;
  features: string[];
  domainNote: string;
  cta: string;
  highlight?: boolean;
};

export default function PricingCard({
  name,
  price,
  description,
  features,
  domainNote,
  cta,
  highlight,
}: Props) {
  const isContact = cta.toLowerCase().includes("hubungi");

  return (
    <Card className={highlight ? "border-primary" : undefined}>
      <CardHeader>
        <CardTitle className="flex items-baseline justify-between">
          <span className="text-xl font-bold">{name}</span>
          <span className="text-2xl font-extrabold">{price}</span>
        </CardTitle>
        <p className="text-muted-foreground text-sm">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="text-primary mt-0.5 size-4" />
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-start gap-2">
          <Globe className="text-primary mt-0.5 size-4" />
          <span className="text-muted-foreground text-xs">{domainNote}</span>
        </div>

        <div className="mt-6">
          <Button className="w-full">
            {isContact ? (
              <MessageSquare className="size-4" />
            ) : (
              <ShoppingCart className="size-4" />
            )}{" "}
            {cta}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
