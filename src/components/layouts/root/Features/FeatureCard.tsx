import { Card } from "@/components/ui/card";
import type { ComponentType } from "react";

type Props = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export default function FeatureCard({ icon: Icon, title, description }: Props) {
  return (
    <Card className="p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border bg-background">
          <Icon className="size-5 text-primary" />
        </div>
        <div>
          <div className="font-semibold">{title}</div>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </Card>
  );
}

