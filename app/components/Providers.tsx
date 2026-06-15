"use client";

import ThemeProvider from "./providers/ThemeProvider";
import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import CursorGlow from "./ui/CursorGlow";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <SmoothScrollProvider>
        <CursorGlow />
        {children}
      </SmoothScrollProvider>
    </ThemeProvider>
  );
}
