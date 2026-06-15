"use client";

import SmoothScrollProvider from "./providers/SmoothScrollProvider";
import CursorGlow from "./ui/CursorGlow";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SmoothScrollProvider>
      <CursorGlow />
      {children}
    </SmoothScrollProvider>
  );
}
