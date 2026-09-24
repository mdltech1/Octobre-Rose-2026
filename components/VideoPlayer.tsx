"use client";

import Image from "next/image";
import { useState } from "react";
import { Play, WarningCircle } from "@phosphor-icons/react";
import { youtubeAutoplayUrl } from "@/lib/youtube";
import { languageLabel } from "@/lib/format";
import type { Video } from "@/types/content";

/**
 * Lecteur en façade : seule la miniature est chargée au départ.
 * L'iframe YouTube officielle (youtube-nocookie) n'est insérée qu'au clic.
 */
export function VideoPlayer({ video, priority = false }: { video: Video; priority?: boolean }) {
  const [state, setState] = useState<"idle" | "loading" | "ready">("idle");
  const [thumbFailed, setThumbFailed] = useState(false);

  if (state !== "idle") {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[1.4rem] bg-ink">
        {state === "loading" ? (
          <div className="skeleton absolute inset-0" aria-hidden="true" />
        ) : null}
        <iframe
          src={youtubeAutoplayUrl(video.embedUrl)}
          title={`${video.title} (vidéo en ${languageLabel[video.language].toLowerCase()})`}
          className="absolute inset-0 size-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setState("ready")}
        />
        <span className="sr-only" aria-live="polite">
          {state === "loading" ? "Chargement de la vidéo" : "Vidéo chargée"}
        </span>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setState("loading")}
      className="group relative block aspect-video w-full overflow-hidden rounded-[1.4rem] bg-surface-2 text-left"
      aria-label={`Regarder : ${video.title} (${languageLabel[video.language]})`}
    >
      {thumbFailed ? (
        <span className="absolute inset-0 flex flex-col justify-start bg-rose-soft p-4 sm:p-5">
          <span className="inline-flex items-center gap-1.5 text-xs font-medium text-rose-ink">
            <WarningCircle size={14} weight="bold" aria-hidden="true" />
            Miniature indisponible
          </span>
          <span className="mt-1 line-clamp-2 font-display text-lg font-semibold leading-snug text-ink">
            {video.title}
          </span>
        </span>
      ) : (
        <Image
          src={video.thumbnailUrl}
          alt=""
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-[var(--ease-spring)] group-hover:scale-[1.03]"
          priority={priority}
          unoptimized
          onError={() => setThumbFailed(true)}
        />
      )}
      <span className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" aria-hidden="true" />
      <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-white/95 py-1.5 pl-1.5 pr-4 text-sm font-semibold text-[#25242a] shadow-soft transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 group-active:scale-[0.98]">
        <span className="grid size-8 place-items-center rounded-full bg-[#bf2c61] text-white" aria-hidden="true">
          <Play size={14} weight="fill" />
        </span>
        Regarder
      </span>
    </button>
  );
}
