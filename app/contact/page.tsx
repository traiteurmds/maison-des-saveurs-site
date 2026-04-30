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
} from "../lib/contact-validation";

const colors = {
  dark: "#15281F",
  terracotta: "#B88454",
  beige: "#F6EFE5",
  beigeDark: "#E9DCCA",
  white: "#FFFFFF",
  border: "rgba(21, 40, 31, 0.2)",
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

  useEffect(() => {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (typeof console !== "undefined") {
      console.log("SERVICE:", process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID);
      console.log("TEMPLATE:", process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID);
      console.log("PUBLIC KEY:", process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY);
      if (!serviceId || !templateId || !publicKey) {
        console.error("EmailJS configuration missing. Check .env.local");
      }
    }
  }, []);

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
  const hcaptchaWidgetIdRef = useRef<string | null>(null);
  const hcaptchaLoadedRef = useRef(false);

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
    if (!siteKey || hcaptchaLoadedRef.current) return;
    const el = document.getElementById("hcaptcha-contact");
    if (!el) return;
    const existing = document.querySelector('script[src*="hcaptcha.com"]');
    if (existing) {
      hcaptchaLoadedRef.current = true;
      const w = window as unknown as { hcaptcha?: { render: (el: HTMLElement, opts: { sitekey: string; size: string }) => string } };
      if (w.hcaptcha?.render) {
        hcaptchaWidgetIdRef.current = w.hcaptcha.render(el, { sitekey: siteKey, size: "invisible" });
      }
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.hcaptcha.com/1/api.js";
    script.async = true;
    script.onload = () => {
      hcaptchaLoadedRef.current = true;
      const w = window as unknown as { hcaptcha?: { render: (el: HTMLElement, opts: { sitekey: string; size: string }) => string } };
      if (w.hcaptcha?.render && el) {
        hcaptchaWidgetIdRef.current = w.hcaptcha.render(el, { sitekey: siteKey, size: "invisible" });
      }
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = String(today.getMonth() + 1).padStart(2, "0");
    const d = String(today.getDate()).padStart(2, "0");
    setMinDate(`${y}-${m}-${d}`);
  }, []);

  const inCooldown = cooldownUntil !== null;
  const phoneValid = phone.length === LIMITS.PHONE_LENGTH && /^\d+$/.test(phone);
  const emailValid = validateEmail(sanitizeEmail(email)).valid;
  const requiredFilled =
    lastName.trim().length > 0 &&
    email.trim().length > 0 &&
    phone.trim().length > 0 &&
    message.trim().length > 0;
  const canSubmit = !loading && !inCooldown && phoneValid && emailValid && requiredFilled;

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

  const getHcaptchaToken = useCallback((): Promise<string | null> => {
    const siteKey = process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY;
    if (!siteKey || typeof window === "undefined") return Promise.resolve(null);
    const w = window as unknown as {
      hcaptcha?: {
        getResponse: (widgetId?: string) => string;
        execute: (widgetId?: string) => Promise<void>;
      };
    };
    if (!w.hcaptcha) return Promise.resolve(null);
    const widgetId = hcaptchaWidgetIdRef.current ?? undefined;
    return new Promise((resolve) => {
      w.hcaptcha
        ?.execute?.(widgetId)
        ?.then(() => {
          const token = w.hcaptcha?.getResponse?.(widgetId) ?? null;
          resolve(token || null);
        })
        ?.catch(() => resolve(null)) ?? resolve(null);
    });
  }, []);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (honeypot) {
      return;
    }

    const nom = sanitizeName(lastName, LIMITS.MAX_NOM);
    const emailSanitized = sanitizeEmail(email);
    const messageSanitized = sanitizeMessage(message);

    const errs: Record<string, string> = {};
    const rNom = validateNom(nom);
    if (!rNom.valid && rNom.error) errs.lastName = rNom.error;
    const rEmail = validateEmail(emailSanitized);
    if (!rEmail.valid && rEmail.error) errs.email = rEmail.error;
    const rPhone = validatePhone(phone);
    if (!rPhone.valid && rPhone.error) {
      errs.phone = rPhone.error;
      setPhoneError(rPhone.error);
    }
    const rMessage = validateMessage(messageSanitized);
    if (!rMessage.valid && rMessage.error) errs.message = rMessage.error;

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
        console.error("EmailJS configuration missing. Check .env.local");
      }
      setFieldErrors({
        form: "Configuration email manquante. Vérifiez les variables d'environnement.",
      });
      return;
    }

    if (typeof console !== "undefined") {
      console.log("SERVICE:", serviceId);
      console.log("TEMPLATE:", templateId);
      console.log("PUBLIC KEY:", publicKey);
    }

    setLoading(true);
    setSent(false);

    const templateParams = {
      name: nom,
      email: emailSanitized,
      phone,
      message: messageSanitized,
    };

    try {
      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSent(true);
      resetForm();
      setCooldownUntil(Date.now() + COOLDOWN_MS);
      setTimeout(() => setCooldownUntil(null), COOLDOWN_MS);
    } catch (err) {
      if (typeof console !== "undefined") {
        console.error("EmailJS send error:", err);
      }
      setFieldErrors({ form: "Une erreur est survenue. Veuillez réessayer." });
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
    <div style={{ paddingTop: "6rem", minHeight: "100vh" }} className="contact-page bg-soft-gradient-beige">
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
          background:
            "radial-gradient(circle at 16% 18%, rgba(184,132,84,0.16), transparent 32%), radial-gradient(circle at 84% 14%, rgba(21,40,31,0.09), transparent 26%), linear-gradient(180deg, #f7f1e9 0%, #f5ecdf 100%)",
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
          background: "linear-gradient(180deg, #f5ecdf 0%, #f2e7d9 100%)",
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
                  border: "1px solid rgba(21,40,31,0.08)",
                  boxShadow: "0 20px 48px rgba(15,29,23,0.10)",
                  backdropFilter: "blur(10px)",
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
                {process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY && (
                  <div id="hcaptcha-contact" className="min-h-[1px] overflow-hidden" aria-hidden="true" />
                )}

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
                  disabled={!canSubmit || loading}
                  className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#b88454] via-[#9a6f46] to-[#15281f] px-8 py-3 text-xs font-medium tracking-[0.18em] text-white uppercase shadow-md transition-all duration-300 ease-out hover:shadow-lg hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <>
                      <span className="h-5 w-5 shrink-0 animate-spin rounded-full border-2 border-white/40 border-t-white" aria-hidden />
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
          background: "linear-gradient(180deg, #efe3d4 0%, #e6d8c7 100%)",
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
          Message envoyé ! Nous vous répondrons sous 24h.
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
      aria-hidden
    >
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="overflow-visible">
        <motion.path
          d="M 40 4 A 36 36 0 0 1 76 40 A 36 36 0 0 1 40 76 A 36 36 0 0 1 4 40 A 36 36 0 0 1 40 4"
          stroke="#22c55e"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.path
          d="M22 40 L34 52 L58 28"
          stroke="#22c55e"
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
