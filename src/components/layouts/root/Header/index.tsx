import Link from "next/link";

import { currentUser } from "@clerk/nextjs/server";

import { cn } from "@/lib/utils";

import Logo from "@/components/common/Logo";
import { Button } from "@/components/ui/button";

import { NAV_LINKS } from "@/constants/navlinks";

import MobileMenu from "./MobileMenu";

export default async function Header() {
  const user = await currentUser();

  return (
    <header
      className={cn(
        "bg-background/80 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 border-b backdrop-blur"
      )}
    >
      <div className={cn("container flex h-16 items-center justify-between")}>
        <div className={cn("flex items-center gap-3")}>
          <Logo />
        </div>

        <nav className={cn("hidden items-center gap-6 text-base md:flex")}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn("hover:text-primary")}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className={cn("flex items-center gap-2")}>
          <MobileMenu isAuthenticated={!!user} />

          <div className={cn("hidden items-center md:flex")}>
            {user ? (
              <Button size={"lg"} asChild>
                <Link href={"/dashboard"}>Dashboard</Link>
              </Button>
            ) : (
              <Button size={"lg"} asChild>
                <Link href={"/sign-in"}>Masuk</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
