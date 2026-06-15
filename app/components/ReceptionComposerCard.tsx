"use client";

import SelectionDetailPanel from "./SelectionDetailPanel";
import { cn } from "../lib/utils";

type Props = {
  onBrowseMenu?: () => void;
  className?: string;
};

export default function ReceptionComposerCard({ onBrowseMenu, className }: Props) {
  return (
    <div
      id="reception-composer"
      className={cn(
        "relative overflow-hidden rounded-3xl border border-mds-border bg-[rgba(255,255,255,0.78)] p-8 shadow-[0_24px_64px_var(--mds-shadow)] backdrop-blur-sm md:p-10",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--gold)]/10 blur-2xl"
      />
      <SelectionDetailPanel onBrowseMenu={onBrowseMenu} showIntro showHeader />
    </div>
  );
}
