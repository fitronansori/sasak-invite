import Footer from "@/components/layouts/root/Footer";
import Header from "@/components/layouts/root/Header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default HomeLayout;
