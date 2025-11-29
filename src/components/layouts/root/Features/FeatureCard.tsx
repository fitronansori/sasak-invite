import type { ComponentType } from "react";

import { Card } from "@/components/ui/card";

type Props = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: Props) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="bg-background flex h-10 w-10 items-center justify-center rounded-md border">
          <Icon className="text-primary size-5" />
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <p className="text-muted-foreground mt-1 text-sm">{description}</p>
        </div>
      </div>
    </Card>
  );
}
