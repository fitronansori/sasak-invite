import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sasak Invite — Dashboard",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="min-h-screen flex items-center justify-center">
      {children}
    </main>
  );
};
export default AuthLayout;
