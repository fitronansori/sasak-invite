"use client";

import Link from "next/link";

import { UserButton } from "@clerk/nextjs";
import { HomeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

const DashboardHeader = () => {
  return (
    <header className="border-b">
      <div className="flex h-14 items-center justify-between px-4">
        <SidebarTrigger />

        <div className="flex items-center justify-center gap-4">
          <Button variant={"outline"} asChild>
            <Link href={"/"}>
              <HomeIcon />
              Pergi ke Beranda
            </Link>
          </Button>

          <UserButton />
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;
