"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden border-t border-white/10 bg-gradient-to-br from-[#0f0f12] via-[#17171d] to-[#202029] py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, rgba(184,153,106,0.25), transparent 36%), radial-gradient(circle at 82% 8%, rgba(255,255,255,0.07), transparent 28%)",
        }}
      />
      <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="lux-heading font-serif text-4xl font-semibold text-[#f6f2eb] md:text-5xl"
        >
          Prêt à sublimer votre événement ?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg text-[#f6f2eb]/80 md:text-xl"
        >
          Demandez votre devis personnalisé et laissez-nous créer un moment d&apos;exception.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] min-w-[280px] items-center justify-center rounded-full bg-gradient-to-r from-[#b8996a] to-[#ccb287] px-10 py-5 font-medium tracking-widest text-[#14141b] shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:shadow-xl hover:shadow-[#b8996a]/30 focus:outline-none focus:ring-2 focus:ring-[#ccb287] focus:ring-offset-2 focus:ring-offset-[#17171d] md:min-h-[56px] md:min-w-[320px] md:px-12"
          >
            Demander un devis
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
