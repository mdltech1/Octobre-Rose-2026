"use client";

import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/lib/format";
import type { ContentCategory, LanguageCode } from "@/types/content";

export interface VideoFilterState {
  language: LanguageCode | null;
  category: ContentCategory | null;
  query: string;
}

const languageOptions: { value: LanguageCode; label: string }[] = [
  { value: "wo", label: "Wolof" },
  { value: "fr", label: "Français" },
];

const categoryOptions: { value: ContentCategory; label: string }[] = [
  { value: "prevention", label: "Prévention" },
  { value: "depistage", label: "Dépistage" },
  { value: "comprendre", label: "Comprendre" },
  { value: "sensibilisation", label: "Sensibilisation" },
];

interface Props {
  value: VideoFilterState;
  onChange: (next: VideoFilterState) => void;
  counts: { language: Record<LanguageCode, number>; category: Record<ContentCategory, number>; total: number };
}

function Chip({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all duration-300 ease-[var(--ease-spring)] active:scale-[0.97]",
        active ? "bg-ink text-paper" : "bg-surface text-ink ring-1 ring-line hover:ring-ink/30",
      )}
    >
      {children}
      <span
        className={cn(
          "rounded-full px-1.5 text-[0.7rem] tabular-nums",
          active ? "bg-paper/15 text-paper" : "bg-surface-2 text-ink-soft",
        )}
        aria-label={`${count} vidéo${count > 1 ? "s" : ""}`}
      >
        {count}
      </span>
    </button>
  );
}

export function VideoFilters({ value, onChange, counts }: Props) {
  const isAll = !value.language && !value.category;

  return (
    <div className="flex flex-col gap-4">
      <div className="relative max-w-md">
        <label htmlFor="video-search" className="mb-2 block text-sm font-semibold text-ink">
          Rechercher une vidéo
        </label>
        <MagnifyingGlass
          size={18}
          className="pointer-events-none absolute bottom-3.5 left-4 text-ink-soft"
          aria-hidden="true"
        />
        <input
          id="video-search"
          type="search"
          value={value.query}
          onChange={(e) => onChange({ ...value, query: e.target.value })}
          placeholder="Titre, source, thème..."
          autoComplete="off"
          className="h-12 w-full rounded-full border border-line bg-surface pl-11 pr-11 text-[0.95rem] text-ink placeholder:text-ink-soft/80 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/25"
        />
        {value.query ? (
          <button
            type="button"
            onClick={() => onChange({ ...value, query: "" })}
            className="absolute bottom-2 right-2 grid size-8 place-items-center rounded-full text-ink-soft hover:bg-surface-2 hover:text-ink"
            aria-label="Effacer la recherche"
          >
            <X size={16} weight="bold" />
          </button>
        ) : null}
      </div>

      <div className="scroll-row -mx-4 flex items-center gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
        <Chip
          active={isAll}
          count={counts.total}
          onClick={() => onChange({ ...value, language: null, category: null })}
        >
          Toutes
        </Chip>

        <span className="mx-1 h-6 w-px shrink-0 bg-line" aria-hidden="true" />

        <div role="group" aria-label="Filtrer par langue" className="flex shrink-0 gap-2">
          {languageOptions.map((opt) => (
            <Chip
              key={opt.value}
              active={value.language === opt.value}
              count={counts.language[opt.value]}
              onClick={() =>
                onChange({ ...value, language: value.language === opt.value ? null : opt.value })
              }
            >
              {opt.label}
            </Chip>
          ))}
        </div>

        <span className="mx-1 h-6 w-px shrink-0 bg-line" aria-hidden="true" />

        <div role="group" aria-label="Filtrer par thème" className="flex shrink-0 gap-2">
          {categoryOptions.map((opt) => (
            <Chip
              key={opt.value}
              active={value.category === opt.value}
              count={counts.category[opt.value]}
              onClick={() =>
                onChange({ ...value, category: value.category === opt.value ? null : opt.value })
              }
            >
              {opt.label}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
