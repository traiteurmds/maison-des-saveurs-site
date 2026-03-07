import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
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
} from "@/app/lib/contact-validation";

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;

const ipRequestTimestamps = new Map<string, number[]>();

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  if (realIp) return realIp;
  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const cutoff = now - RATE_LIMIT_WINDOW_MS;
  let timestamps = ipRequestTimestamps.get(ip) ?? [];
  timestamps = timestamps.filter((t) => t > cutoff);
  if (timestamps.length >= RATE_LIMIT_MAX_REQUESTS) return true;
  timestamps.push(now);
  ipRequestTimestamps.set(ip, timestamps);
  return false;
}

async function verifyHCaptcha(token: string | null): Promise<boolean> {
  const secret = process.env.HCAPTCHA_SECRET_KEY;
  if (!secret) return true;
  if (!token || token.length < 10) return false;
  try {
    const res = await fetch("https://hcaptcha.com/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Trop de demandes. Réessayez plus tard." },
      { status: 429, headers: { "Cache-Control": "no-store" } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Corps de requête invalide." },
      { status: 400 }
    );
  }

  if (!body || typeof body !== "object") {
    return NextResponse.json(
      { error: "Données invalides." },
      { status: 400 }
    );
  }

  const raw = body as Record<string, unknown>;
  const firstName = typeof raw.firstName === "string" ? raw.firstName : "";
  const lastName = typeof raw.lastName === "string" ? raw.lastName : "";
  const email = typeof raw.email === "string" ? raw.email : "";
  const phone = typeof raw.phone === "string" ? raw.phone : "";
  const eventDate = typeof raw.eventDate === "string" ? raw.eventDate : "";
  const message = typeof raw.message === "string" ? raw.message : "";
  const hcaptchaToken = typeof raw.hcaptchaToken === "string" ? raw.hcaptchaToken : null;

  const nom = sanitizeName(lastName, LIMITS.MAX_NOM);
  const prenom = sanitizeName(firstName, LIMITS.MAX_PRENOM);
  const emailSanitized = sanitizeEmail(email);
  const messageSanitized = sanitizeMessage(message);

  const errors: Record<string, string> = {};
  const rNom = validateNom(nom);
  if (!rNom.valid && rNom.error) errors.lastName = rNom.error;
  const rPrenom = validatePrenom(prenom);
  if (!rPrenom.valid && rPrenom.error) errors.firstName = rPrenom.error;
  const rEmail = validateEmail(emailSanitized);
  if (!rEmail.valid && rEmail.error) errors.email = rEmail.error;
  const rPhone = validatePhone(phone);
  if (!rPhone.valid && rPhone.error) errors.phone = rPhone.error;
  const rMessage = validateMessage(messageSanitized);
  if (!rMessage.valid && rMessage.error) errors.message = rMessage.error;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const selected = eventDate ? new Date(eventDate) : null;
  if (selected && selected < today) {
    errors.eventDate = "La date doit être aujourd'hui ou une date future.";
  }

  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ error: "Validation échouée.", errors }, { status: 400 });
  }

  const hcaptchaOk = await verifyHCaptcha(hcaptchaToken);
  if (!hcaptchaOk) {
    return NextResponse.json(
      { error: "Vérification de sécurité échouée. Réessayez." },
      { status: 400 }
    );
  }

  return NextResponse.json({ ok: true });
}
