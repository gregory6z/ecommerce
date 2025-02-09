import Link from "next/link";
import Image from "next/image";

export function Logo() {
  return (
    <Link href="/" className="flex justify-center">
      <div className="max-h-[40px]">
        <Image
          width={120}
          height={40}
          alt="logo"
          priority
          className="h-full object-cover object-center"
          src="/logo.svg"
        />
      </div>
    </Link>
  );
}
