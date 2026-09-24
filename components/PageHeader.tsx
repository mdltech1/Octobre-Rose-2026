import type { ReactNode } from "react";
import { RibbonMark } from "@/components/RibbonMark";

interface Props {
  title: string;
  intro: ReactNode;
  children?: ReactNode;
}

/** En-tête des pages intérieures. */
export function PageHeader({ title, intro, children }: Props) {
  return (
    <header className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 md:pb-14 md:pt-36">
      {/* Repère commun à toutes les pages : le ruban, sans animation (réservée à l'accueil) */}
      <RibbonMark className="rise mb-5 h-10 w-auto text-rose sm:h-12" />
      <h1 className="rise max-w-[18ch] font-display text-[2.6rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl">
        {title}
      </h1>
      <div className="rise rise-2 mt-6 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{intro}</div>
      {children ? <div className="rise rise-3 mt-8">{children}</div> : null}
    </header>
  );
}
