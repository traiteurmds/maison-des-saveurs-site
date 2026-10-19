import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { FiClock, FiMail, FiMapPin, FiPhone } from "react-icons/fi";
import PageHero from "../components/ui/PageHero";
import QuoteForm from "../components/contact/QuoteForm";
import GoogleRating from "../components/ui/GoogleRating";
import { EMAIL, EMAIL_MAILTO, PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS } from "../lib/site-seo";
import { WHATSAPP_SIMPLE_URL } from "../lib/whatsapp";

const contacts = [
  { Icon: FiPhone, label: "Téléphone", value: PHONE_DISPLAY, href: PHONE_TEL },
  { Icon: FaWhatsapp, label: "WhatsApp", value: "Écrire un message", href: WHATSAPP_SIMPLE_URL, external: true },
  { Icon: FiMail, label: "E-mail", value: EMAIL, href: EMAIL_MAILTO },
  { Icon: FaInstagram, label: "Instagram", value: "@mds.traiteur69", href: SOCIAL_LINKS.instagram, external: true },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Devis & contact"
        title={
          <>
            Parlons de votre <em className="text-gold-gradient">événement</em>
          </>
        }
        intro="Trois étapes, une minute : votre demande arrive chez nous complète, et nous pouvons vous répondre avec un devis précis."
      >
        <GoogleRating />
      </PageHero>

      <section className="section-tight bg-paper">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_380px] lg:items-start lg:gap-12">
          <QuoteForm />

          <aside className="space-y-5 lg:sticky lg:top-[calc(var(--header-h)+24px)]">
            <div className="card p-6 md:p-7">
              <p className="eyebrow">Nous joindre</p>
              <ul className="mt-5 divide-y divide-line">
                {contacts.map(({ Icon, label, value, href, external }) => (
                  <li key={label}>
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group flex items-center gap-4 py-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-gold transition-colors group-hover:bg-ink group-hover:text-ivory">
                        <Icon aria-hidden />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-[0.16em] text-muted">{label}</span>
                        <span className="block truncate font-medium text-ink">{value}</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card space-y-4 p-6 text-sm text-muted md:p-7">
              <p className="flex gap-3">
                <FiMapPin className="mt-0.5 shrink-0 text-gold" aria-hidden />
                <span>
                  Basés à Villeurbanne, nous intervenons à Lyon et dans toute la métropole. Plus loin sur étude.
                </span>
              </p>
              <p className="flex gap-3">
                <FiClock className="mt-0.5 shrink-0 text-gold" aria-hidden />
                <span>Pour un mariage, pensez à réserver votre date le plus tôt possible.</span>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
