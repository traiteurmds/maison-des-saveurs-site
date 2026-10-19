"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { WHATSAPP_SIMPLE_URL } from "../../lib/whatsapp";
import GoogleRating from "../ui/GoogleRating";

const ease = [0.22, 1, 0.36, 1] as const;

export default function HomeHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const yBig = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -60]);
  const ySmall = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 40]);

  const fade = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.9, delay, ease },
        };

  return (
    <section className="bg-ink-texture on-dark relative isolate flex min-h-[calc(100svh-var(--mobile-bar-h)-env(safe-area-inset-bottom))] items-end lg:min-h-[100svh] overflow-hidden text-ivory lg:items-center">
      {/* Mobile : photo plein cadre */}
      <div className="absolute inset-0 -z-20 lg:hidden">
        <Image
          src="/images/menu/couscous-viande.jpg"
          alt="Couscous à la viande servi par Maison Des Saveurs"
          fill
          priority
          sizes="100vw"
          quality={78}
          className="object-cover"
          style={{ objectPosition: "center 40%" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-ink/55 to-ink" />
      </div>
      <div className="zellige pointer-events-none absolute inset-0 -z-10 opacity-40" aria-hidden />

      <div className="container-x grid w-full items-center gap-12 pb-12 pt-[calc(var(--header-h)+env(safe-area-inset-top)+2rem)] lg:grid-cols-[1.05fr_0.95fr] lg:py-[calc(var(--header-h)+3rem)]">
        <div className="max-w-2xl">
          <motion.div {...fade(0.05)}>
            <GoogleRating />
          </motion.div>

          <h1 className="mt-7">
            <motion.span {...fade(0.12)} className="eyebrow block">
              Traiteur marocain halal à Lyon
            </motion.span>
            <motion.span {...fade(0.2)} className="display-xl mt-5 block text-ivory">
              La générosité de la table <em className="text-gold-gradient font-normal">marocaine</em>
            </motion.span>
          </h1>

          <motion.p {...fade(0.32)} className="lead mt-7 max-w-xl text-ivory/80">
            Couscous, pastillas, poulet aux olives et salades royales préparés par une cheffe aux plus de 30 ans
            d&apos;expérience.<span className="hidden sm:inline"> Pour vos mariages, hlels, naissances et événements d&apos;entreprise, à Lyon et
            dans toute la métropole.</span>
          </motion.p>

          <motion.div {...fade(0.42)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link href="/menu" className="btn btn-gold">
              Composer ma réception <FiArrowRight aria-hidden />
            </Link>
            <a href={WHATSAPP_SIMPLE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
              <FaWhatsapp aria-hidden /> Écrire sur WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Desktop : composition en arcs */}
        <div className="relative hidden h-[620px] lg:block" aria-hidden>
          <motion.div
            style={{ y: yBig }}
            initial={reduced ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.15, ease }}
            className="arch absolute right-0 top-0 h-[560px] w-[400px] overflow-hidden border border-line-dark shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
          >
            <Image
              src="/images/menu/couscous-viande.jpg"
              alt=""
              fill
              priority
              sizes="400px"
              quality={82}
              className="object-cover"
            />
          </motion.div>
          <motion.div
            style={{ y: ySmall }}
            initial={reduced ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.35, ease }}
            className="arch absolute bottom-0 left-4 h-[330px] w-[240px] overflow-hidden border-4 border-ink shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
          >
            <Image src="/images/menu/pastilla.jpg" alt="" fill sizes="240px" quality={80} className="object-cover" />
          </motion.div>
          <motion.div
            initial={reduced ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.7, ease }}
            className="absolute bottom-16 right-[300px] z-10 rounded-2xl border border-line-dark bg-ink/85 px-5 py-4 backdrop-blur"
          >
            <p className="font-display text-4xl leading-none text-gold-bright">30+</p>
            <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ivory/70">ans d&apos;expérience</p>
          </motion.div>
          <div className="absolute right-[420px] top-10 h-24 w-24 rounded-full border border-line-dark" />
        </div>
      </div>
    </section>
  );
}
