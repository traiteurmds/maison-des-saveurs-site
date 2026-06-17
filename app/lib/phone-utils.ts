import { PHONE_E164, PHONE_DISPLAY } from "./site-seo";

/** Format international sans espace ni 0 après +33 → +33758639734 */
export const PHONE_TEL_HREF = `tel:${PHONE_E164}`;
export const PHONE_DISPLAY_FORMATTED = PHONE_DISPLAY.replace(/\./g, " ");
export const PHONE_COPY_VALUE = PHONE_E164.replace("+33", "0");

/** Navigateurs in-app (Facebook, Instagram…) bloquent souvent les liens tel: */
export function isRestrictiveInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = `${navigator.userAgent} ${navigator.vendor}`;
  return /FBAN|FBAV|FB_IAB|FBIOS|Instagram|Line\/|LinkedInApp/i.test(ua);
}

export async function copyPhoneNumber(): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  try {
    await navigator.clipboard.writeText(PHONE_COPY_VALUE);
    return true;
  } catch {
    try {
      const input = document.createElement("textarea");
      input.value = PHONE_COPY_VALUE;
      input.setAttribute("readonly", "");
      input.style.position = "fixed";
      input.style.left = "-9999px";
      document.body.appendChild(input);
      input.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(input);
      return ok;
    } catch {
      return false;
    }
  }
}
