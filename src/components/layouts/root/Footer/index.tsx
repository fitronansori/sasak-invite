import Link from "next/link";
import { cn } from "@/lib/utils";
import Logo from "@/components/common/Logo";
import { NAV_LINKS } from "@/constants/navlinks";
import { Mail, Phone } from "lucide-react";
import {
  FOOTER_CONTACT,
  FOOTER_DESCRIPTION,
  FOOTER_SOCIALS,
  FOOTER_LEGAL,
} from "@/constants/data";

export default function Footer() {
  return (
    <footer
      className={cn(
        "border-t border-primary-foreground/20 bg-primary text-primary-foreground"
      )}
    >
      <div className={cn("container py-10 grid gap-8 md:grid-cols-3")}>
        <div className={cn("space-y-3")}>
          <Logo />
          <p className={cn("text-base text-primary-foreground/80 max-w-sm")}>
            {FOOTER_DESCRIPTION}
          </p>
        </div>

        <div>
          <div className={cn("font-semibold mb-3")}>Tautan Cepat</div>
          <div className={cn("grid grid-cols-2 gap-2")}>
            {NAV_LINKS.map((link, index) => (
              <Link
                key={index}
                href={link.href}
                className={cn(
                  "text-base text-primary-foreground/80 hover:opacity-90"
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
              "flex items-center gap-2 text-base text-primary-foreground/80"
            )}
          >
            <Mail className="size-4" /> {FOOTER_CONTACT.email}
          </div>
          <div
            className={cn(
              "flex items-center gap-2 text-base text-primary-foreground/80"
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
                className={cn("hover:opacity-90 text-primary-foreground")}
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className={cn("border-t border-primary-foreground/20")}>
        <div
          className={cn(
            "container py-6 text-sm text-primary-foreground/80 flex flex-col md:flex-row items-center justify-between gap-3"
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
