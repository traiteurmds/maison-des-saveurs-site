"use client";

import { useState } from "react";
import Image from "next/image";
import { focalPoint, IMAGE_HOVER_SCALE } from "../../lib/image-config";
import { cn } from "../../lib/utils";

type PremiumImageProps = {
  src: string;
  alt: string;
  sizes: string;
  quality?: number;
  priority?: boolean;
  objectPosition?: string;
  hover?: boolean;
  className?: string;
  placeholderClassName?: string;
  onError?: () => void;
};

export default function PremiumImage({
  src,
  alt,
  sizes,
  quality = 85,
  priority = false,
  objectPosition,
  hover = false,
  className,
  placeholderClassName,
  onError,
}: PremiumImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 bg-gradient-to-br from-[var(--surface-soft)] via-[var(--soft-gold)]/20 to-[var(--surface)]",
          placeholderClassName
        )}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      decoding="async"
      className={cn(
        "object-cover",
        hover && `transition-transform duration-700 ease-out ${IMAGE_HOVER_SCALE}`,
        className
      )}
      style={{ objectPosition: objectPosition ?? focalPoint(src) }}
      onError={() => {
        setFailed(true);
        onError?.();
      }}
    />
  );
}
