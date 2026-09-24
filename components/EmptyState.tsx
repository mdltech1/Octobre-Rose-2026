import type { ReactNode } from "react";
import { cn } from "@/lib/format";

interface Props {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
  className?: string;
}

/** État vide composé : explique pourquoi c'est vide et ce qui va se passer. */
export function EmptyState({ icon, title, description, action, className }: Props) {
  return (
    <div
      role="status"
      className={cn(
        "flex flex-col items-start gap-4 rounded-[1.75rem] border border-dashed border-line bg-surface/60 p-6 sm:p-8",
        className,
      )}
    >
      <span className="grid size-12 place-items-center rounded-2xl bg-rose-soft text-rose-ink" aria-hidden="true">
        {icon}
      </span>
      <div className="max-w-[58ch]">
        <p className="font-display text-xl font-semibold tracking-tight text-ink">{title}</p>
        <p className="mt-2 leading-relaxed text-ink-soft">{description}</p>
      </div>
      {action}
    </div>
  );
}
