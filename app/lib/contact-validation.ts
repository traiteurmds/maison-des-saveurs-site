/**
 * Validation et sanitization des données du formulaire contact.
 * Protection XSS / injection : trim, longueur max, format strict.
 */

const MAX_NOM = 50;
const MAX_PRENOM = 50;
const MAX_MESSAGE = 1000;
const PHONE_LENGTH = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function trim(str: string): string {
  return str.replace(/\s+/g, " ").trim();
}

function escapeForEmail(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function sanitizeName(value: string, maxLength: number): string {
  return trim(value).slice(0, maxLength);
}

export function sanitizeEmail(value: string): string {
  return trim(value).slice(0, 254);
}

/** Limite la longueur sans modifier espaces ni retours à la ligne. */
export function sanitizeMessage(value: string): string {
  return value.slice(0, MAX_MESSAGE);
}

export function validateNom(value: string): { valid: boolean; error?: string } {
  const s = trim(value);
  if (!s) return { valid: false, error: "Le nom est requis." };
  if (s.length > MAX_NOM) return { valid: false, error: `Maximum ${MAX_NOM} caractères.` };
  return { valid: true };
}

export function validatePrenom(value: string): { valid: boolean; error?: string } {
  const s = trim(value);
  if (!s) return { valid: false, error: "Le prénom est requis." };
  if (s.length > MAX_PRENOM) return { valid: false, error: `Maximum ${MAX_PRENOM} caractères.` };
  return { valid: true };
}

export function validateEmail(value: string): { valid: boolean; error?: string } {
  const s = sanitizeEmail(value);
  if (!s) return { valid: false, error: "L'email est requis." };
  if (!EMAIL_REGEX.test(s)) return { valid: false, error: "Format d'email invalide." };
  return { valid: true };
}

export function validatePhone(value: string): { valid: boolean; error?: string } {
  const raw = value.replace(/\D/g, "");
  if (raw.length !== PHONE_LENGTH) {
    return { valid: false, error: `Le numéro doit contenir exactement ${PHONE_LENGTH} chiffres.` };
  }
  if (!/^[0-9]+$/.test(raw)) return { valid: false, error: "Caractères invalides." };
  return { valid: true };
}

export function validateMessage(value: string): { valid: boolean; error?: string } {
  if (!value || value.trim().length === 0) return { valid: false, error: "Le message est requis." };
  if (value.length > MAX_MESSAGE) return { valid: false, error: `Maximum ${MAX_MESSAGE} caractères.` };
  return { valid: true };
}

export function buildEmailBody(params: {
  lastName: string;
  firstName: string;
  email: string;
  phone: string;
  eventDate: string;
  message: string;
}): string {
  const safe = {
    nom: escapeForEmail(params.lastName),
    prenom: escapeForEmail(params.firstName),
    email: escapeForEmail(params.email),
    telephone: escapeForEmail(params.phone),
    date: escapeForEmail(params.eventDate),
    message: escapeForEmail(params.message),
  };
  return [
    "Nouveau message — Maison Des Saveurs",
    "",
    "Nom : " + safe.nom,
    "Prénom : " + safe.prenom,
    "Email : " + safe.email,
    "Téléphone : " + safe.telephone,
    "Date de l'événement : " + safe.date,
    "",
    "Message :",
    safe.message,
  ].join("\n");
}

export const LIMITS = {
  MAX_NOM,
  MAX_PRENOM,
  MAX_MESSAGE,
  PHONE_LENGTH,
} as const;
