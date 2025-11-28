import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href={"/"} className={cn("flex items-center gap-2", className)}>
      <Image
        src={"/images/logo.png"}
        alt="Sasak Invite"
        width={32}
        height={32}
        priority
        className="size-8 bg-transparent"
      />

      <h1 className="text-xl md:text-2xl font-bold">Sasak Invite</h1>
    </Link>
  );
};

export default Logo;
