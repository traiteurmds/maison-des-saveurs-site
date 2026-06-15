"use client";

import { SelectionProvider } from "./providers/SelectionProvider";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import CursorGlow from "./ui/CursorGlow";
import SelectionCartDock from "./SelectionCartDock";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SelectionProvider>
      <SmoothScrollProvider>
        <CursorGlow />
        {children}
        <SelectionCartDock />
      </SmoothScrollProvider>
    </SelectionProvider>
  );
}
