"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { UserButton } from "@clerk/nextjs";

const DashboardHeader = () => {
  return (
    <header className="border-b">
      <div className="flex h-14 items-center justify-between px-4">
        <SidebarTrigger />

        <UserButton />
      </div>
    </header>
  );
};
export default DashboardHeader;
