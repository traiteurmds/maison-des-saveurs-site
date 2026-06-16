import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV Maison Des Saveurs — traiteur halal événementiel Lyon.",
  alternates: { canonical: `${SITE_URL}/conditions-generales-de-vente` },
  robots: { index: true, follow: true },
};

export default function CgvPage() {
  return (
    <LegalPageShell
      label="Prestations traiteur"
      title="Conditions générales de vente"
      intro="Conditions applicables aux prestations de traiteur proposées par Maison Des Saveurs."
    >
      <section>
        <h2>1. Prestataire</h2>
        <p>
          {LEGAL.tradeName} — {LEGAL.legalForm}, SIRET {LEGAL.siret}, {LEGAL.adminAddress}. Contact
          :{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">
            {LEGAL.email}
          </a>{" "}
          — {LEGAL.phone}. {LEGAL.vatNotice}.
        </p>
      </section>

      <section>
        <h2>2. Objet</h2>
        <p>
          Les présentes CGV régissent les prestations de traiteur (buffets, repas, cocktails,
          événements privés ou professionnels) commandées auprès de {LEGAL.tradeName}.
        </p>
      </section>

      <section>
        <h2>3. Devis et commande</h2>
        <p>
          Toute prestation fait l&apos;objet d&apos;un devis personnalisé. La commande est confirmée
          après acceptation écrite du devis (email ou signature) et versement de l&apos;acompte.
        </p>
      </section>

      <section>
        <h2>4. Acompte et paiement</h2>
        <ul>
          <li>
            <strong>Acompte de 30 %</strong> exigé pour confirmer la commande ;
          </li>
          <li>
            <strong>Solde</strong> à régler le jour J ou avant l&apos;événement, selon les modalités
            convenues au devis ;
          </li>
          <li>
            L&apos;acompte est <strong>non remboursable</strong> en cas d&apos;annulation par le
            client.
          </li>
        </ul>
      </section>

      <section>
        <h2>5. Modification et annulation</h2>
        <p>
          Le client peut modifier le nombre d&apos;invités jusqu&apos;à{" "}
          <strong>2 semaines avant l&apos;événement</strong>, sous réserve de disponibilité et
          d&apos;ajustement du devis. Toute annulation entraîne la conservation de l&apos;acompte
          versé.
        </p>
      </section>

      <section>
        <h2>6. Allergies et restrictions alimentaires</h2>
        <p>
          Le client s&apos;engage à signaler <strong>toutes les allergies et restrictions
          alimentaires</strong> avant validation définitive de la commande. Malgré toutes les
          précautions, nos préparations peuvent contenir ou avoir été en contact avec des allergènes
          suivants :
        </p>
        <ul>
          {LEGAL.allergens.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2>7. Obligations du client</h2>
        <p>
          Le client fournit les informations exactes (date, lieu, accès, horaires, effectif) et
          garantit les conditions d&apos;accès et d&apos;installation convenues au devis.
        </p>
      </section>

      <section>
        <h2>8. Responsabilité</h2>
        <p>
          {LEGAL.tradeName} s&apos;engage à fournir une prestation conforme au devis accepté. Sa
          responsabilité est limitée au montant de la prestation, sauf faute lourde ou dolosive.
        </p>
      </section>

      <section>
        <h2>9. Médiation</h2>
        <p>
          Conformément aux dispositions relatives à la médiation de la consommation : {LEGAL.mediator}
        </p>
      </section>

      <section>
        <h2>10. Droit applicable</h2>
        <p>
          Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux
          compétents seront ceux du ressort du siège du prestataire, après tentative de résolution
          amiable.
        </p>
      </section>
    </LegalPageShell>
  );
}
