import Hero from "@/components/layouts/root/Hero";
import Templates from "@/components/layouts/root/Templates";
import Features from "@/components/layouts/root/Features";
import Pricing from "@/components/layouts/root/Pricing";
import FAQ from "@/components/layouts/root/FAQ";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sasak Invite — Platform Undangan Digital Modern & Elegan",
  description:
    "Buat undangan digital untuk pernikahan, ulang tahun, acara keluarga, dan berbagai event lainnya. Pilih template premium, kelola tamu, dan bagikan undangan hanya dengan satu klik.",
};

const Home = () => {
  return (
    <>
      <Hero />
      <Templates />
      <Features />
      <Pricing />
      <FAQ />
    </>
  );
};

export default Home;
