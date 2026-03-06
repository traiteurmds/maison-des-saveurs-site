"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

const colors = {
  dark: "#1F3A2E",
  terracotta: "#C46A4A",
  beige: "#F8F5F0",
  beigeDark: "#EDE8E0",
  white: "#FFFFFF",
  border: "rgba(31, 58, 46, 0.25)",
} as const;

const MESSAGE_MAX = 500;
const PHONE_LENGTH = 10;
const COOLDOWN_MS = 10_000;

function getTodayISO() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.75rem 1rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  color: colors.dark,
  backgroundColor: colors.white,
  border: "2px solid",
  borderColor: colors.border,
  borderRadius: "8px",
  outline: "none",
  boxSizing: "border-box",
  minHeight: "48px",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-cormorant), Georgia, serif",
  fontSize: "0.875rem",
  fontWeight: 500,
  color: colors.dark,
  marginBottom: "0.5rem",
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");
  const [minDate] = useState(() => getTodayISO());

  const inCooldown = cooldownUntil !== null;
  const canSubmit = !loading && !inCooldown;
  const phoneValid = phone.length === PHONE_LENGTH && /^\d+$/.test(phone);

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, PHONE_LENGTH);
    setPhone(raw);
    if (phoneError) setPhoneError("");
  }, [phoneError]);

  const handlePhoneBlur = useCallback(() => {
    if (phone.length > 0 && !phoneValid) {
      setPhoneError(`Le numéro doit contenir exactement ${PHONE_LENGTH} chiffres.`);
    } else {
      setPhoneError("");
    }
  }, [phone, phoneValid]);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value.slice(0, MESSAGE_MAX);
    setMessage(v);
  }, []);

  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPhoneError("");
    setEventDate("");
    setMessage("");
  }, []);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (!phoneValid) {
      setPhoneError(`Le numéro doit contenir exactement ${PHONE_LENGTH} chiffres.`);
      return;
    }

    setLoading(true);
    setSent(false);

    try {
      await emailjs.send(
        "service_abcd123",
        "template_tcbmdth",
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone,
          event_date: eventDate,
          message,
        },
        "JzBCJK41sDIKxSKXQ"
      );

      setSent(true);
      resetForm();
      setCooldownUntil(Date.now() + COOLDOWN_MS);
      setTimeout(() => setCooldownUntil(null), COOLDOWN_MS);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error("EmailJS error:", error);
      setSent(false);
    } finally {
      setLoading(false);
    }
  };

  const focusStyle = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = colors.terracotta;
    e.target.style.boxShadow = `0 0 0 3px ${colors.terracotta}40`;
  }, []);

  const blurStyle = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = colors.border;
    e.target.style.boxShadow = "none";
  }, []);

  return (
    <div style={{ paddingTop: "6rem", minHeight: "100vh" }} className="contact-page">
      <style>{`
        .contact-page input::placeholder,
        .contact-page textarea::placeholder {
          color: rgba(31, 58, 46, 0.5);
        }
        .contact-page input[type="date"] {
          appearance: none;
          -webkit-appearance: none;
        }
      `}</style>

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

      <section
        style={{
          padding: "4rem 1.5rem",
          backgroundColor: colors.beige,
        }}
      >
        <div style={{ maxWidth: "32rem", margin: "0 auto" }}>
          <AnimatePresence mode="wait">
            {!sent ? (
              <motion.form
                key="form"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
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
                  <label htmlFor="firstName" style={labelStyle}>Prénom *</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    required
                    placeholder="Prénom"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label htmlFor="lastName" style={labelStyle}>Nom *</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    required
                    placeholder="Nom"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    placeholder="vous@exemple.fr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label htmlFor="phone" style={labelStyle}>Numéro de téléphone * (10 chiffres)</label>
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    placeholder="0612345678"
                    value={phone}
                    onChange={handlePhoneChange}
                    onFocus={focusStyle}
                    onBlur={(e) => {
                      handlePhoneBlur();
                      blurStyle(e);
                    }}
                    style={{
                      ...inputBaseStyle,
                      borderColor: phoneError ? colors.terracotta : colors.border,
                    }}
                    maxLength={PHONE_LENGTH}
                  />
                  {phoneError && (
                    <p style={{ color: colors.terracotta, fontSize: "0.8125rem", marginTop: "0.375rem" }} role="alert">
                      {phoneError}
                    </p>
                  )}
                </div>

                <div>
                  <label htmlFor="eventDate" style={labelStyle}>Date de l&apos;événement *</label>
                  <input
                    id="eventDate"
                    type="date"
                    name="eventDate"
                    required
                    min={minDate}
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={MESSAGE_MAX}
                    placeholder="Décrivez votre événement, le lieu, et vos préférences..."
                    value={message}
                    onChange={handleMessageChange}
                    style={{
                      ...inputBaseStyle,
                      resize: "vertical",
                      minHeight: "120px",
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: colors.dark,
                      opacity: 0.6,
                      marginTop: "0.375rem",
                      textAlign: "right",
                    }}
                  >
                    {message.length} / {MESSAGE_MAX}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || !phoneValid}
                  className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#C46A4A] to-[#1F3A2E] px-8 py-3 text-xs font-medium tracking-[0.18em] text-white uppercase shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Envoi en cours...
                    </>
                  ) : (
                    "Envoyer la demande"
                  )}
                </button>
              </motion.form>
            ) : (
              <SuccessConfirmation />
            )}
          </AnimatePresence>
        </div>
      </section>

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

function SuccessConfirmation() {
  return (
    <motion.div
      key="success"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      style={{
        backgroundColor: colors.white,
        padding: "3rem 2.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(31, 58, 46, 0.08)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "1.5rem",
      }}
    >
      <AnimatedCheckmark />
      <div style={{ marginTop: "0.5rem" }}>
        <h2
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "1.75rem",
            fontWeight: 600,
            color: colors.dark,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Votre demande a bien été envoyée !
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: colors.dark,
            opacity: 0.85,
            margin: "0.75rem 0 0",
            lineHeight: 1.5,
          }}
        >
          Nous vous contacterons très prochainement.
        </p>
      </div>
    </motion.div>
  );
}

function AnimatedCheckmark() {
  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      style={{ position: "relative", width: 80, height: 80 }}
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        {/* Circle (path so pathLength works) */}
        <motion.path
          d="M 40 4 A 36 36 0 0 1 76 40 A 36 36 0 0 1 40 76 A 36 36 0 0 1 4 40 A 36 36 0 0 1 40 4"
          stroke={colors.terracotta}
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        {/* Checkmark */}
        <motion.path
          d="M22 40 L34 52 L58 28"
          stroke={colors.terracotta}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.35, delay: 0.25, ease: "easeOut" }}
        />
      </svg>
    </motion.div>
  );
}
