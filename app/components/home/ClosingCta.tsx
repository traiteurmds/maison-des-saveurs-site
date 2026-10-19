"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiPhone } from "react-icons/fi";
import { PHONE_DISPLAY, PHONE_TEL } from "../../lib/site-seo";
import { WHATSAPP_SIMPLE_URL } from "../../lib/whatsapp";

export default function ClosingCta({
  title = (
    <>
      Parlons de votre <em>réception</em>
    </>
  ),
  text = "Dites-nous la date, le lieu et le nombre d'invités. Nous revenons vers vous avec un menu et un devis sur mesure.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useTransform(scrollYProgress, [0, 1], [-60, 120]);
  const y = useTransform(scrollYProgress, [0, 1], ["12%", "-12%"]);

  return (
    <section ref={ref} className="on-dark relative isolate overflow-hidden bg-majorelle text-ivory">
      <motion.div
        style={{ rotate, y }}
        className="pointer-events-none absolute -right-[30vw] top-1/2 -z-10 aspect-square w-[85vw] -translate-y-1/2 opacity-95 md:-right-[12vw] md:w-[52vw]"
        aria-hidden
      >
        <Image src="/images/plats/couscous.webp" alt="" fill sizes="52vw" className="object-contain drop-shadow-[0_50px_60px_rgba(0,0,0,0.45)]" />
      </motion.div>
      <div className="container-x py-[clamp(6rem,14vw,12rem)]">
        <p className="eyebrow on-dark">Votre événement</p>
        <h2 className="mt-6 max-w-4xl font-display text-[clamp(2.8rem,7.4vw,7.2rem)] leading-[0.95] tracking-[-0.04em]">
          {title}
        </h2>
        <p className="mt-8 max-w-md text-[1.02rem] leading-relaxed text-ivory/80">
          {text}
        </p>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/contact" className="btn btn-light">
            Demander un devis <FiArrowRight aria-hidden />
          </Link>
          <a href={WHATSAPP_SIMPLE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
            <FaWhatsapp aria-hidden /> WhatsApp
          </a>
        </div>
        <a href={PHONE_TEL} className="link-underline mt-10 inline-flex items-center gap-3 font-display text-2xl md:text-3xl">
          <FiPhone className="text-xl" aria-hidden /> {PHONE_DISPLAY}
        </a>
      </div>
    </section>
  );
}
