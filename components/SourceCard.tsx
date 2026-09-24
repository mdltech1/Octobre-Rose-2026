import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { sourceKindLabel } from "@/data/sources";
import { formatShortDate, hostname } from "@/lib/format";
import type { Source } from "@/types/content";

export function SourceCard({ source }: { source: Source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col rounded-[1.75rem] bg-surface p-6 ring-1 ring-line transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 hover:shadow-soft"
    >
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-ink-soft">
          {sourceKindLabel[source.kind]}
        </span>
        <span
          aria-hidden="true"
          className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 text-ink transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:bg-rose group-hover:text-on-rose"
        >
          <ArrowUpRight size={16} weight="bold" />
        </span>
      </div>
      <p className="mt-4 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
        {source.name}
        <span className="text-ink-soft"> ({source.shortName})</span>
      </p>
      {source.documentTitle ? <p className="mt-1 text-sm font-medium text-ink">{source.documentTitle}</p> : null}
      <p className="mt-3 leading-relaxed text-ink-soft">{source.description}</p>
      <p className="mt-auto pt-5 text-xs text-ink-soft">
        {hostname(source.url)}
        {source.documentDate ? `, publié : ${formatShortDate(source.documentDate)}` : ""}
        {`, consulté le ${formatShortDate(source.consultedAt)}`}
      </p>
      <span className="sr-only">(ouvre la source dans un nouvel onglet)</span>
    </a>
  );
}
