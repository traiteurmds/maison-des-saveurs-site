"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === "development" && error?.message) {
      console.error(error.message);
    }
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 py-24">
      <h1 className="font-serif text-2xl font-semibold text-mds-text md:text-3xl">
        Une erreur est survenue
      </h1>
      <p className="mt-4 text-center text-mds-muted">
        Veuillez réessayer ou retourner à l&apos;accueil.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-[var(--black)] px-6 py-3 font-medium text-[var(--ivory)] transition-colors hover:bg-[var(--charcoal)]"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-mds-border px-6 py-3 font-medium text-mds-text transition-colors hover:border-[var(--gold)]"
        >
          Accueil
        </Link>
      </div>
    </div>
  );
}
