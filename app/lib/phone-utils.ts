export const PHONE_TEL_HREF = "tel:+33758639734";
export const PHONE_DISPLAY_FORMATTED = "07 58 63 97 34";
export const PHONE_COPY_VALUE = "0758639734";

/** Navigateurs in-app (Facebook, Instagram…) bloquent souvent les liens tel: */
export function isRestrictiveInAppBrowser(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = `${navigator.userAgent} ${navigator.vendor}`;
  return /FBAN|FBAV|Instagram|Line\/|Twitter|LinkedInApp|Snapchat|wv\)/i.test(ua);
}

export async function copyPhoneNumber(): Promise<boolean> {
  if (typeof navigator === "undefined") return false;
  try {
    await navigator.clipboard.writeText(PHONE_COPY_VALUE);
    return true;
  } catch {
    return false;
  }
}
