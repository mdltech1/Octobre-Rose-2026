import { ArrowUpRight, SealCheck } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/format";

interface Props {
  name: string;
  url?: string;
  verified?: boolean;
  className?: string;
}

/** Affiche la source d'un contenu, avec lien externe si disponible. */
export function SourceBadge({ name, url, verified = true, className }: Props) {
  const inner = (
    <>
      {verified ? <SealCheck size={15} weight="fill" className="shrink-0 text-rose" aria-hidden="true" /> : null}
      <span className="truncate">
        <span className="text-ink-soft">Source : </span>
        <span className="font-semibold text-ink">{name}</span>
      </span>
      {url ? <ArrowUpRight size={13} weight="bold" className="shrink-0 text-ink-soft" aria-hidden="true" /> : null}
    </>
  );
  const classes = cn(
    "inline-flex max-w-full items-center gap-1.5 rounded-full border border-line bg-surface px-2.5 py-1 text-xs",
    url && "transition-colors duration-300 hover:border-rose/50",
    className,
  );
  if (!url) return <span className={classes}>{inner}</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className={classes}>
      {inner}
      <span className="sr-only">(ouvre un nouvel onglet)</span>
    </a>
  );
}
