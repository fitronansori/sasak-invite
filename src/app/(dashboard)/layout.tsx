import { Metadata } from "next";
import { cookies } from "next/headers";

import { AppSidebar } from "@/components/layouts/dashboard/AppSidebar";
import DashboardHeader from "@/components/layouts/dashboard/DashboardHeader";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

export const metadata: Metadata = {
  title: "Sasak Invite — Dashboard",
};

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true";

  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AppSidebar />
      <SidebarInset>
        <main>
          <DashboardHeader />
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};
export default DashboardLayout;
