import { Eye, ShoppingCart } from "lucide-react";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  name: string;
  color: string;
};

export default function TemplateCard({ name, color }: Props) {
  return (
    <Card className="gap-2 overflow-hidden">
      <CardHeader>
        <CardTitle className="text-lg">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <AspectRatio ratio={16 / 9}>
          <div
            className={`h-full w-full rounded-md bg-linear-to-br ${color}`}
          />
        </AspectRatio>
        <div className="mt-4 flex items-center gap-2">
          <Button size="sm">
            <ShoppingCart className="size-4" /> Pesan Sekarang
          </Button>
          <Button size="sm" variant="outline">
            <Eye className="size-4" /> Lihat Contoh
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
