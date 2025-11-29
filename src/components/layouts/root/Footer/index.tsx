import Link from "next/link";

import { Mail, Phone } from "lucide-react";

import { cn } from "@/lib/utils";

import Logo from "@/components/common/Logo";

import {
  FOOTER_CONTACT,
  FOOTER_DESCRIPTION,
  FOOTER_LEGAL,
  FOOTER_SOCIALS,
} from "@/constants/data";
import { NAV_LINKS } from "@/constants/navlinks";

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-primary-foreground/20 bg-primary text-primary-foreground border-t"
      )}
    >
      <div className={cn("container grid gap-8 py-10 md:grid-cols-3")}>
        <div className={cn("space-y-3")}>
          <div className={cn("inline-block rounded-full bg-white px-4 py-2")}>
            <Logo className="text-foreground" />
          </div>
          <p className={cn("text-primary-foreground/80 max-w-sm text-base")}>
            {FOOTER_DESCRIPTION}
          </p>
        </div>

        <div>
          <div className={cn("mb-3 font-semibold")}>Tautan Cepat</div>
          <div className={cn("grid grid-cols-2 gap-2")}>
            {NAV_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "text-primary-foreground/80 text-base hover:opacity-90"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className={cn("space-y-3")}>
          <div className={cn("font-semibold")}>Kontak</div>
          <div
            className={cn(
              "text-primary-foreground/80 flex items-center gap-2 text-base"
            )}
          >
            <Mail className="size-4" /> {FOOTER_CONTACT.email}
          </div>
          <div
            className={cn(
              "text-primary-foreground/80 flex items-center gap-2 text-base"
            )}
          >
            <Phone className="size-4" /> {FOOTER_CONTACT.phone}
          </div>
          <div className={cn("flex items-center gap-3 pt-2")}>
            {FOOTER_SOCIALS.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className={cn("text-primary-foreground hover:opacity-90")}
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={cn("border-primary-foreground/20 border-t")}>
        <div
          className={cn(
            "text-primary-foreground/80 container flex flex-col items-center justify-between gap-3 py-6 text-sm md:flex-row"
          )}
        >
          <div>
            © {new Date().getFullYear()} Sasak Invite. All rights reserved.
          </div>
          <div className={cn("flex items-center gap-4")}>
            {FOOTER_LEGAL.map((l, i) => (
              <Link key={i} href={l.href} className={cn("hover:opacity-90")}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
