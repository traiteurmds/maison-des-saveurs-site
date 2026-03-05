"use client";

export default function MaintenancePage() {
  return (
    <div className="relative flex min-h-screen min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-[#1F3A2E] px-6 py-16 text-center">
      {/* Fond subtil */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 120%, rgba(196, 106, 74, 0.12) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-md">
        {/* Ligne décorative */}
        <div
          className="mx-auto mb-8 h-px w-20 sm:w-24"
          style={{ background: "linear-gradient(90deg, transparent, #C46A4A, transparent)", opacity: 0.7 }}
        />

        <h1
          className="font-serif text-3xl font-semibold tracking-tight text-[#F8F5F0] sm:text-4xl md:text-5xl"
          style={{ fontFamily: "var(--font-cormorant), Georgia, serif" }}
        >
          Maison des Saveurs
        </h1>

        <p
          className="mt-6 text-base uppercase tracking-[0.3em] text-[#C46A4A] sm:text-lg sm:tracking-[0.35em]"
        >
          Site en maintenance
        </p>

        <p className="mt-8 text-[15px] leading-relaxed text-[#F8F5F0]/90 sm:text-base">
          Nous mettons à jour notre site pour vous offrir une meilleure expérience.
          <br className="hidden sm:block" />
          Revenez très bientôt.
        </p>

        <div className="mt-10 rounded-2xl border border-[#F8F5F0]/15 bg-[#F8F5F0]/05 px-5 py-4 backdrop-blur-sm">
          <p className="text-xs uppercase tracking-wider text-[#F8F5F0]/60">En cas d&apos;urgence</p>
          <p className="mt-2 text-sm text-[#F8F5F0]/95">
            <a
              href="mailto:contact.mds.traiteur@gmail.com"
              className="text-[#C46A4A] underline underline-offset-2 transition-opacity hover:opacity-90"
            >
              contact.mds.traiteur@gmail.com
            </a>
          </p>
          <p className="mt-1 text-sm text-[#F8F5F0]/95">
            <a
              href="https://wa.me/33758639734"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C46A4A] underline underline-offset-2 transition-opacity hover:opacity-90"
            >
              07 58 63 97 34
            </a>
          </p>
        </div>

        <div
          className="mx-auto mt-10 h-px w-20 sm:w-24"
          style={{ background: "linear-gradient(90deg, transparent, #C46A4A, transparent)", opacity: 0.7 }}
        />

        <div className="mt-8 flex items-center justify-center gap-2 text-[#F8F5F0]/50">
          <span className="h-2 w-2 animate-pulse rounded-full bg-[#C46A4A]" />
          <span className="text-xs uppercase tracking-widest">À très bientôt</span>
        </div>
      </div>
    </div>
  );
}
