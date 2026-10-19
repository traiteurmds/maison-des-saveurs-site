import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_ROUTES } from "../../lib/legal";
import PageHero from "../ui/PageHero";

type LegalPageShellProps = {
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export default function LegalPageShell({ label, title, intro, children }: LegalPageShellProps) {
  return (
    <>
      <PageHero eyebrow={label} title={title} intro={intro} className="pb-12 md:pb-16" />
      <div className="bg-paper pb-20">
        <article className="legal-prose container-x max-w-3xl py-14">{children}</article>
        <nav aria-label="Autres pages légales" className="container-x flex max-w-3xl flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
          <Link href={LEGAL_ROUTES.mentions} className="hover:text-ink">Mentions légales</Link>
          <Link href={LEGAL_ROUTES.cgv} className="hover:text-ink">CGV</Link>
          <Link href={LEGAL_ROUTES.privacy} className="hover:text-ink">Confidentialité</Link>
          <Link href={LEGAL_ROUTES.cookies} className="hover:text-ink">Cookies</Link>
        </nav>
      </div>
    </>
  );
}
