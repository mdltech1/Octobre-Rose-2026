"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";
import { ArrowCounterClockwise, FilmSlate, Hourglass } from "@phosphor-icons/react";
import { EmptyState } from "@/components/EmptyState";
import { VideoCard } from "@/components/VideoCard";
import { VideoFilters, type VideoFilterState } from "@/components/VideoFilters";
import { categoryLabel, languageLabel } from "@/lib/format";
import { WOLOF_EMPTY_MESSAGE } from "@/lib/messages";
import type { ContentCategory, LanguageCode, Video } from "@/types/content";

const LANGS: LanguageCode[] = ["wo", "fr"];
const CATS: ContentCategory[] = ["prevention", "depistage", "comprendre", "sensibilisation"];


function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "");
}

function parseLanguage(v: string | null): LanguageCode | null {
  return v && (LANGS as string[]).includes(v) ? (v as LanguageCode) : null;
}
function parseCategory(v: string | null): ContentCategory | null {
  return v && (CATS as string[]).includes(v) ? (v as ContentCategory) : null;
}

interface Props {
  videos: Video[];
  wolofInReview: number;
}

/** Bibliothèque vidéo : filtres et recherche synchronisés avec l'URL (liens partageables). */
export function VideoLibrary({ videos, wolofInReview }: Props) {
  const pathname = usePathname();
  const params = useSearchParams();

  const state: VideoFilterState = {
    language: parseLanguage(params.get("language")),
    category: parseCategory(params.get("category")),
    query: params.get("q") ?? "",
  };

  const setState = useCallback(
    (next: VideoFilterState) => {
      const sp = new URLSearchParams();
      if (next.language) sp.set("language", next.language);
      if (next.category) sp.set("category", next.category);
      if (next.query) sp.set("q", next.query);
      const qs = sp.toString();
      // History API native : Next.js synchronise useSearchParams sans requête serveur.
      window.history.replaceState(null, "", qs ? `${pathname}?${qs}` : pathname);
    },
    [pathname],
  );

  const matchesQuery = useCallback(
    (v: Video) => {
      if (!state.query.trim()) return true;
      const haystack = normalize(
        [v.title, v.description, v.sourceName, categoryLabel[v.category], languageLabel[v.language]].join(" "),
      );
      return normalize(state.query)
        .split(/\s+/)
        .filter(Boolean)
        .every((term) => haystack.includes(term));
    },
    [state.query],
  );

  const filtered = useMemo(
    () =>
      videos.filter(
        (v) =>
          (!state.language || v.language === state.language) &&
          (!state.category || v.category === state.category) &&
          matchesQuery(v),
      ),
    [videos, state.language, state.category, matchesQuery],
  );

  // Compteurs : chaque groupe tient compte des autres filtres actifs
  const counts = useMemo(() => {
    const base = videos.filter(matchesQuery);
    const language = Object.fromEntries(
      LANGS.map((l) => [l, base.filter((v) => v.language === l && (!state.category || v.category === state.category)).length]),
    ) as Record<LanguageCode, number>;
    const category = Object.fromEntries(
      CATS.map((c) => [c, base.filter((v) => v.category === c && (!state.language || v.language === state.language)).length]),
    ) as Record<ContentCategory, number>;
    return { language, category, total: base.length };
  }, [videos, matchesQuery, state.category, state.language]);

  const reset = () => setState({ language: null, category: null, query: "" });
  const activeLabel = [
    state.language ? languageLabel[state.language] : null,
    state.category ? categoryLabel[state.category] : null,
    state.query ? `« ${state.query} »` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div>
      <VideoFilters value={state} onChange={setState} counts={counts} />

      <p className="mt-6 text-sm text-ink-soft" aria-live="polite" role="status">
        {filtered.length} vidéo{filtered.length > 1 ? "s" : ""}
        {activeLabel ? ` pour ${activeLabel}` : " publiées"}
      </p>

      {filtered.length > 0 ? (
        <ul className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((video, i) => (
            <li key={video.id}>
              <VideoCard video={video} priority={i === 0} />
            </li>
          ))}
        </ul>
      ) : state.language === "wo" && !state.query ? (
        <EmptyState
          className="mt-5"
          icon={<Hourglass size={24} weight="duotone" />}
          title="Vidéos en wolof : en cours de référencement"
          description={
            wolofInReview > 0
              ? `${WOLOF_EMPTY_MESSAGE} ${wolofInReview} vidéo${wolofInReview > 1 ? "s" : ""} en wolof ${wolofInReview > 1 ? "sont" : "est"} en cours de vérification.`
              : WOLOF_EMPTY_MESSAGE
          }
          action={
            <button
              type="button"
              onClick={() => setState({ ...state, language: "fr" })}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper active:scale-[0.98]"
            >
              Voir les vidéos en français
            </button>
          }
        />
      ) : (
        <EmptyState
          className="mt-5"
          icon={<FilmSlate size={24} weight="duotone" />}
          title="Aucune vidéo pour ces critères"
          description="Nous ajoutons progressivement des ressources vidéo fiables. Essayez un autre thème ou une autre langue."
          action={
            <button
              type="button"
              onClick={reset}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-semibold text-paper active:scale-[0.98]"
            >
              <ArrowCounterClockwise size={16} weight="bold" aria-hidden="true" />
              Réinitialiser les filtres
            </button>
          }
        />
      )}
    </div>
  );
}

export function VideoGridSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div aria-hidden="true">
      <div className="skeleton h-12 max-w-md rounded-full" />
      <div className="mt-4 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="skeleton h-11 w-24 rounded-full" />
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bezel">
            <div className="bezel-core p-2">
              <div className="skeleton aspect-video rounded-[1.4rem]" />
              <div className="space-y-3 p-3 pt-4">
                <div className="skeleton h-6 w-24 rounded-full" />
                <div className="skeleton h-5 w-4/5 rounded-lg" />
                <div className="skeleton h-4 w-full rounded-lg" />
                <div className="skeleton h-4 w-2/3 rounded-lg" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
