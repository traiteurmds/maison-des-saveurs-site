"use client";

import { CONFIGURATOR_STEPS, scrollToConfiguratorStep } from "../lib/configurator-options";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

type Props = {
  activeStep: number;
};

export default function ConfiguratorProgress({ activeStep }: Props) {
  return (
    <nav
      aria-label="Étapes du configurateur"
      className="configurator-progress overflow-x-auto rounded-2xl border border-mds-border bg-[var(--surface)] p-2 shadow-[0_8px_32px_var(--mds-shadow)]"
    >
      <ol className="flex min-w-max items-center gap-1 md:min-w-0 md:justify-between">
        {CONFIGURATOR_STEPS.map((step, index) => {
          const isActive = activeStep === step.id;
          const isComplete = activeStep > step.id;
          return (
            <li key={step.id} className="flex flex-1 items-center">
              <button
                type="button"
                onClick={() => scrollToConfiguratorStep(step.targetId)}
                className={cn(
                  "flex min-h-[44px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-medium transition-all md:px-4 md:text-sm",
                  selectableFocusClass,
                  isActive && "bg-[var(--soft-gold)]/35 text-mds-text",
                  isComplete && !isActive && "text-[var(--gold)]",
                  !isActive && !isComplete && "text-mds-muted hover:text-mds-text"
                )}
                aria-current={isActive ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-[0.65rem] font-semibold",
                    isActive || isComplete
                      ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--black)]"
                      : "border-mds-border bg-[var(--surface)]"
                  )}
                >
                  {step.id}
                </span>
                <span className="hidden sm:inline">{step.label}</span>
              </button>
              {index < CONFIGURATOR_STEPS.length - 1 && (
                <span
                  aria-hidden
                  className={cn(
                    "mx-0.5 hidden h-px w-4 shrink-0 md:block lg:w-8",
                    isComplete ? "bg-[var(--gold)]/50" : "bg-mds-border"
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
