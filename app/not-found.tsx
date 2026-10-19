import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "Page introuvable",
  robots: { index: false },
};

export default function NotFound() {
  return (
    <section className="flex min-h-[80svh] items-center bg-paper pt-[calc(var(--header-h)+3rem)] pb-24">
      <div className="container-x max-w-3xl">
        <p className="eyebrow">Erreur 404</p>
        <h1 className="display-lg mt-4">
          Cette page n&apos;est plus <em className="text-gold-gradient">au menu</em>
        </h1>
        <p className="lead mt-6 max-w-xl">
          L&apos;adresse a peut-être changé. Retrouvez nos plats, nos prestations ou demandez directement votre devis.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-ink">
            Retour à l&apos;accueil <FiArrowRight aria-hidden />
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Demander un devis
          </Link>
        </div>
      </div>
    </section>
  );
}
