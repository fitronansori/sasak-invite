import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href={"/"} className="flex items-center gap-2">
      <Image
        src={"/svg/logo.svg"}
        alt="Sasak Invite"
        width={32}
        height={32}
        priority
        className="size-8"
      />

      <h1 className="text-xl md:text-2xl font-bold">Sasak Invite</h1>
    </Link>
  );
};

export default Logo;
