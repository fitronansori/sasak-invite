import { LayoutGrid } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { SHOWCASE_ITEMS, SHOWCASE_STATS } from "@/constants/data";

export default function ShowcaseCard() {
  return (
    <Card className="supports-backdrop-filter:bg-background/70 mx-auto w-full max-w-xl backdrop-blur">
      <CardHeader className="text-center">
        <CardTitle className="inline-flex items-center justify-center gap-2 text-2xl">
          <LayoutGrid className="text-primary size-5" /> Koleksi Template
        </CardTitle>
        <CardDescription>
          Satu platform untuk berbagai jenis acara — pilih, sesuaikan, dan
          bagikan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {SHOWCASE_ITEMS.map(({ icon: Icon, label, description }) => (
            <div key={label} className="rounded-xl border p-4">
              <div className="flex items-center gap-2">
                <Icon className="text-primary size-4" />
                <span className="font-medium">{label}</span>
              </div>
              <p className="text-muted-foreground mt-1 text-sm">
                {description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {SHOWCASE_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-lg border px-3 py-2 text-center"
            >
              <div className="text-muted-foreground text-xs">{s.label}</div>
              <div className="text-sm font-semibold">{s.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
