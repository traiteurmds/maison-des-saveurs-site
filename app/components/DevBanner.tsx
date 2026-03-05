"use client";

export default function DevBanner() {
  return (
    <div
      className="fixed left-0 right-0 top-0 z-[9999] border-b-2 border-black bg-lime-400 px-4 py-2 text-center text-sm font-bold text-black shadow-lg"
      role="banner"
    >
      SITE EN DEV — Si tu vois cette barre = le bon code est chargé. Dernière modif :{" "}
      {typeof window !== "undefined" ? new Date().toLocaleString("fr-FR") : new Date().toISOString()}
    </div>
  );
}
