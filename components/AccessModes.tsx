"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpenText,
  Headphones,
  Pause,
  Play,
  SealCheck,
  VideoCamera,
} from "@phosphor-icons/react";
import { VideoPlayer } from "@/components/VideoPlayer";
import { cn } from "@/lib/format";
import { useSpeech } from "@/lib/useSpeech";
import type { Source, Video } from "@/types/content";

interface Props {
  signs: string[];
  listenText: string;
  video?: Video;
  sources: Source[];
}

type ModeId = "lire" | "ecouter" | "regarder" | "verifier";

/** Démonstration interactive des quatre façons de s'informer sur la plateforme. */
export function AccessModes({ signs, listenText, video, sources }: Props) {
  const uid = useId();
  const [active, setActive] = useState<ModeId>("lire");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const speech = useSpeech();

  const modes: { id: ModeId; label: string; icon: ReactNode; text: string; href: string; cta: string }[] = [
    {
      id: "lire",
      label: "Lire",
      icon: <BookOpenText size={22} weight="light" />,
      text: "Des fiches écrites simplement, chacune reliée à sa source.",
      href: "/comprendre",
      cta: "Lire les fiches",
    },
    {
      id: "ecouter",
      label: "Écouter",
      icon: <Headphones size={22} weight="light" />,
      text: "Chaque fiche peut être lue à voix haute par votre téléphone, en français.",
      href: "/comprendre#quand-consulter",
      cta: "Écouter une fiche",
    },
    {
      id: "regarder",
      label: "Regarder",
      icon: <VideoCamera size={22} weight="light" />,
      text: "Des vidéos de sources identifiables, lues ici, en wolof et en français.",
      href: "/videos",
      cta: "Voir les vidéos",
    },
    {
      id: "verifier",
      label: "Vérifier",
      icon: <SealCheck size={22} weight="light" />,
      text: "Chaque information renvoie à l'organisme qui l'a publiée. Vous pouvez toujours remonter à la source.",
      href: "/sources",
      cta: "Nos sources",
    },
  ];

  const index = modes.findIndex((m) => m.id === active);
  const current = modes[index];

  const select = (id: ModeId) => {
    if (id !== "ecouter" && speech.speaking) speech.stop();
    setActive(id);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    const last = modes.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    select(modes[next].id);
    tabRefs.current[modes[next].id]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Façons de s'informer" className="grid grid-cols-2 border-b border-line lg:flex lg:gap-10">
        {modes.map((m) => {
          const selected = m.id === active;
          return (
            <button
              key={m.id}
              ref={(el) => {
                tabRefs.current[m.id] = el;
              }}
              id={`${uid}-${m.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => select(m.id)}
              onKeyDown={onKeyDown}
              className={cn(
                "group relative flex min-w-0 items-center gap-2.5 pb-4 pt-3 sm:gap-3 text-left font-display text-[1.4rem] font-semibold tracking-[-0.03em] transition-colors duration-500 sm:text-4xl lg:text-5xl",
                selected ? "text-ink" : "text-ink-soft/70 hover:text-ink-soft",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "grid size-9 shrink-0 place-items-center rounded-xl transition-colors duration-500 sm:size-12 sm:rounded-2xl",
                  selected ? "bg-rose text-on-rose" : "bg-surface-2 text-ink-soft",
                )}
              >
                {m.icon}
              </span>
              {m.label}
              <span
                aria-hidden="true"
                className={cn(
                  "absolute inset-x-0 -bottom-px h-[3px] origin-left rounded-full bg-rose transition-transform duration-400 ease-[var(--ease-spring)]",
                  selected ? "scale-x-100" : "scale-x-0",
                )}
              />
            </button>
          );
        })}
      </div>

      <div
        id={`${uid}-panel`}
        role="tabpanel"
        aria-labelledby={`${uid}-${active}`}
        className="mt-10 grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-center md:gap-14"
      >
        <div key={`${active}-text`} className="swap-in">
          <p className="max-w-[30ch] font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
            {current.text}
          </p>
          <Link href={current.href} className="group mt-6 inline-flex items-center gap-3 text-[0.95rem] font-semibold text-ink">
            {current.cta}
            <span className="grid size-9 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1" aria-hidden="true">
              <ArrowRight size={15} weight="bold" />
            </span>
          </Link>
        </div>

        <div className="bezel">
          <div key={active} className="bezel-core swap-in min-h-[20rem] overflow-hidden">
            {active === "lire" ? (
              <div className="p-6 sm:p-8">
                <p className="font-display text-2xl font-semibold tracking-tight text-ink">Signes et symptômes</p>
                <ul className="mt-5 grid gap-3">
                  {signs.map((s) => (
                    <li key={s} className="flex gap-3 leading-relaxed text-ink">
                      <span className="mt-[0.6rem] h-1.5 w-3 shrink-0 rounded-full bg-rose" aria-hidden="true" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink-soft">Liste de l&apos;OMS. Ces signes justifient de consulter, sans signifier un cancer.</p>
              </div>
            ) : null}

            {active === "ecouter" ? (
              <div className="flex h-full min-h-[20rem] flex-col justify-between bg-rose-soft p-6 text-rose-ink sm:p-8">
                <div className="flex items-center gap-5">
                  <button
                    type="button"
                    disabled={!speech.supported}
                    onClick={() => speech.toggle(listenText, "Quand consulter ? (OMS)")}
                    aria-pressed={speech.speaking}
                    className="grid size-20 shrink-0 place-items-center rounded-full bg-rose text-on-rose shadow-lift transition-transform duration-500 ease-[var(--ease-spring)] hover:scale-105 active:scale-95 disabled:opacity-40"
                  >
                    {speech.speaking ? <Pause size={30} weight="fill" /> : <Play size={30} weight="fill" />}
                    <span className="sr-only">{speech.speaking ? "Arrêter la lecture" : "Écouter ce passage"}</span>
                  </button>
                  <div className="eq flex h-14 flex-1 items-end gap-[5px]" data-on={speech.speaking} aria-hidden="true">
                    {Array.from({ length: 22 }).map((_, i) => (
                      <span key={i} style={{ "--i": i } as React.CSSProperties} />
                    ))}
                  </div>
                </div>
                <p className="mt-8 font-display text-xl font-medium leading-snug tracking-tight sm:text-2xl">« {listenText} »</p>
                <p className="mt-4 text-sm" role="status" aria-live="polite">
                  {speech.supported === false
                    ? "La lecture vocale n'est pas disponible sur ce navigateur."
                    : speech.speaking
                      ? "Lecture en cours, par la voix de votre appareil."
                      : "Texte de l'OMS, lu par la voix de votre appareil."}
                </p>
              </div>
            ) : null}

            {active === "regarder" ? (
              video ? (
                <div className="p-2">
                  <VideoPlayer video={video} />
                  <div className="px-3 pb-3 pt-4">
                    <p className="font-display text-lg font-semibold leading-snug tracking-tight text-ink">{video.title}</p>
                    <p className="mt-1 text-sm text-ink-soft">Source : {video.sourceName}</p>
                  </div>
                </div>
              ) : (
                <p className="p-8 text-ink-soft">Aucune vidéo publiée pour le moment.</p>
              )
            ) : null}

            {active === "verifier" ? (
              <ul className="divide-y divide-line">
                {sources.map((s) => (
                  <li key={s.id}>
                    <a
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 p-5 transition-colors hover:bg-surface-2 sm:px-7"
                    >
                      <SealCheck size={26} weight="fill" className="shrink-0 text-rose" aria-hidden="true" />
                      <span className="min-w-0 flex-1">
                        <span className="block font-display text-lg font-semibold tracking-tight text-ink">{s.shortName}</span>
                        <span className="block truncate text-sm text-ink-soft">{s.documentTitle ?? s.name}</span>
                      </span>
                      <ArrowUpRight size={18} weight="bold" className="shrink-0 text-ink-soft transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                      <span className="sr-only"> (nouvel onglet)</span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
