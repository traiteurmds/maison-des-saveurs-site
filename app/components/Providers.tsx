"use client";

import { SelectionProvider } from "./providers/SelectionProvider";
import CookieConsentProvider from "./cookies/CookieConsentProvider";
import MobileActionBar from "./MobileActionBar";
import SelectionToast from "./SelectionToast";
import SmoothScroll from "./SmoothScroll";
import Preloader from "./Preloader";
import CustomCursor from "./CustomCursor";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <SelectionProvider>
        <Preloader />
        <SmoothScroll />
        <CustomCursor />
        {children}
        <SelectionToast />
        <MobileActionBar />
      </SelectionProvider>
    </CookieConsentProvider>
  );
}
