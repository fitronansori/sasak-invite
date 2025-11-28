"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
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
            "h-full flex flex-col items-center justify-center gap-6 text-xl font-semibold text-center"
          )}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("w-full hover:text-primary")}
            >
              {link.label}
            </Link>
          ))}

          {isAuthenticated ? (
            <Link
              href={"/dashboard"}
              className={cn("w-full hover:text-primary")}
            >
              Dashboard
            </Link>
          ) : (
            <Link href={"/sign-in"} className={cn("w-full hover:text-primary")}>
              Masuk
            </Link>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
