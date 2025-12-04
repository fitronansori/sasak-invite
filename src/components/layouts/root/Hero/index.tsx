import Link from "next/link";

import { CalendarDays, Share2, Sparkles } from "lucide-react";

import WhatsAppButton from "@/components/common/WhatsAppButton";
import { Button } from "@/components/ui/button";

import ShowcaseCard from "./ShowcaseCard";

const Hero = () => {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-primary/20 absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full blur-3xl" />
        <div className="bg-chart-2/20 absolute bottom-0 left-0 h-64 w-64 rounded-full blur-2xl" />
        <div className="bg-chart-4/20 absolute top-20 -right-10 h-72 w-72 rounded-full blur-2xl" />
      </div>

      <div className="container grid gap-10 py-20 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-6">
          <div className="text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
            <Sparkles className="text-primary size-4" />
            <span>Undangan digital modern untuk momen spesial</span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Buat Undangan Digital dengan Mudah, Elegan, dan Dapat Dibagikan
          </h1>
          <p className="text-muted-foreground text-base text-pretty md:text-lg">
            Sasak Invite membantu Anda menyiapkan undangan yang indah dengan
            RSVP otomatis, tautan yang bisa dibagikan, dan tampilan yang
            responsif.
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Button size="lg" asChild>
              <Link href={"/templates"}>Buat Undangan</Link>
            </Button>
            <WhatsAppButton />
          </div>

          <div className="text-muted-foreground mt-4 flex flex-wrap gap-4 text-sm">
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

          <div className="bg-primary/30 pointer-events-none absolute -top-6 -left-6 size-20 rounded-full blur-xl" />
          <div className="bg-chart-3/30 pointer-events-none absolute -right-8 -bottom-10 size-24 rounded-full blur-xl" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
