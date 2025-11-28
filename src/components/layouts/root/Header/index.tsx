import Link from "next/link";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import MobileMenu from "./MobileMenu";
import { NAV_LINKS } from "@/constants/navlinks";
import Logo from "@/components/common/Logo";
import { currentUser } from "@clerk/nextjs/server";

export default async function Header() {
  const user = await currentUser();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60"
      )}
    >
      <div className={cn("container flex h-16 items-center justify-between")}>
        <div className={cn("flex items-center gap-3")}>
          <Logo />
        </div>

        <nav className={cn("hidden md:flex items-center gap-6 text-base")}>
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

          <div className={cn("hidden md:flex items-center")}>
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
