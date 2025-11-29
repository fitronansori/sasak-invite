import type { ComponentType } from "react";

import {
  CalendarDays,
  Facebook,
  Gift,
  Globe,
  Image,
  Instagram,
  Link2,
  MapPin,
  MessageSquare,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";

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

export type FAQItem = {
  question: string;
  answer: string;
};

export const FAQS: FAQItem[] = [
  {
    question: "Berapa lama proses pembuatan undangan?",
    answer:
      "Biasanya 1–3 hari kerja setelah materi lengkap (foto, teks, detail acara). Paket Custom bisa lebih lama sesuai kebutuhan.",
  },
  {
    question: "Apakah bisa menggunakan domain sendiri?",
    answer:
      "Bisa. Kami membantu konfigurasi domain custom (.com/.id). Biaya domain ditagih terpisah sesuai registrar.",
  },
  {
    question: "Bagaimana cara memesan?",
    answer:
      "Pilih paket, klik tombol Pesan atau Hubungi Kami. Tim kami akan mengarahkan proses dan membantu menyiapkan konten.",
  },
  {
    question: "Apakah undangan dibuatkan langsung oleh tim?",
    answer:
      "Ya. Undangan dibuatkan langsung, bukan DIY. Anda hanya perlu memberikan materi dan preferensi desain.",
  },
  {
    question: "Bisakah mengubah konten setelah undangan jadi?",
    answer:
      "Bisa. Perubahan minor (teks, foto) dapat dilakukan tanpa biaya tambahan dalam masa revisi yang ditentukan.",
  },
];

export const FOOTER_DESCRIPTION =
  "Platform undangan digital modern dan elegan untuk berbagai momen spesial.";

export const FOOTER_CONTACT = {
  email: "info@sasakinvite.com",
  phone: "+62 812-3456-7890",
};

export type SocialItem = {
  label: string;
  href: string;
  icon: ComponentType<{ className?: string }>;
};

export const FOOTER_SOCIALS: SocialItem[] = [
  { label: "Website", href: "/", icon: Globe },
  { label: "Instagram", href: "/", icon: Instagram },
  { label: "Facebook", href: "/", icon: Facebook },
  { label: "TikTok", href: "/", icon: MessageSquare },
];

export type LegalLink = { label: string; href: string };

export const FOOTER_LEGAL: LegalLink[] = [
  { label: "Ketentuan", href: "/" },
  { label: "Privasi", href: "/" },
];

export type ShowcaseStat = {
  label: string;
  value: string;
};

export const SHOWCASE_STATS: ShowcaseStat[] = [
  { label: "Koleksi", value: "50+ Template" },
  { label: "Fitur", value: "RSVP & Bagikan" },
];

export type FeatureItem = {
  icon: ComponentType<{ className?: string }>;
  title: string;
  description: string;
};

export const FEATURES: FeatureItem[] = [
  {
    icon: Sparkles,
    title: "Template Premium",
    description: "Desain elegan siap pakai untuk berbagai acara.",
  },
  {
    icon: CalendarDays,
    title: "Jadwal & Countdown",
    description: "Atur tanggal, jam, dan hitung mundur otomatis.",
  },
  {
    icon: MapPin,
    title: "Lokasi & Peta",
    description: "Tampilkan alamat lengkap dengan integrasi peta.",
  },
  {
    icon: Share2,
    title: "Mudah Dibagikan",
    description: "Bagikan undangan lewat link, WhatsApp, dan media sosial.",
  },
  {
    icon: Image,
    title: "Galeri Foto",
    description: "Unggah foto momen spesial untuk tamu lihat.",
  },
  {
    icon: MessageSquare,
    title: "RSVP & Ucapan",
    description: "Konfirmasi kehadiran dan kumpulkan ucapan dari tamu.",
  },
];

export type PricingPlan = {
  name: string;
  price: string;
  description: string;
  features: string[];
  domainNote: string;
  cta: string;
  highlight?: boolean;
};

export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Standard",
    price: "Rp 99.000",
    description: "Undangan dibuatkan langsung dengan fitur inti.",
    features: [
      "Dibuatkan langsung oleh tim kami",
      "1 template pilihan",
      "RSVP otomatis",
      "Countdown acara",
      "Lokasi & peta",
      "Share link undangan",
    ],
    domainNote: "Domain custom tersedia, biaya domain terpisah.",
    cta: "Pesan Sekarang",
    highlight: true,
  },
  {
    name: "Custom",
    price: "Custom",
    description: "Kebutuhan khusus dan branding penuh.",
    features: [
      "Dibuatkan langsung oleh tim kami",
      "Desain kustom",
      "Penyesuaian fitur",
      "Integrasi tambahan",
      "Domain dan branding sendiri",
    ],
    domainNote: "Domain custom tersedia, biaya domain terpisah.",
    cta: "Hubungi Kami",
  },
];
