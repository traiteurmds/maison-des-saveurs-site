"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  LIMITS,
  sanitizeName,
  sanitizeEmail,
  sanitizeMessage,
  validateNom,
  validatePrenom,
  validateEmail,
  validatePhone,
  validateMessage,
  buildEmailBody,
} from "../lib/contact-validation";

const colors = {
  dark: "#1F3A2E",
  terracotta: "#C46A4A",
  beige: "#F8F5F0",
  beigeDark: "#EDE8E0",
  white: "#FFFFFF",
  border: "rgba(31, 58, 46, 0.25)",
} as const;

const COOLDOWN_MS = 12_000;

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
  const successMessageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sent) {
      successMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [sent]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [message, setMessage] = useState("");
  const [minDate, setMinDate] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    setMinDate(`${y}-${m}-${d}`);
  }, []);

  const inCooldown = cooldownUntil !== null;
  const phoneValid = phone.length === LIMITS.PHONE_LENGTH && /^\d+$/.test(phone);
  const canSubmit = !loading && !inCooldown && phoneValid;

  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, LIMITS.PHONE_LENGTH);
    setPhone(raw);
    if (phoneError) setPhoneError("");
    setFieldErrors((prev) => ({ ...prev, phone: "" }));
  }, [phoneError]);

  const handlePhoneBlur = useCallback(() => {
    const res = validatePhone(phone);
    setPhoneError(res.valid ? "" : res.error ?? "");
    if (!res.valid) setFieldErrors((prev) => ({ ...prev, phone: res.error ?? "" }));
  }, [phone]);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(sanitizeMessage(e.target.value));
  }, []);

  const resetForm = useCallback(() => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setPhoneError("");
    setEventDate("");
    setMessage("");
    setHoneypot("");
    setFieldErrors({});
  }, []);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (honeypot) {
      return;
    }

    const nom = sanitizeName(lastName, LIMITS.MAX_NOM);
    const prenom = sanitizeName(firstName, LIMITS.MAX_PRENOM);
    const emailSanitized = sanitizeEmail(email);
    const messageSanitized = sanitizeMessage(message);

    const errs: Record<string, string> = {};
    const rNom = validateNom(nom);
    if (!rNom.valid && rNom.error) errs.lastName = rNom.error;
    const rPrenom = validatePrenom(prenom);
    if (!rPrenom.valid && rPrenom.error) errs.firstName = rPrenom.error;
    const rEmail = validateEmail(emailSanitized);
    if (!rEmail.valid && rEmail.error) errs.email = rEmail.error;
    const rPhone = validatePhone(phone);
    if (!rPhone.valid && rPhone.error) {
      errs.phone = rPhone.error;
      setPhoneError(rPhone.error);
    }
    const rMessage = validateMessage(messageSanitized);
    if (!rMessage.valid && rMessage.error) errs.message = rMessage.error;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = eventDate ? new Date(eventDate) : null;
    if (selected && selected < today) {
      errs.eventDate = "La date doit être aujourd'hui ou une date future.";
    }

    if (Object.keys(errs).length > 0) {
      setFieldErrors(errs);
      return;
    }
    setFieldErrors({});

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      if (typeof console !== "undefined") {
        console.error("EmailJS configuration manquante");
      }
      setFieldErrors({ form: "Configuration email manquante. Réessayez plus tard." });
      return;
    }

    setLoading(true);
    setSent(false);

    const emailBody = buildEmailBody({
      lastName: nom,
      firstName: prenom,
      email: emailSanitized,
      phone,
      eventDate: eventDate || "",
      message: messageSanitized,
    });

    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          first_name: prenom,
          last_name: nom,
          from_name: `${prenom} ${nom}`,
          email: emailSanitized,
          reply_to: emailSanitized,
          phone,
          event_date: eventDate || "",
          message: messageSanitized,
          email_body: emailBody,
          subject: "Nouveau message — Maison Des Saveurs",
        },
        publicKey
      );

      setSent(true);
      resetForm();
      setCooldownUntil(Date.now() + COOLDOWN_MS);
      setTimeout(() => setCooldownUntil(null), COOLDOWN_MS);
    } catch (error) {
      setFieldErrors({ form: "L'envoi a échoué. Réessayez dans un moment." });
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
                {fieldErrors.form && (
                  <p style={{ color: colors.terracotta, fontSize: "0.875rem" }} role="alert">
                    {fieldErrors.form}
                  </p>
                )}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", opacity: 0, pointerEvents: "none" }}>
                  <label htmlFor="website_url">Ne pas remplir</label>
                  <input
                    id="website_url"
                    type="text"
                    name="website_url"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                <div>
                  <label htmlFor="firstName" style={labelStyle}>Prénom *</label>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    required
                    placeholder="Prénom"
                    maxLength={LIMITS.MAX_PRENOM}
                    value={firstName}
                    onChange={(e) => setFirstName(sanitizeName(e.target.value, LIMITS.MAX_PRENOM))}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  {fieldErrors.firstName && (
                    <p style={{ color: colors.terracotta, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.firstName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="lastName" style={labelStyle}>Nom *</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    required
                    placeholder="Nom"
                    maxLength={LIMITS.MAX_NOM}
                    value={lastName}
                    onChange={(e) => setLastName(sanitizeName(e.target.value, LIMITS.MAX_NOM))}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  {fieldErrors.lastName && (
                    <p style={{ color: colors.terracotta, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.lastName}</p>
                  )}
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
                    onChange={(e) => setEmail(sanitizeEmail(e.target.value))}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  {fieldErrors.email && (
                    <p style={{ color: colors.terracotta, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.email}</p>
                  )}
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
                    maxLength={LIMITS.PHONE_LENGTH}
                  />
                  {(phoneError || fieldErrors.phone) && (
                    <p style={{ color: colors.terracotta, fontSize: "0.8125rem", marginTop: "0.375rem" }} role="alert">
                      {phoneError || fieldErrors.phone}
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
                  {fieldErrors.eventDate && (
                    <p style={{ color: colors.terracotta, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.eventDate}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="message" style={labelStyle}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={LIMITS.MAX_MESSAGE}
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
                    {message.length} / {LIMITS.MAX_MESSAGE}
                  </p>
                  {fieldErrors.message && (
                    <p style={{ color: colors.terracotta, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit}
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
              <div ref={successMessageRef}>
                <SuccessConfirmation />
              </div>
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
