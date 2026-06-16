import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Politique cookies",
  description: "Politique cookies et gestion du consentement — Maison Des Saveurs.",
  alternates: { canonical: `${SITE_URL}/politique-cookies` },
  robots: { index: true, follow: true },
};

export default function PolitiqueCookiesPage() {
  return (
    <LegalPageShell
      label="Cookies & consentement"
      title="Politique cookies"
      intro="Transparence sur les traceurs utilisés et comment gérer vos choix."
    >
      <section>
        <h2>Qu&apos;est-ce qu&apos;un cookie ?</h2>
        <p>
          Un cookie est un petit fichier déposé sur votre terminal lors de la visite d&apos;un site.
          Il permet de mémoriser des informations pour améliorer votre expérience ou mesurer
          l&apos;audience.
        </p>
      </section>

      <section>
        <h2>Notre approche (CNIL)</h2>
        <p>
          Aucun cookie analytics ou marketing n&apos;est déposé avant votre consentement. Vous pouvez
          accepter, refuser ou personnaliser vos choix via le bandeau affiché lors de votre première
          visite, ou à tout moment depuis le pied de page (« Gérer les cookies »).
        </p>
      </section>

      <section>
        <h2>Cookies essentiels</h2>
        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nom / stockage</th>
                <th>Finalité</th>
                <th>Durée</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <code>mds-cookie-consent-v1</code> (localStorage)
                </td>
                <td>Mémoriser vos préférences cookies</td>
                <td>13 mois max. (renouvelable)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2>Cookies analytics (consentement requis)</h2>
        <div className="legal-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Service</th>
                <th>Finalité</th>
                <th>Éditeur</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Vercel Analytics</td>
                <td>Mesure d&apos;audience agrégée (pages vues, trafic)</td>
                <td>
                  <a
                    href="https://vercel.com/docs/analytics"
                    className="legal-link"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Vercel Inc.
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-mds-muted">
          Ces cookies ne sont activés que si vous cliquez sur « Accepter » ou activez « Mesure
          d&apos;audience » dans Personnaliser.
        </p>
      </section>

      <section>
        <h2>Cookies marketing</h2>
        <p>
          {LEGAL.tradeName} n&apos;utilise actuellement aucun cookie publicitaire ou de reciblage.
          L&apos;option marketing dans le panneau de préférences est prévue pour une éventuelle
          évolution future et reste désactivée par défaut.
        </p>
      </section>

      <section>
        <h2>Modifier vos choix</h2>
        <p>
          Utilisez le lien « Gérer les cookies » en bas de chaque page, ou supprimez les données
          locales de votre navigateur pour réinitialiser le bandeau.
        </p>
      </section>

      <section>
        <h2>Contact</h2>
        <p>
          Questions :{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">
            {LEGAL.email}
          </a>
        </p>
      </section>
    </LegalPageShell>
  );
}
