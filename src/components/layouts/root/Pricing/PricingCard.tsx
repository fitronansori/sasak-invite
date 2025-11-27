import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Globe, MessageSquare, ShoppingCart } from "lucide-react";

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
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((f) => (
            <li key={f} className="flex items-start gap-2">
              <Check className="size-4 mt-0.5 text-primary" />
              <span className="text-sm">{f}</span>
            </li>
          ))}
        </ul>

        <div className="mt-4 flex items-start gap-2">
          <Globe className="size-4 mt-0.5 text-primary" />
          <span className="text-xs text-muted-foreground">{domainNote}</span>
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
