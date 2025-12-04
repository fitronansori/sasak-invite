import Link from "next/link";

import { Button } from "@/components/ui/button";

interface WhatsAppButtonProps {
  phone_number?: string;
  variant?:
    | "default"
    | "outline"
    | "ghost"
    | "link"
    | "destructive"
    | "secondary";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
  children?: React.ReactNode;
}

const WhatsAppButton = ({
  phone_number = "6285738224566",
  variant = "outline",
  size = "lg",
  className,
  children,
}: WhatsAppButtonProps) => {
  const message =
    "Halo, saya ingin konsultasi mengenai pembuatan undangan digital. Bisa bantu?";
  const wa_href = `https://api.whatsapp.com/send?phone=${phone_number}&text=${encodeURIComponent(
    message
  )}`;

  return (
    <Button variant={variant} size={size} className={className} asChild>
      <Link href={wa_href} target="_blank" rel="noopener noreferrer">
        {children || <>Konsultasi Gratis</>}
      </Link>
    </Button>
  );
};

export default WhatsAppButton;
