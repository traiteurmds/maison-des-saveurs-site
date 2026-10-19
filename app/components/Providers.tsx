"use client";

import { SelectionProvider } from "./providers/SelectionProvider";
import CookieConsentProvider from "./cookies/CookieConsentProvider";
import MobileActionBar from "./MobileActionBar";
import SelectionToast from "./SelectionToast";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <SelectionProvider>
        <Preloader />
        <SmoothScroll />
        {children}
        <SelectionToast />
        <MobileActionBar />
      </SelectionProvider>
    </CookieConsentProvider>
  );
}
