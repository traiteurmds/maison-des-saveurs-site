"use client";

import ThemeProvider from "./providers/ThemeProvider";
import { SelectionProvider } from "./providers/SelectionProvider";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import CursorGlow from "./ui/CursorGlow";
import SelectionSummary from "./SelectionSummary";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SelectionProvider>
        <SmoothScrollProvider>
          <CursorGlow />
          {children}
          <SelectionSummary />
        </SmoothScrollProvider>
      </SelectionProvider>
    </ThemeProvider>
  );
}
