"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaTiktok } from "react-icons/fa";

type Caftan = {
  id: string;
  title: string;
  occasion: string;
  image: string;
};

const caftans: Caftan[] = [
  { id: "caftan-01", title: "Caftan Émeraude", occasion: "Mariage", image: "/images/caftans/caftan-01.jpg" },
  { id: "caftan-02", title: "Caftan Ivoire", occasion: "Fiançailles", image: "/images/caftans/caftan-02.jpg" },
  { id: "caftan-03", title: "Caftan Royal Bleu", occasion: "Soirée", image: "/images/caftans/caftan-03.jpg" },
  { id: "caftan-04", title: "Caftan Velours Prune", occasion: "Réception", image: "/images/caftans/caftan-04.jpg" },
  { id: "caftan-05", title: "Caftan Champagne", occasion: "Mariage", image: "/images/caftans/caftan-05.jpg" },
  { id: "caftan-06", title: "Caftan Noir Doré", occasion: "Soirée", image: "/images/caftans/caftan-06.jpg" },
  { id: "caftan-07", title: "Caftan Rose Poudré", occasion: "Fête familiale", image: "/images/caftans/caftan-07.jpg" },
  { id: "caftan-08", title: "Caftan Terracotta", occasion: "Réception", image: "/images/caftans/caftan-08.jpg" },
  { id: "caftan-09", title: "Caftan Grenat", occasion: "Mariage", image: "/images/caftans/caftan-09.jpg" },
  { id: "caftan-10", title: "Caftan Satin Perlé", occasion: "Cérémonie", image: "/images/caftans/caftan-10.jpg" },
  { id: "caftan-11", title: "Caftan Vert Olive", occasion: "Soirée", image: "/images/caftans/caftan-11.jpg" },
  { id: "caftan-12", title: "Caftan Rubis", occasion: "Fiançailles", image: "/images/caftans/caftan-12.jpg" },
];

function CaftanCard({ item, index }: { item: Caftan; index: number }) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: index * 0.03, ease: [0.22, 1, 0.36, 1] }}
      className="group overflow-hidden rounded-2xl border border-deep-green/10 bg-white shadow-[0_18px_45px_rgba(15,31,24,0.10)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(15,31,24,0.18)]"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        {imageError ? (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-deep-green/90 via-deep-green to-black text-center text-beige">
            <div>
              <p className="font-serif text-2xl font-semibold">Photo {index + 1}</p>
              <p className="mt-2 text-sm text-beige/80">Ajoute {item.image}</p>
            </div>
          </div>
        ) : (
          <Image
            src={item.image}
            alt={`${item.title} - ${item.occasion}`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <p className="text-xs tracking-[0.22em] uppercase text-beige/80">{item.occasion}</p>
          <h2 className="mt-1 font-serif text-2xl font-semibold leading-tight">{item.title}</h2>
        </div>
      </div>
    </motion.article>
  );
}

export default function CaftansPage() {
  return (
    <div className="bg-beige pt-24 pb-24">
      <section className="border-b border-deep-green/10 bg-gradient-to-b from-[#f7f0e7] to-beige px-6 py-16 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-serif text-sm uppercase tracking-[0.28em] text-terracotta"
        >
          Collection élégance
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="mt-3 font-serif text-5xl font-semibold text-deep-green md:text-6xl"
        >
          Nos Caftans
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-deep-green/80"
        >
          Une sélection raffinée de caftans pour vos plus beaux événements. Location et vente,
          avec accompagnement personnalisé pour trouver la tenue parfaite.
        </motion.p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 rounded-2xl border border-deep-green/10 bg-gradient-to-r from-deep-green via-[#173126] to-deep-green p-7 text-center text-beige shadow-[0_12px_34px_rgba(15,31,24,0.28)]"
        >
          <p className="font-serif text-3xl font-semibold md:text-4xl">MDS x Lamia Créations</p>
          <p className="mx-auto mt-3 max-w-2xl text-beige/80">
            Découvrez nos inspirations, nouveautés et coulisses sur TikTok.
          </p>
          <a
            href="https://www.tiktok.com/@lamia.creations?is_from_webapp=1&sender_device=pc"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-3 rounded-full border border-beige/45 bg-beige/10 px-8 py-3 font-medium tracking-[0.14em] text-beige transition-all duration-300 hover:-translate-y-0.5 hover:bg-beige/20"
            aria-label="TikTok Lamia Créations"
          >
            <FaTiktok className="text-lg" />
            Suivre sur TikTok
          </a>
        </motion.div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {caftans.map((item, index) => (
            <CaftanCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 rounded-2xl border border-deep-green/10 bg-white px-8 py-10 text-center shadow-[0_10px_30px_rgba(15,31,24,0.08)]"
        >
          <h3 className="font-serif text-3xl font-semibold text-deep-green">Un essayage sur mesure</h3>
          <p className="mx-auto mt-3 max-w-2xl text-deep-green/80">
            Contactez-nous pour la disponibilité, les tailles et les conditions de location/vente.
          </p>
          <Link
            href="/contact"
            className="mt-7 inline-flex min-h-[52px] items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-[0.16em] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta/90"
          >
            Demander un devis
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
