import Link from "next/link";
import { Quotes, VideoCamera, WhatsappLogo, XCircle, CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { ListenButton } from "@/components/ListenButton";
import { SourceBadge } from "@/components/SourceBadge";
import { articleToPlainText } from "@/lib/articles";
import { getSourceById, getSourcesByIds } from "@/lib/content";
import { absoluteUrl } from "@/lib/site";
import type { Article, Video } from "@/types/content";

/** Fiche complète affichée sur /comprendre. */
export function ArticleSection({ article, wolofVideo }: { article: Article; wolofVideo?: Video }) {
  const sources = getSourcesByIds(article.sourceIds);
  // Partage de cette fiche seule : le lien ouvre directement sa section sur /comprendre
  const shareText = [article.title, article.summary, absoluteUrl(`/comprendre#${article.slug}`)].join("\n");

  return (
    <section id={article.slug} aria-labelledby={`${article.slug}-title`} className="scroll-mt-12 lg:scroll-mt-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 id={`${article.slug}-title`} className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          {article.title}
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <ListenButton text={articleToPlainText(article)} label={article.title} />
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-surface-2 px-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-rose-soft hover:text-rose-ink active:scale-[0.97]"
          >
            <WhatsappLogo size={16} weight="fill" aria-hidden="true" />
            Partager
            <span className="sr-only"> la fiche « {article.title} » sur WhatsApp (nouvel onglet)</span>
          </a>
        </div>
      </div>
      <p className="mt-3 max-w-[62ch] text-lg leading-relaxed text-ink-soft">{article.summary}</p>

      <div className="mt-6 space-y-5">
        {article.blocks.map((block, i) => {
          switch (block.type) {
            case "paragraph":
              return (
                <p key={i} className="max-w-[68ch] leading-relaxed text-ink">
                  {block.text}
                </p>
              );
            case "list":
              return (
                <ul key={i} className="grid max-w-[68ch] gap-2">
                  {block.items.map((item) => (
                    <li key={item} className="flex gap-3 leading-relaxed text-ink">
                      <span className="mt-[0.6rem] h-1.5 w-3 shrink-0 rounded-full bg-rose" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              );
            case "quote": {
              const src = getSourceById(block.sourceId);
              return (
                <figure key={i} className="max-w-[68ch] rounded-[1.5rem] bg-surface p-5 ring-1 ring-line sm:p-6">
                  <Quotes size={22} weight="fill" className="text-rose" aria-hidden="true" />
                  <blockquote className="mt-2 font-display text-xl font-medium leading-snug tracking-tight text-ink">
                    « {block.text} »
                  </blockquote>
                  {src ? (
                    <figcaption className="mt-3 text-sm text-ink-soft">
                      {src.shortName}, {src.documentTitle ?? src.name}
                    </figcaption>
                  ) : null}
                </figure>
              );
            }
            case "myth":
              return (
                <div key={i} className="grid max-w-[68ch] gap-2 sm:grid-cols-2">
                  <div className="rounded-[1.25rem] bg-surface-2 p-4">
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-ink-soft">
                      <XCircle size={16} weight="fill" aria-hidden="true" /> Idée reçue
                    </p>
                    <p className="mt-1.5 leading-relaxed text-ink">{block.myth}</p>
                  </div>
                  <div className="rounded-[1.25rem] bg-rose-soft p-4 text-rose-ink">
                    <p className="flex items-center gap-1.5 text-sm font-semibold">
                      <CheckCircle size={16} weight="fill" aria-hidden="true" /> Selon{" "}
                      {getSourceById(block.sourceId)?.shortName ?? "la source"}
                    </p>
                    <p className="mt-1.5 leading-relaxed">{block.fact}</p>
                  </div>
                </div>
              );
          }
        })}
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {sources.map((s) => (
          <SourceBadge key={s.id} name={`${s.shortName}${s.documentTitle ? `, ${s.documentTitle}` : ""}`} url={s.url} />
        ))}
        {article.medicalReview === "pending" ? (
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs text-ink-soft">
            Relecture par un professionnel de santé en attente
          </span>
        ) : null}
      </div>

      {wolofVideo ? (
        <Link
          href={`/videos?language=wo`}
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-rose px-4 py-2 text-sm font-semibold text-on-rose"
        >
          <VideoCamera size={18} weight="fill" aria-hidden="true" />
          Comprendre en wolof
        </Link>
      ) : null}
    </section>
  );
}
