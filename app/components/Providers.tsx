"use client";

import { SelectionProvider } from "./providers/SelectionProvider";
import CookieConsentProvider from "./cookies/CookieConsentProvider";
import MobileActionBar from "./MobileActionBar";
import SelectionToast from "./SelectionToast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <SelectionProvider>
        {children}
        <SelectionToast />
        <MobileActionBar />
      </SelectionProvider>
    </CookieConsentProvider>
  );
}
