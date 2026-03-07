"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", padding: "2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "1.5rem", color: "#1F3A2E" }}>Une erreur est survenue</h1>
        <p style={{ marginTop: "1rem", color: "#1F3A2E", opacity: 0.8 }}>
          Veuillez réessayer ou revenir plus tard.
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            marginTop: "1.5rem",
            padding: "0.75rem 1.5rem",
            backgroundColor: "#1F3A2E",
            color: "#F8F5F0",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            fontWeight: 500,
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
