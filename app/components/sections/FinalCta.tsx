import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone } from "react-icons/fi";
import { PHONE_DISPLAY, PHONE_TEL } from "../../lib/site-seo";
import { WHATSAPP_SIMPLE_URL } from "../../lib/whatsapp";
import Reveal from "../ui/Reveal";

export default function FinalCta({
  title = (
    <>
      Votre date approche ? <em className="text-gold-gradient">Parlons de votre réception.</em>
    </>
  ),
  text = "Dites-nous la date, le lieu et le nombre d'invités. Nous vous répondons rapidement avec une proposition adaptée.",
}: {
  title?: React.ReactNode;
  text?: string;
}) {
  return (
    <section className="bg-ink-texture on-dark relative isolate overflow-hidden text-ivory">
      <Image
        src="/images/menu/couscous-poulet.jpg"
        alt=""
        fill
        sizes="100vw"
        quality={70}
        className="-z-20 object-cover opacity-30"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/60" aria-hidden />
      <div className="container-x section">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Devis gratuit</p>
          <h2 className="display-lg mt-5">{title}</h2>
          <p className="lead mt-6 text-ivory/75">{text}</p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/contact" className="btn btn-gold">
              Demander mon devis
            </Link>
            <a href={WHATSAPP_SIMPLE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
              <FaWhatsapp aria-hidden /> WhatsApp
            </a>
            <a href={PHONE_TEL} className="btn btn-ghost-light">
              <FiPhone aria-hidden /> {PHONE_DISPLAY}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
