"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { cn } from "../../lib/utils";

export default function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Changer le thème"
        className={cn(
          "flex h-9 w-9 items-center justify-center rounded-full border border-mds-border bg-mds-card",
          className
        )}
      />
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Activer le mode clair" : "Activer le mode sombre"}
      className={cn(
        "flex h-9 w-9 items-center justify-center rounded-full border border-mds-border bg-mds-card text-mds-text transition-all duration-300 hover:border-terracotta/40 hover:text-terracotta",
        className
      )}
    >
      {isDark ? <FaSun className="text-sm" /> : <FaMoon className="text-sm" />}
    </button>
  );
}
