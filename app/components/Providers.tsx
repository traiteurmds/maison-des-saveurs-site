"use client";

import { SelectionProvider } from "./providers/SelectionProvider";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import CursorGlow from "./ui/CursorGlow";
import SelectionCartDock from "./SelectionCartDock";
import SelectionToast from "./SelectionToast";
import MobileCallButton from "./MobileCallButton";
import CookieConsentProvider from "./cookies/CookieConsentProvider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CookieConsentProvider>
      <SelectionProvider>
        <SmoothScrollProvider>
          <CursorGlow />
          {children}
          <SelectionToast />
          <SelectionCartDock />
          <MobileCallButton />
        </SmoothScrollProvider>
      </SelectionProvider>
    </CookieConsentProvider>
  );
}
