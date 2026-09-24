import { ArrowUpRight, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";
import { LanguageBadge } from "@/components/LanguageBadge";
import { SourceBadge } from "@/components/SourceBadge";
import { VideoPlayer } from "@/components/VideoPlayer";
import { categoryLabel, formatShortDate } from "@/lib/format";
import type { Video } from "@/types/content";

export function VideoCard({ video, priority = false }: { video: Video; priority?: boolean }) {
  return (
    <article className="bezel relative h-full" aria-labelledby={`${video.id}-title`}>
      <div className="bezel-core flex h-full flex-col p-2">
        <VideoPlayer video={video} priority={priority} />

        <div className="flex flex-1 flex-col px-3 pb-3 pt-4">
          <div className="flex flex-wrap items-center gap-2">
            <LanguageBadge language={video.language} confirmed={video.languageConfirmed} />
            <span className="rounded-full border border-line px-2.5 py-1 text-xs font-medium text-ink-soft">
              {categoryLabel[video.category]}
            </span>
            {video.duration ? <span className="text-xs text-ink-soft">{video.duration}</span> : null}
          </div>

          <h3 id={`${video.id}-title`} className="mt-3 font-display text-lg font-semibold leading-snug tracking-tight text-ink">
            {video.title}
          </h3>
          <p className="mt-2 text-[0.95rem] leading-relaxed text-ink-soft">{video.description}</p>
          {video.note ? (
            <p className="mt-3 rounded-2xl bg-surface-2 px-3 py-2 text-sm leading-relaxed text-ink-soft">{video.note}</p>
          ) : null}

          <div className="mt-auto pt-5">
            <SourceBadge name={video.sourceName} url={video.sourceUrl} verified={video.verified} />
            <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-semibold">
              <a
                href={video.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-ink underline-offset-4 hover:underline"
              >
                <YoutubeLogo size={18} weight="fill" className="text-rose" aria-hidden="true" />
                Vidéo originale
                <span className="sr-only">(ouvre YouTube dans un nouvel onglet)</span>
              </a>
              <a
                href={video.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-ink-soft underline-offset-4 hover:text-ink hover:underline"
              >
                Chaîne de la source
                <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
                <span className="sr-only">(nouvel onglet)</span>
              </a>
            </div>
            <p className="mt-3 text-xs text-ink-soft">Référencement vérifié le {formatShortDate(video.verifiedAt)}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
