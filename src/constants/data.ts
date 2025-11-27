import type { ComponentType } from "react";
import { Gift, Users, CalendarDays, Link2 } from "lucide-react";

export type ShowcaseItem = {
  icon: ComponentType<{ className?: string }>;
  label: string;
  description: string;
};

export const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    icon: Gift,
    label: "Pernikahan",
    description: "Tema elegan, RSVP, galeri.",
  },
  {
    icon: Users,
    label: "Ulang Tahun",
    description: "Hitung mundur, lokasi, ucapan.",
  },
  {
    icon: CalendarDays,
    label: "Acara Keluarga",
    description: "Agenda, peta, konfirmasi.",
  },
  {
    icon: Link2,
    label: "Event Komunitas",
    description: "Tiket, share link, branding.",
  },
];

export type ShowcaseStat = {
  label: string;
  value: string;
};

export const SHOWCASE_STATS: ShowcaseStat[] = [
  { label: "Koleksi", value: "50+ Template" },
  { label: "Fitur", value: "RSVP & Bagikan" },
];
