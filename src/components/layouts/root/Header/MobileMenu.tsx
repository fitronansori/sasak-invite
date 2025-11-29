"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { NAV_LINKS } from "@/constants/navlinks";

type MobileMenuProps = {
  isAuthenticated: boolean;
};

const MobileMenu = ({ isAuthenticated }: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Buka menu"
          className={cn("md:hidden")}
        >
          <Menu className={cn("size-5")} />
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        {/* to avoid erorr */}
        <SheetHeader className="hidden">
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>menu</SheetDescription>
        </SheetHeader>

        <nav
          className={cn(
            "flex h-full flex-col items-center justify-center gap-6 text-center text-xl font-semibold"
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("hover:text-primary w-full")}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <Link
              href={"/dashboard"}
              className={cn("hover:text-primary w-full")}
            >
              Dashboard
            </Link>
          ) : (
            <Link href={"/sign-in"} className={cn("hover:text-primary w-full")}>
              Masuk
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
