"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import { useSelection } from "../components/providers/SelectionProvider";
import { btnWhatsappClass, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";
import {
  LIMITS,
  sanitizeName,
  sanitizeEmail,
  sanitizeMessage,
  validateNom,
  validateEmail,
  validatePhone,
  validateMessage,
} from "../lib/contact-validation";
import TurnstileField, { type TurnstileHandle } from "../components/contact/TurnstileField";
import { EMAIL, EMAIL_MAILTO, PHONE_DISPLAY, PHONE_TEL } from "../lib/site-seo";

const colors = {
  black: "#0B0B0A",
  gold: "#C6A46A",
  beige: "#F8F5EF",
  beigeDark: "#F1EAE0",
  white: "#FFFDF8",
  border: "rgba(198, 164, 106, 0.28)",
} as const;

const COOLDOWN_MS = 12_000;

const inputBaseStyle: React.CSSProperties = {
  width: "100%",
  maxWidth: "100%",
  padding: "0.75rem 1rem",
  fontSize: "1rem",
  lineHeight: "1.5",
  color: colors.black,
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
  color: colors.black,
  marginBottom: "0.5rem",
};

export default function ContactPage() {
  const { whatsappUrl } = useSelection();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [cooldownUntil, setCooldownUntil] = useState<number | null>(null);
  const successMessageRef = useRef<HTMLDivElement>(null);
  const submittingRef = useRef(false);
  const turnstileRef = useRef<TurnstileHandle>(null);
  const turnstileEnabled = Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);

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

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading || submittingRef.current || !canSubmit) return;

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
      setFieldErrors({
        form: "Configuration email manquante. Vérifiez les variables d'environnement.",
      });
      return;
    }

    submittingRef.current = true;
    setLoading(true);
    setSent(false);

    try {
      let turnstileToken: string | null = null;
      if (turnstileEnabled) {
        turnstileToken = (await turnstileRef.current?.execute()) ?? null;
        if (!turnstileToken) {
          setFieldErrors({
            form: "Vérification anti-spam échouée. Merci de réessayer ou contactez-nous par WhatsApp.",
          });
          return;
        }
      }

      try {
        const verifyRes = await fetch("/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: sanitizeName(firstName, LIMITS.MAX_PRENOM),
            lastName: nom,
            email: emailSanitized,
            phone,
            eventDate,
            message: messageSanitized,
            turnstileToken,
          }),
        });

        if (!verifyRes.ok) {
          const data = (await verifyRes.json().catch(() => ({}))) as { error?: string };
          setFieldErrors({
            form:
              data.error ??
              "Vérification anti-spam échouée. Merci de réessayer ou contactez-nous par WhatsApp.",
          });
          turnstileRef.current?.reset();
          return;
        }
      } catch {
        /* API indisponible — continuer vers EmailJS si Turnstile non configuré */
        if (turnstileEnabled) {
          setFieldErrors({
            form: "Impossible de vérifier le formulaire. Réessayez ou contactez-nous par WhatsApp.",
          });
          return;
        }
      }

      const templateParams = {
        name: nom,
        email: emailSanitized,
        phone,
        message: messageSanitized,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);

      setSent(true);
      resetForm();
      turnstileRef.current?.reset();
      setCooldownUntil(Date.now() + COOLDOWN_MS);
      setTimeout(() => setCooldownUntil(null), COOLDOWN_MS);
    } catch {
      setFieldErrors({ form: "Une erreur est survenue. Veuillez réessayer." });
      setSent(false);
      turnstileRef.current?.reset();
    } finally {
      submittingRef.current = false;
      setLoading(false);
    }
  };

  const focusStyle = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = colors.gold;
    e.target.style.boxShadow = `0 0 0 3px ${colors.gold}40`;
  }, []);

  const blurStyle = useCallback((e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.target.style.borderColor = colors.border;
    e.target.style.boxShadow = "none";
  }, []);

  return (
    <div style={{ paddingTop: "7rem", minHeight: "100vh" }} className="contact-page bg-mds-bg">
      <style>{`
        .contact-page input::placeholder,
        .contact-page textarea::placeholder {
          color: rgba(111, 106, 96, 0.55);
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
            "radial-gradient(circle at 16% 18%, rgba(198,164,106,0.12), transparent 32%), radial-gradient(circle at 84% 14%, rgba(11,11,10,0.04), transparent 26%), linear-gradient(180deg, #f8f5ef 0%, #f1eae0 100%)",
          borderBottom: `1px solid ${colors.border}`,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.75rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: colors.gold,
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
            color: colors.black,
            margin: "0.5rem 0 0",
          }}
        >
          Contact
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: colors.black,
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

      <section className="px-6 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_340px] lg:items-start">
          <div>
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
                  border: "1px solid rgba(198, 164, 106, 0.22)",
                  boxShadow: "0 20px 48px rgba(11, 11, 10, 0.08)",
                  backdropFilter: "blur(10px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "1.5rem",
                }}
              >
                {fieldErrors.form && (
                  <p style={{ color: colors.gold, fontSize: "0.875rem" }} role="alert">
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
                <TurnstileField ref={turnstileRef} />

                <div>
                  <label htmlFor="lastName" style={labelStyle}>Nom *</label>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    required
                    autoComplete="family-name"
                    placeholder="Nom"
                    maxLength={LIMITS.MAX_NOM}
                    value={lastName}
                    onChange={(e) => setLastName(sanitizeName(e.target.value, LIMITS.MAX_NOM))}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  {fieldErrors.lastName && (
                    <p style={{ color: colors.gold, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.lastName}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" style={labelStyle}>Email *</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    placeholder="vous@exemple.fr"
                    maxLength={254}
                    value={email}
                    onChange={(e) => setEmail(sanitizeEmail(e.target.value))}
                    style={inputBaseStyle}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  {fieldErrors.email && (
                    <p style={{ color: colors.gold, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.email}</p>
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
                      borderColor: phoneError ? colors.gold : colors.border,
                    }}
                    maxLength={LIMITS.PHONE_LENGTH}
                  />
                  {(phoneError || fieldErrors.phone) && (
                    <p style={{ color: colors.gold, fontSize: "0.8125rem", marginTop: "0.375rem" }} role="alert">
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
                    autoComplete="off"
                    maxLength={LIMITS.MAX_MESSAGE}
                    placeholder="Décrivez votre événement, le lieu, et vos préférences..."
                    value={message}
                    onChange={handleMessageChange}
                    style={{
                      ...inputBaseStyle,
                      resize: "vertical",
                      minHeight: "120px",
                      maxWidth: "100%",
                      wordBreak: "break-word",
                    }}
                    onFocus={focusStyle}
                    onBlur={blurStyle}
                  />
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: colors.black,
                      opacity: 0.6,
                      marginTop: "0.375rem",
                      textAlign: "right",
                    }}
                  >
                    {message.length} / {LIMITS.MAX_MESSAGE}
                  </p>
                  {fieldErrors.message && (
                    <p style={{ color: colors.gold, fontSize: "0.8125rem", marginTop: "0.25rem" }} role="alert">{fieldErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={!canSubmit || loading}
                  className="mt-3 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-[var(--black)] px-8 py-3 text-xs font-medium tracking-[0.18em] text-[var(--ivory)] uppercase shadow-md transition-all duration-300 ease-out hover:bg-[var(--charcoal)] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
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
                <p className="text-center text-xs leading-relaxed text-mds-muted">
                  En envoyant ce formulaire, vous acceptez notre{" "}
                  <a href="/politique-confidentialite" className="text-[var(--gold)] underline-offset-4 hover:underline">
                    politique de confidentialité
                  </a>
                  .
                </p>
              </motion.form>
            ) : (
              <div ref={successMessageRef}>
                <SuccessConfirmation />
              </div>
            )}
          </AnimatePresence>
          </div>

          <aside className="glass-card rounded-2xl p-7 lg:sticky lg:top-32">
            <h2 className="font-serif text-xl font-semibold text-mds-text">Contact direct</h2>
            <p className="mt-3 text-sm leading-relaxed text-mds-muted">
              Pour une réponse plus rapide, contactez-nous directement sur WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(btnWhatsappClass, "mt-8", selectableFocusClass)}
            >
              Écrire sur WhatsApp
            </a>
          </aside>
        </div>
      </section>

      <section
        style={{
          padding: "3rem 1.5rem",
          textAlign: "center",
          background: "linear-gradient(180deg, #f1eae0 0%, #f8f5ef 100%)",
          borderTop: `1px solid ${colors.border}`,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-cormorant), Georgia, serif",
            fontSize: "0.75rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: colors.black,
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
            color: colors.black,
            margin: "0.5rem 0 0",
          }}
        >
          <a href={EMAIL_MAILTO} className="text-inherit no-underline hover:underline">
            {EMAIL}
          </a>
        </p>
        <p
          style={{
            fontSize: "1rem",
            color: colors.black,
            opacity: 0.85,
            margin: "0.25rem 0 0",
          }}
        >
          <a href={PHONE_TEL} className="text-inherit no-underline hover:underline">
            {PHONE_DISPLAY}
          </a>
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
        boxShadow: "0 4px 24px rgba(11, 11, 10, 0.08)",
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
            color: colors.black,
            margin: 0,
            lineHeight: 1.3,
          }}
        >
          Message envoyé ! Nous vous répondrons sous 24h.
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: colors.black,
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
          stroke="#C6A46A"
          strokeWidth="3"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
        <motion.path
          d="M22 40 L34 52 L58 28"
          stroke="#C6A46A"
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
