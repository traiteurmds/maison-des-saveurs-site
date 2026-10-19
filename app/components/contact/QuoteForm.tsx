"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaWhatsapp } from "react-icons/fa";
import { FiArrowRight, FiCheck, FiMail, FiPlus, FiX } from "react-icons/fi";
import { EVENT_TYPES, SERVICE_OPTIONS } from "../../lib/menu-data";
import {
  buildRequestMessage,
  getWhatsappUrl,
  SELECTION_LABELS,
  SELECTION_ORDER,
  type EventDetails,
} from "../../lib/whatsapp";
import { EMAIL } from "../../lib/site-seo";
import {
  LIMITS,
  sanitizeEmail,
  sanitizeMessage,
  sanitizeName,
  validateEmail,
  validatePhone,
} from "../../lib/contact-validation";
import { cn } from "../../lib/utils";
import { useSelection } from "../providers/SelectionProvider";
import TurnstileField, { isTurnstileRequired } from "./TurnstileField";

const DRAFT_KEY = "mds-devis-brouillon";
const COOLDOWN_MS = 12_000;

type Status = "idle" | "sending" | "sent" | "error";

function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function StepTitle({ n, title, hint }: { n: number; title: string; hint?: string }) {
  return (
    <div className="flex items-start gap-4">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink font-display text-lg text-gold-bright">
        {n}
      </span>
      <div>
        <h2 className="font-display text-[1.75rem] leading-tight text-ink">{title}</h2>
        {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
      </div>
    </div>
  );
}

export default function QuoteForm() {
  const { selection, counts, removeSelectionItem, toggleSelection, isSelected, clearSelection } = useSelection();
  const [details, setDetails] = useState<EventDetails>({});
  const [minDate, setMinDate] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [cooldown, setCooldown] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileUnavailable, setTurnstileUnavailable] = useState(false);
  const turnstileRequired = isTurnstileRequired();

  // Lecture du brouillon et de la date du jour côté navigateur uniquement.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMinDate(todayIso());
    try {
      const saved = localStorage.getItem(DRAFT_KEY);
      if (saved) setDetails(JSON.parse(saved));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(DRAFT_KEY, JSON.stringify(details));
    } catch {
      /* ignore */
    }
  }, [details]);

  const set = useCallback((key: keyof EventDetails, value: string) => {
    setDetails((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  }, []);

  const message = useMemo(() => buildRequestMessage(selection, details), [selection, details]);
  const whatsappUrl = useMemo(() => getWhatsappUrl(selection, details), [selection, details]);

  const emailConfigured = Boolean(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID &&
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
  );

  const validateForEmail = () => {
    const next: Record<string, string> = {};
    if (!details.name?.trim()) next.name = "Indiquez votre nom.";
    const phone = validatePhone(details.phone ?? "");
    if (!phone.valid) next.phone = phone.error ?? "Numéro invalide.";
    const email = validateEmail(details.email ?? "");
    if (!email.valid) next.email = email.error ?? "E-mail invalide.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const sendEmail = async () => {
    if (status === "sending" || cooldown || honeypot) return;
    if (!validateForEmail()) {
      document.getElementById("coordonnees")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    if (!emailConfigured) {
      const subject = `Demande de devis ${details.eventType ? `- ${details.eventType}` : ""}`.trim();
      window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
      return;
    }

    if (turnstileRequired && !turnstileUnavailable && !turnstileToken) {
      setErrors({ form: "Merci de compléter la vérification anti-spam." });
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID as string,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID as string,
        {
          name: sanitizeName(details.name ?? "", LIMITS.MAX_NOM),
          email: sanitizeEmail(details.email ?? ""),
          phone: (details.phone ?? "").replace(/\D/g, ""),
          message: sanitizeMessage(message).slice(0, 3000),
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY as string
      );
      setStatus("sent");
      setCooldown(true);
      setTimeout(() => setCooldown(false), COOLDOWN_MS);
    } catch {
      setStatus("error");
    }
  };

  const reset = () => {
    setDetails({});
    clearSelection();
    setStatus("idle");
  };

  const selectedGroups = SELECTION_ORDER.filter((k) => k !== "options" && selection[k].length > 0);

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="card flex flex-col items-center p-10 text-center md:p-14"
        role="status"
      >
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink text-2xl text-gold-bright">
          <FiCheck />
        </span>
        <h2 className="display-md mt-6 text-ink">Merci, votre demande est bien partie</h2>
        <p className="lead mt-4 max-w-md">
          Nous revenons vers vous très vite avec une proposition. Pour aller plus vite, vous pouvez aussi nous écrire sur
          WhatsApp.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
            <FaWhatsapp aria-hidden /> Continuer sur WhatsApp
          </a>
          <button type="button" onClick={reset} className="btn btn-outline">
            Nouvelle demande
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      }}
      className="space-y-6"
      noValidate
    >
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website_url">Ne pas remplir</label>
        <input id="website_url" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
      </div>

      {/* 1. Événement */}
      <fieldset className="card p-6 md:p-8">
        <legend className="sr-only">Votre événement</legend>
        <StepTitle n={1} title="Votre événement" hint="Ces informations nous permettent de chiffrer votre devis tout de suite." />
        <div className="mt-7">
          <p className="field-label">Type d&apos;événement</p>
          <div className="flex flex-wrap gap-2">
            {EVENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                className="chip"
                aria-pressed={details.eventType === type}
                onClick={() => set("eventType", details.eventType === type ? "" : type)}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="date" className="field-label">Date</label>
            <input id="date" type="date" min={minDate} className="field" value={details.date ?? ""} onChange={(e) => set("date", e.target.value)} />
          </div>
          <div>
            <label htmlFor="city" className="field-label">Ville ou salle</label>
            <input id="city" className="field" placeholder="Ex. Villeurbanne, salle des fêtes" value={details.city ?? ""} onChange={(e) => set("city", e.target.value.slice(0, 80))} />
          </div>
          <div>
            <label htmlFor="guests" className="field-label">Nombre d&apos;invités</label>
            <input id="guests" inputMode="numeric" className="field" placeholder="Ex. 120" value={details.guests ?? ""} onChange={(e) => set("guests", e.target.value.replace(/[^\d]/g, "").slice(0, 5))} />
          </div>
          <div>
            <label htmlFor="tables" className="field-label">Nombre de tables <span className="font-normal text-muted">(si connu)</span></label>
            <input id="tables" className="field" placeholder="Ex. 12 tables de 10" value={details.tables ?? ""} onChange={(e) => set("tables", e.target.value.slice(0, 40))} />
          </div>
        </div>
      </fieldset>

      {/* 2. Sélection */}
      <fieldset className="card p-6 md:p-8">
        <legend className="sr-only">Votre menu</legend>
        <StepTitle n={2} title="Votre menu" hint="Les plats ajoutés depuis la carte apparaissent ici." />
        <div className="mt-7">
          {selectedGroups.length === 0 ? (
            <div className="rounded-[18px] border border-dashed border-line bg-ivory/60 p-6 text-center">
              <p className="text-muted">Aucun plat sélectionné pour l&apos;instant.</p>
              <Link href="/menu" className="btn btn-ink btn-sm mt-4">
                Choisir sur la carte <FiArrowRight aria-hidden />
              </Link>
            </div>
          ) : (
            <div className="space-y-5">
              {selectedGroups.map((key) => (
                <div key={key}>
                  <p className="field-label">{SELECTION_LABELS[key]}</p>
                  <ul className="flex flex-wrap gap-2">
                    {selection[key].map((item) => (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => removeSelectionItem(key, item)}
                          className="chip is-active gap-2 pr-3"
                          aria-label={`Retirer ${item}`}
                        >
                          {item} <FiX className="text-gold-bright" aria-hidden />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <Link href="/menu" className="link-underline inline-flex items-center gap-2 text-sm font-semibold text-ink">
                <FiPlus aria-hidden /> Ajouter d&apos;autres plats
              </Link>
            </div>
          )}
        </div>

        <div className="mt-8 border-t border-line pt-7">
          <p className="field-label">Options souhaitées</p>
          <div className="flex flex-wrap gap-2">
            {SERVICE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className="chip"
                aria-pressed={isSelected("options", opt.title)}
                onClick={() => toggleSelection("options", opt.title)}
              >
                {isSelected("options", opt.title) ? <FiCheck aria-hidden /> : <FiPlus className="text-gold" aria-hidden />}
                {opt.title}
              </button>
            ))}
          </div>
        </div>
      </fieldset>

      {/* 3. Coordonnées */}
      <fieldset id="coordonnees" className="card p-6 md:p-8">
        <legend className="sr-only">Vos coordonnées</legend>
        <StepTitle n={3} title="Vos coordonnées" hint="Pour vous recontacter avec votre devis." />
        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="field-label">Nom et prénom</label>
            <input id="name" autoComplete="name" className="field" value={details.name ?? ""} onChange={(e) => set("name", sanitizeName(e.target.value, LIMITS.MAX_NOM))} aria-invalid={Boolean(errors.name)} />
            {errors.name && <p className="mt-1.5 text-sm text-[#a5442f]" role="alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="field-label">Téléphone</label>
            <input id="phone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="06 12 34 56 78" className="field" value={details.phone ?? ""} onChange={(e) => set("phone", e.target.value.replace(/[^\d ]/g, "").slice(0, 14))} aria-invalid={Boolean(errors.phone)} />
            {errors.phone && <p className="mt-1.5 text-sm text-[#a5442f]" role="alert">{errors.phone}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="field-label">E-mail <span className="font-normal text-muted">(pour l&apos;envoi par e-mail)</span></label>
            <input id="email" type="email" autoComplete="email" className="field" value={details.email ?? ""} onChange={(e) => set("email", sanitizeEmail(e.target.value))} aria-invalid={Boolean(errors.email)} />
            {errors.email && <p className="mt-1.5 text-sm text-[#a5442f]" role="alert">{errors.email}</p>}
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="message" className="field-label">Précisions <span className="font-normal text-muted">(allergies, horaires, budget…)</span></label>
            <textarea id="message" className="field" value={details.message ?? ""} onChange={(e) => set("message", sanitizeMessage(e.target.value))} />
          </div>
        </div>
        {process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && emailConfigured && (
          <div className="mt-5">
            <TurnstileField onTokenChange={setTurnstileToken} onUnavailable={() => setTurnstileUnavailable(true)} />
          </div>
        )}
      </fieldset>

      {/* Envoi */}
      <div className="card bg-ink-texture border-line-dark p-6 text-ivory md:p-8">
        <p className="font-display text-2xl">Envoyer ma demande</p>
        <p className="mt-2 text-sm text-muted-light">
          Le message se prépare automatiquement avec toutes vos informations
          {counts.total > 0 ? ` et vos ${counts.total} choix` : ""}.
        </p>
        <AnimatePresence>
          {(errors.form || status === "error") && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mt-4 text-sm text-gold-bright" role="alert">
              {errors.form ?? "L'envoi par e-mail a échoué. Réessayez ou passez par WhatsApp."}
            </motion.p>
          )}
        </AnimatePresence>
        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button type="submit" className="btn btn-gold">
            <FaWhatsapp aria-hidden /> Envoyer sur WhatsApp
          </button>
          <button type="button" onClick={sendEmail} disabled={status === "sending" || cooldown} className={cn("btn btn-ghost-light", (status === "sending" || cooldown) && "opacity-60")}>
            <FiMail aria-hidden /> {status === "sending" ? "Envoi…" : "Envoyer par e-mail"}
          </button>
        </div>
        <details className="group mt-6 text-sm">
          <summary className="cursor-pointer list-none text-muted-light hover:text-ivory">
            <span className="underline underline-offset-4">Voir le message qui sera envoyé</span>
          </summary>
          <pre className="mt-4 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl border border-line-dark bg-ivory/5 p-4 font-sans text-[0.85rem] leading-relaxed text-ivory/85">
            {message}
          </pre>
        </details>
      </div>
    </form>
  );
}
