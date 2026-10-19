"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";

const TEXT =
  "Chez Maison Des Saveurs, chaque plat est préparé comme pour notre propre famille. Une cuisine marocaine faite maison, halal et généreuse, dressée avec soin et servie le jour J pour que vous profitiez pleinement de vos invités.";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT.split(" ");

  return (
    <section className="section bg-paper">
      <div className="container-x grid gap-10 lg:grid-cols-[0.28fr_1fr]">
        <div className="flex flex-col justify-between gap-8">
          <p className="eyebrow">La maison</p>
          <div className="hidden lg:block">
            <p className="font-display text-7xl leading-none">30+</p>
            <p className="mt-2 text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-muted">
              ans d&apos;expérience de la cheffe
            </p>
          </div>
        </div>
        <div>
          <p ref={ref} className="font-display text-[clamp(1.75rem,3.9vw,3.6rem)] leading-[1.14] tracking-[-0.02em] text-ink">
            {words.map((w, i) => (
              <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
            ))}
          </p>
          <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5">
            <Link href="/services" className="btn btn-outline">
              Nos prestations <FiArrowUpRight aria-hidden />
            </Link>
            <div className="flex items-center gap-8 lg:hidden">
              <div>
                <p className="font-display text-5xl leading-none">30+</p>
                <p className="mt-1 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted">ans d&apos;expérience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
