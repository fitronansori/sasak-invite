import { Button } from "@/components/ui/button";
import { CalendarDays, Share2, Sparkles } from "lucide-react";
import ShowcaseCard from "./ShowcaseCard";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-chart-2/20 blur-2xl" />
        <div className="absolute -right-10 top-20 h-72 w-72 rounded-full bg-chart-4/20 blur-2xl" />
      </div>

      <div className="container grid gap-10 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm text-muted-foreground">
            <Sparkles className="size-4 text-primary" />
            <span>Undangan digital modern untuk momen spesial</span>
          </div>

          <h1 className="text-balance text-3xl font-bold tracking-tight md:text-5xl">
            Buat Undangan Digital dengan Mudah, Elegan, dan Dapat Dibagikan
          </h1>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            Sasak Invite membantu Anda menyiapkan undangan yang indah dengan
            RSVP otomatis, tautan yang bisa dibagikan, dan tampilan yang
            responsif.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg">Buat Undangan</Button>
            <Button variant="ghost" size="lg">
              Lihat Demo
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="inline-flex items-center gap-2">
              <CalendarDays className="size-4" />
              <span>Atur jadwal & lokasi</span>
            </div>
            <div className="inline-flex items-center gap-2">
              <Share2 className="size-4" />
              <span>Bagikan ke tamu</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <ShowcaseCard />

          <div className="pointer-events-none absolute -left-6 -top-6 size-20 rounded-full bg-primary/30 blur-xl" />
          <div className="pointer-events-none absolute -bottom-10 -right-8 size-24 rounded-full bg-chart-3/30 blur-xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
