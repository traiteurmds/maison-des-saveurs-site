"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";

// Couleurs en dur pour garantir la visibilité partout
const colors = {
  dark: "#1F3A2E",
  terracotta: "#C46A4A",
  terracottaHover: "#A85A3A",
  beige: "#F8F5F0",
  beigeDark: "#EDE8E0",
  white: "#FFFFFF",
  border: "rgba(31, 58, 46, 0.25)",
  placeholder: "rgba(31, 58, 46, 0.5)",
} as const;

type StatusState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export default function ContactPage() {
  const [status, setStatus] = useState<StatusState>(null);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement & {
      name: HTMLInputElement;
      email: HTMLInputElement;
      message: HTMLTextAreaElement;
    };

    const name = form.name.value;
    const email = form.email.value;
    const message = form.message.value;

    // Log des paramètres envoyés à EmailJS pour vérification
    // eslint-disable-next-line no-console
    console.log("EmailJS send payload:", {
      serviceId: "service_abcd123",
      templateId: "template_tcbmdth",
      name,
      email,
      message,
    });

    try {
      await emailjs.send(
        "service_abcd123",
        "template_tcbmdth",
        {
          name,
          email,
          message,
        },
        "JzBCJK41sDIKxSKXQ"
      );

      setStatus({
        type: "success",
        message:
          "Votre demande a été envoyée avec succès.",
      });
      form.reset();
    } catch (error) {
      // Log pour faciliter le debug en local et sur Vercel
      // eslint-disable-next-line no-console
      console.error("EmailJS error:", error);
      setStatus({
        type: "error",
        message:
          "Une erreur est survenue. Merci de réessayer.",
      });
    }
  };

  return (
    <div style={{ paddingTop: "6rem", minHeight: "100vh" }} className="contact-page">
      <style>{`
        .contact-page input::placeholder,
        .contact-page textarea::placeholder {
          color: rgba(31, 58, 46, 0.5);
        }
      `}</style>
      {/* Hero */}
      <section
        style={{
          padding: "4rem 1.5rem",
          textAlign: "center",
          backgroundColor: colors.beige,
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: colors.terracotta,
            margin: 0,
          }}
        >
          Écrivez-nous
        </p>
        <h1
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
            fontWeight: 600,
            color: colors.dark,
            margin: "0.5rem 0 0",
          }}
        >
          Contact
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: colors.dark,
            opacity: 0.85,
            margin: "1rem 0 0",
            maxWidth: "36rem",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Parlez-nous de votre événement. Nous vous répondrons sous 24 h.
        </p>
      </section>

      {/* Formulaire dans une carte blanche */}
      <section
        style={{
          padding: "4rem 1.5rem",
          backgroundColor: colors.beige,
        }}
      >
        <div style={{ maxWidth: "32rem", margin: "0 auto" }}>
          <form
            onSubmit={sendEmail}
            style={{
              backgroundColor: colors.white,
              padding: "2.5rem",
              borderRadius: "12px",
              boxShadow: "0 4px 24px rgba(31, 58, 46, 0.08)",
              display: "flex",
              flexDirection: "column",
              gap: "1.5rem",
            }}
          >
            <div>
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: colors.dark,
                  marginBottom: "0.5rem",
                }}
              >
                Nom *
              </label>
              <input
                id="name"
                type="text"
                name="name"
                required
                placeholder="Votre nom"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  color: colors.dark,
                  backgroundColor: colors.white,
                  border: `2px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.terracotta;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.terracotta}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: colors.dark,
                  marginBottom: "0.5rem",
                }}
              >
                Email *
              </label>
              <input
                id="email"
                type="email"
                name="email"
                required
                placeholder="vous@exemple.fr"
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  color: colors.dark,
                  backgroundColor: colors.white,
                  border: `2px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.terracotta;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.terracotta}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                style={{
                  display: "block",
                  fontFamily: "var(--font-cormorant), Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  color: colors.dark,
                  marginBottom: "0.5rem",
                }}
              >
                Message *
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                placeholder="Décrivez votre événement, le lieu, et vos préférences..."
                style={{
                  width: "100%",
                  padding: "0.75rem 1rem",
                  fontSize: "1rem",
                  color: colors.dark,
                  backgroundColor: colors.white,
                  border: `2px solid ${colors.border}`,
                  borderRadius: "8px",
                  outline: "none",
                  resize: "vertical",
                  minHeight: "120px",
                  boxSizing: "border-box",
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = colors.terracotta;
                  e.target.style.boxShadow = `0 0 0 3px ${colors.terracotta}40`;
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = colors.border;
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
            {status && (
              <p
                aria-live="polite"
                style={{
                  marginTop: "0.5rem",
                  fontSize: "0.9rem",
                  color: status.type === "success" ? "#1F3A2E" : "#b00020",
                }}
              >
                {status.message}
              </p>
            )}

            <button
              type="submit"
              style={{
                marginTop: "0.75rem",
                padding: "1rem 2rem",
                fontSize: "0.875rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: colors.white,
                backgroundColor: colors.terracotta,
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.terracottaHover;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.terracotta;
              }}
            >
              Envoyer la demande
            </button>
          </form>
        </div>
      </section>

      {/* Pied de page contact */}
      <section
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          backgroundColor: colors.beigeDark,
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: colors.dark,
            opacity: 0.75,
            margin: 0,
          }}
        >
          Ou contactez-nous directement
        </p>
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.25rem",
            color: colors.dark,
            margin: "0.5rem 0 0",
          }}
        >
          contact.mds.traiteur@gmail.com
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: colors.dark,
            opacity: 0.85,
            margin: "0.25rem 0 0",
          }}
        >
          07 58 63 97 34
        </p>
      </section>
    </div>
  );
}
