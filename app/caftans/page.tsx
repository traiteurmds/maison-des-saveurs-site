import type { Metadata } from "next";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import PageHero from "../components/ui/PageHero";
import Reveal from "../components/ui/Reveal";
import CaftansGrid from "../components/caftans/CaftansGrid";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Caftans marocains à Lyon : location et vente",
  description:
    "Collection de caftans MDS x Lamia Créations : location et vente de caftans marocains pour mariages, hlels et fêtes à Lyon, avec essayage sur demande.",
  alternates: { canonical: `${SITE_URL}/caftans` },
};

export default function CaftansPage() {
  return (
    <>
      <PageHero
        eyebrow="MDS x Lamia Créations"
        title={
          <>
            Des caftans <em className="text-gold-gradient">pour briller</em>
          </>
        }
        intro="Une sélection raffinée de caftans pour vos plus beaux événements. Location et vente, avec un accompagnement personnalisé et un essayage sur demande."
        image="/images/caftans/caftan-03.jpg"
        imagePosition="center 20%"
      >
        <a
          href="https://www.tiktok.com/@lamia.creations"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline"
        >
          <FaTiktok aria-hidden /> Lamia Créations sur TikTok
        </a>
      </PageHero>

      <section className="section-tight bg-paper">
        <div className="container-x">
          <Reveal className="mb-10 max-w-2xl">
            <p className="lead">
              Touchez un modèle pour l&apos;ajouter à votre demande, ou agrandissez-le pour le voir en détail.
              Nous vous répondons avec les disponibilités, les tailles et les conditions.
            </p>
          </Reveal>
          <CaftansGrid />
          <Reveal className="mt-14 flex flex-col items-start gap-6 rounded-[var(--radius)] border border-line bg-[#fffdf9] p-7 shadow-[var(--shadow)] md:flex-row md:items-center md:justify-between md:p-9">
            <div>
              <p className="font-display text-3xl text-ink">Un essayage sur mesure</p>
              <p className="mt-2 text-muted">Disponibilités, tailles, location ou vente : demandez-nous.</p>
            </div>
            <Link href="/contact" className="btn btn-gold w-full md:w-auto">
              Envoyer ma demande <FiArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
