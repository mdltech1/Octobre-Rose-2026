"use client";

import { Printer } from "@phosphor-icons/react";

/** Ouvre la boîte d'impression du navigateur, pour imprimer l'affiche sur papier. */
export function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="inline-flex min-h-12 items-center gap-3 rounded-full bg-rose py-1.5 pl-5 pr-1.5 text-[0.95rem] font-semibold text-on-rose shadow-soft transition-all duration-500 ease-[var(--ease-spring)] hover:bg-rose-strong active:scale-[0.98]"
    >
      Imprimer
      <span className="grid size-9 place-items-center rounded-full bg-on-rose/15" aria-hidden="true">
        <Printer size={17} weight="bold" />
      </span>
    </button>
  );
}
