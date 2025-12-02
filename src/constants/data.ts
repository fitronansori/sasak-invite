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
  email: "sasakinvite@gmail.com",
  phone: "+62 857-3822-4566",
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
];

export type LegalLink = { label: string; href: string };

export const FOOTER_LEGAL: LegalLink[] = [
  { label: "Ketentuan", href: "/term" },
  { label: "Privasi", href: "/privacy" },
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

export type TermSection = {
  title: string;
  content: string[];
};

export const TERMS_OF_SERVICE: TermSection[] = [
  {
    title: "1. Penerimaan Ketentuan",
    content: [
      "Dengan mengakses dan menggunakan layanan Sasak Invite, Anda menyetujui untuk terikat oleh ketentuan layanan ini. Jika Anda tidak setuju dengan ketentuan ini, mohon untuk tidak menggunakan layanan kami.",
      "Kami berhak untuk mengubah ketentuan layanan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Penggunaan berkelanjutan terhadap layanan kami setelah perubahan berarti Anda menerima ketentuan yang telah diperbarui.",
    ],
  },
  {
    title: "2. Layanan yang Disediakan",
    content: [
      "Sasak Invite menyediakan platform pembuatan undangan digital untuk berbagai acara seperti pernikahan, ulang tahun, dan acara lainnya.",
      "Tim kami akan membuat undangan digital sesuai dengan materi yang Anda berikan (foto, teks, detail acara).",
      "Kami menyediakan template premium, fitur RSVP, galeri foto, lokasi & peta, serta berbagai fitur lainnya sesuai paket yang dipilih.",
    ],
  },
  {
    title: "3. Pemesanan dan Pembayaran",
    content: [
      "Proses pembuatan undangan dimulai setelah pembayaran dikonfirmasi dan materi lengkap diterima.",
      "Waktu pengerjaan standar adalah 1-3 hari kerja untuk paket Standard. Paket Custom memerlukan waktu sesuai kompleksitas kebutuhan.",
      "Pembayaran dilakukan di muka sebelum proses pembuatan dimulai.",
      "Biaya domain custom tidak termasuk dalam harga paket dan akan ditagih terpisah sesuai registrar.",
    ],
  },
  {
    title: "4. Hak Kekayaan Intelektual",
    content: [
      "Semua template, desain, dan konten yang disediakan oleh Sasak Invite adalah milik kami dan dilindungi oleh hak cipta.",
      "Anda memiliki hak untuk menggunakan undangan yang telah dibuat untuk keperluan acara Anda.",
      "Dilarang untuk menjual kembali, mendistribusikan, atau mengklaim kepemilikan atas template dan desain kami.",
      "Konten yang Anda berikan (foto, teks, dll) tetap menjadi milik Anda.",
    ],
  },
  {
    title: "5. Revisi dan Perubahan",
    content: [
      "Revisi minor (perubahan teks, foto) dapat dilakukan dalam masa revisi yang ditentukan tanpa biaya tambahan.",
      "Revisi major atau perubahan desain yang signifikan dapat dikenakan biaya tambahan.",
      "Permintaan revisi harus disampaikan secara tertulis melalui email atau platform komunikasi yang disepakati.",
    ],
  },
  {
    title: "6. Tanggung Jawab Pengguna",
    content: [
      "Anda bertanggung jawab untuk menyediakan materi yang akurat dan lengkap (foto, teks, detail acara).",
      "Anda bertanggung jawab atas kebenaran informasi yang diberikan dalam undangan.",
      "Anda tidak boleh menggunakan layanan kami untuk tujuan yang melanggar hukum atau tidak etis.",
      "Anda bertanggung jawab untuk memastikan bahwa konten yang diberikan tidak melanggar hak cipta atau hak kekayaan intelektual pihak lain.",
    ],
  },
  {
    title: "7. Batasan Tanggung Jawab",
    content: [
      "Sasak Invite tidak bertanggung jawab atas kerugian atau kerusakan yang timbul dari penggunaan layanan kami.",
      "Kami tidak bertanggung jawab atas kesalahan dalam undangan yang disebabkan oleh informasi yang tidak akurat dari pengguna.",
      "Kami tidak bertanggung jawab atas gangguan teknis, downtime server, atau masalah yang berada di luar kendali kami.",
    ],
  },
  {
    title: "8. Pembatalan dan Pengembalian Dana",
    content: [
      "Pembatalan pesanan dapat dilakukan sebelum proses pembuatan dimulai dengan pengembalian dana 100%.",
      "Setelah proses pembuatan dimulai, pembatalan hanya dapat dilakukan dengan kebijakan pengembalian dana 50%.",
      "Setelah undangan diserahkan dan disetujui, tidak ada pengembalian dana.",
    ],
  },
  {
    title: "9. Kontak",
    content: [
      "Jika Anda memiliki pertanyaan tentang ketentuan layanan ini, silakan hubungi kami:",
      "Email: sasakinvite@gmail.com",
      "Telepon: +62 857-3822-4566",
    ],
  },
];

export type PrivacySection = {
  title: string;
  content: string[];
};

export const PRIVACY_POLICY: PrivacySection[] = [
  {
    title: "1. Informasi yang Kami Kumpulkan",
    content: [
      "Kami mengumpulkan informasi yang Anda berikan secara langsung kepada kami, termasuk:",
      "- Informasi kontak (nama, email, nomor telepon)",
      "- Informasi acara (tanggal, lokasi, detail acara)",
      "- Konten yang Anda unggah (foto, teks, video)",
      "- Informasi pembayaran (untuk pemrosesan transaksi)",
      "Kami juga mengumpulkan informasi secara otomatis saat Anda menggunakan layanan kami, seperti alamat IP, jenis browser, dan data penggunaan.",
    ],
  },
  {
    title: "2. Bagaimana Kami Menggunakan Informasi Anda",
    content: [
      "Informasi yang kami kumpulkan digunakan untuk:",
      "- Membuat dan mengelola undangan digital Anda",
      "- Memproses pembayaran dan transaksi",
      "- Berkomunikasi dengan Anda tentang pesanan dan layanan",
      "- Meningkatkan layanan dan pengalaman pengguna",
      "- Mengirimkan informasi promosi (dengan persetujuan Anda)",
      "- Mematuhi kewajiban hukum",
    ],
  },
  {
    title: "3. Berbagi Informasi",
    content: [
      "Kami tidak menjual atau menyewakan informasi pribadi Anda kepada pihak ketiga.",
      "Kami dapat berbagi informasi dengan:",
      "- Penyedia layanan pihak ketiga yang membantu operasional kami (hosting, pembayaran, dll)",
      "- Pihak berwenang jika diwajibkan oleh hukum",
      "- Pihak lain dengan persetujuan eksplisit Anda",
      "Semua pihak ketiga yang bekerja dengan kami diwajibkan untuk melindungi informasi Anda dan hanya menggunakannya untuk tujuan yang ditentukan.",
    ],
  },
  {
    title: "4. Keamanan Data",
    content: [
      "Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi informasi Anda dari akses tidak sah, kehilangan, atau penyalahgunaan.",
      "Meskipun kami berusaha melindungi data Anda, tidak ada metode transmisi melalui internet atau penyimpanan elektronik yang 100% aman.",
      "Kami secara teratur meninjau dan memperbarui praktik keamanan kami.",
    ],
  },
  {
    title: "5. Penyimpanan Data",
    content: [
      "Kami menyimpan informasi pribadi Anda selama diperlukan untuk memberikan layanan dan memenuhi kewajiban hukum kami.",
      "Undangan digital dan konten terkait akan disimpan selama masa aktif yang disepakati dalam paket layanan.",
      "Anda dapat meminta penghapusan data Anda kapan saja dengan menghubungi kami.",
    ],
  },
  {
    title: "6. Hak Anda",
    content: [
      "Anda memiliki hak untuk:",
      "- Mengakses informasi pribadi yang kami simpan tentang Anda",
      "- Meminta koreksi informasi yang tidak akurat",
      "- Meminta penghapusan informasi pribadi Anda",
      "- Menolak atau membatasi pemrosesan data Anda",
      "- Menarik persetujuan Anda kapan saja",
      "Untuk melaksanakan hak-hak ini, silakan hubungi kami melalui informasi kontak di bawah.",
    ],
  },
  {
    title: "7. Cookie dan Teknologi Pelacakan",
    content: [
      "Kami menggunakan cookie dan teknologi pelacakan serupa untuk meningkatkan pengalaman Anda di situs web kami.",
      "Cookie membantu kami memahami bagaimana Anda menggunakan layanan kami dan meningkatkan fungsionalitas.",
      "Anda dapat mengatur browser Anda untuk menolak cookie, tetapi ini dapat mempengaruhi fungsionalitas situs.",
    ],
  },
  {
    title: "8. Perubahan Kebijakan Privasi",
    content: [
      "Kami dapat memperbarui kebijakan privasi ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami atau untuk alasan operasional, hukum, atau regulasi.",
      "Perubahan signifikan akan diberitahukan melalui email atau pemberitahuan di situs web kami.",
      "Penggunaan berkelanjutan terhadap layanan kami setelah perubahan berarti Anda menerima kebijakan privasi yang diperbarui.",
    ],
  },
  {
    title: "9. Kontak",
    content: [
      "Jika Anda memiliki pertanyaan atau kekhawatiran tentang kebijakan privasi ini atau praktik privasi kami, silakan hubungi kami:",
      "Email: sasakinvite@gmail.com",
      "Telepon: +62 857-3822-4566",
    ],
  },
];
