"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "../../lib/utils";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  children?: React.ReactNode;
  className?: string;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** En-tête de page éditorial : grand titre sur fond ivoire, photo qui se dévoile en dessous. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  imagePosition = "center",
  children,
  className,
}: Props) {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          // Opacité de départ non nulle : le titre compte comme affiché dès le premier rendu (LCP)
          initial: { opacity: 0.01, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, ease, delay },
        };

  return (
    <section
      className={cn(
        "relative bg-paper pt-[calc(var(--header-h)+env(safe-area-inset-top)+3rem)] md:pt-[calc(var(--header-h)+5rem)]",
        image ? "pb-6 md:pb-10" : "pb-14 md:pb-20",
        className
      )}
    >
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_0.6fr] lg:items-end lg:gap-16">
          <div>
            <motion.p className="eyebrow" {...rise(0.05)}>
              {eyebrow}
            </motion.p>
            <motion.h1 className="display-xl mt-6 text-ink" {...rise(0.12)}>
              {title}
            </motion.h1>
          </div>
          {(intro || children) && (
            <motion.div {...rise(0.25)} className="lg:pb-3">
              {intro && <p className="lead">{intro}</p>}
              {children && <div className="mt-7">{children}</div>}
            </motion.div>
          )}
        </div>

        {image && (
          <motion.div
            className="relative mt-12 aspect-[4/3] overflow-hidden bg-sand md:mt-16 md:aspect-[21/9]"
            initial={reduced ? false : { clipPath: "inset(18% 6% 0% 6%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.6, ease, delay: 0.2 }}
          >
            <motion.div
              className="absolute inset-0"
              initial={reduced ? false : { scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.8, ease, delay: 0.2 }}
            >
              <Image
                src={image}
                alt={imageAlt}
                fill
                priority
                sizes="100vw"
                quality={80}
                className="object-cover"
                style={{ objectPosition: imagePosition }}
              />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
