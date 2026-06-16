import Link from "next/link";
import type { ReactNode } from "react";
import { LEGAL_ROUTES } from "../../lib/legal";

type LegalPageShellProps = {
  label: string;
  title: string;
  intro?: string;
  children: ReactNode;
};

export default function LegalPageShell({ label, title, intro, children }: LegalPageShellProps) {
  return (
    <div className="bg-mds-bg pt-28 pb-24">
      <section className="relative overflow-hidden border-b border-mds-border px-6 py-14 md:py-16">
        <div className="mds-pattern pointer-events-none absolute inset-0 opacity-10" aria-hidden />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)]">{label}</p>
          <h1 className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-base leading-relaxed text-mds-muted md:text-lg">{intro}</p>
          )}
        </div>
      </section>

      <article className="legal-prose mx-auto max-w-3xl px-6 py-12 lg:px-8">{children}</article>

      <nav
        aria-label="Autres pages légales"
        className="mx-auto flex max-w-3xl flex-wrap justify-center gap-x-4 gap-y-2 px-6 pb-8 text-xs text-mds-muted"
      >
        <Link href={LEGAL_ROUTES.mentions} className="hover:text-mds-text">
          Mentions légales
        </Link>
        <span aria-hidden>·</span>
        <Link href={LEGAL_ROUTES.cgv} className="hover:text-mds-text">
          CGV
        </Link>
        <span aria-hidden>·</span>
        <Link href={LEGAL_ROUTES.privacy} className="hover:text-mds-text">
          Confidentialité
        </Link>
        <span aria-hidden>·</span>
        <Link href={LEGAL_ROUTES.cookies} className="hover:text-mds-text">
          Cookies
        </Link>
      </nav>
    </div>
  );
}
