"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "../lib/utils";

export default function NavbarLogo({ className }: { className?: string }) {
  const [logoError, setLogoError] = useState(false);

  if (logoError) return null;

  return (
    <Image
      src="/logo-ms.png"
      alt=""
      width={32}
      height={32}
      className={cn("h-8 w-8 shrink-0 object-contain", className)}
      onError={() => setLogoError(true)}
      aria-hidden
    />
  );
}
