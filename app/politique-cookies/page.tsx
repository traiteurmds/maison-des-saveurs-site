import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Politique cookies — Maison Des Saveurs, traiteur halal Lyon.",
  alternates: { canonical: `${SITE_URL}/politique-cookies` },
};

export default function PolitiqueCookiesPage() {
  return (
    <LegalPageShell
      label="Données & cookies"
      title="Politique cookies"
      intro="Informations sur l'utilisation des cookies et traceurs sur mds-traiteur.fr."
    >
      <section>
        <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier texte déposé sur votre appareil lors de la visite d&apos;un
          site. Il permet de mémoriser certaines informations pour améliorer votre navigation.
        </p>
      </section>
      <section>
        <h2>Cookies utilisés</h2>
        <ul>
          <li>
            <strong>Cookies essentiels</strong> — nécessaires au fonctionnement du site (préférences
            de consentement, panier de sélection).
          </li>
          <li>
            <strong>Mesure d&apos;audience (Vercel Analytics)</strong> — statistiques anonymes de
            visite, activés uniquement avec votre accord.
          </li>
        </ul>
      </section>
      <section>
        <h2>Gérer vos préférences</h2>
        <p>
          Lors de votre première visite, un bandeau vous permet d&apos;accepter, refuser ou
          personnaliser les cookies. Vous pouvez modifier votre choix à tout moment via le lien
          « Gérer mes cookies » en bas de page.
        </p>
      </section>
      <section>
        <h2>Conservation</h2>
        <p>
          Votre choix de consentement est conservé localement sur votre appareil jusqu&apos;à
          modification ou suppression de vos données de navigation.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Pour toute question :{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">
            {LEGAL.email}
          </a>
        </p>
      </section>
    </LegalPageShell>
  );
}
