import Hero from "@/components/layouts/root/Hero";
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
      <h1>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Atque corrupti
        soluta possimus quos facilis nemo quasi excepturi beatae in blanditiis.
      </h1>
    </>
  );
};

export default Home;
