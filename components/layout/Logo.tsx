import Link from "next/link";

import Image from "next/image";

type LogoProps = {
  size?: "default" | "large";
};

export function Logo({ size = "default" }: LogoProps) {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span className={size === "large" ? "inline-flex h-10 items-center overflow-hidden" : "inline-flex h-10 items-center"}>
        <Image
          src="/logo/nitro-clean-logo.svg"
          alt="Nitro Clean"
          width={180}
          height={56}
          className={
            "h-10 w-auto origin-left " +
            (size === "large" ? "scale-140" : "scale-125")
          }
          priority
        />
      </span>
    </Link>
  );
}
