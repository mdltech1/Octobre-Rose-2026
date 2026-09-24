"use client";

import { useMemo, useState } from "react";
import { MagnifyingGlass, Books } from "@phosphor-icons/react";
import { EmptyState } from "@/components/EmptyState";
import { ResourceCard } from "@/components/ResourceCard";
import { resourceTypeLabel } from "@/data/resources";
import { cn } from "@/lib/format";
import type { Resource, ResourceType } from "@/types/content";

function normalize(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Liste filtrable des ressources (type + recherche). */
export function ResourceList({ resources }: { resources: Resource[] }) {
  const [type, setType] = useState<ResourceType | null>(null);
  const [query, setQuery] = useState("");

  const types = useMemo(() => Array.from(new Set(resources.map((r) => r.type))), [resources]);

  const filtered = resources.filter((r) => {
    if (type && r.type !== type) return false;
    if (!query.trim()) return true;
    const hay = normalize([r.name, r.description, r.address ?? "", resourceTypeLabel[r.type]].join(" "));
    return normalize(query).split(/\s+/).filter(Boolean).every((t) => hay.includes(t));
  });

  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div className="relative w-full max-w-md">
          <label htmlFor="resource-search" className="mb-2 block text-sm font-semibold text-ink">
            Rechercher une ressource
          </label>
          <MagnifyingGlass size={18} className="pointer-events-none absolute bottom-3.5 left-4 text-ink-soft" aria-hidden="true" />
          <input
            id="resource-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Nom, type, ville..."
            autoComplete="off"
            className="h-12 w-full rounded-full border border-line bg-surface pl-11 pr-4 text-[0.95rem] text-ink placeholder:text-ink-soft/80 focus:border-rose focus:outline-none focus:ring-2 focus:ring-rose/25"
          />
        </div>
        <div role="group" aria-label="Filtrer par type" className="scroll-row -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 md:mx-0 md:px-0">
          {[null, ...types].map((t) => (
            <button
              key={t ?? "all"}
              type="button"
              aria-pressed={type === t}
              onClick={() => setType(t)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-sm font-semibold transition-all duration-300 active:scale-[0.97]",
                type === t ? "bg-ink text-paper" : "bg-surface text-ink ring-1 ring-line hover:ring-ink/30",
              )}
            >
              {t ? resourceTypeLabel[t] : "Toutes"}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-6 text-sm text-ink-soft" role="status" aria-live="polite">
        {filtered.length} ressource{filtered.length > 1 ? "s" : ""}
      </p>

      {filtered.length ? (
        <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((r) => (
            <li key={r.id}>
              <ResourceCard resource={r} />
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState
          className="mt-5"
          icon={<Books size={24} weight="duotone" />}
          title="Aucune ressource ne correspond"
          description="Modifiez votre recherche ou choisissez un autre type. Nous n'ajoutons que des ressources dont les informations sont vérifiées."
          action={
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setType(null);
              }}
              className="inline-flex min-h-11 items-center rounded-full bg-ink px-5 text-sm font-semibold text-paper"
            >
              Tout afficher
            </button>
          }
        />
      )}
    </div>
  );
}
