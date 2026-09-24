import Link from "next/link";
import { ArrowRight, MapPin, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";
import { RibbonMark } from "@/components/RibbonMark";
import { SourceBadge } from "@/components/SourceBadge";
import { VideoPlayer } from "@/components/VideoPlayer";
import { formatLongDate } from "@/lib/format";
import { siteConfig } from "@/lib/site";
import type { Event, Video } from "@/types/content";

/** Héro asymétrique : message à gauche, vidéo réelle à droite. */
export function Hero({ featured, hasWolof, nextEvent }: { featured?: Video; hasWolof: boolean; nextEvent?: Event }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-4 pb-10 pt-28 sm:px-6 md:pb-24 md:pt-36"
    >
      {/* Halo discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-rose-soft opacity-70 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
        <div>
          {/* Signature : le ruban se trace une fois au chargement */}
          <RibbonMark animated className="mb-5 h-12 w-auto text-rose sm:mb-6 sm:h-20" />
          <h1 id="hero-title" className="rise font-display font-semibold tracking-[-0.04em] text-ink">
            <span className="block text-[3.1rem] leading-[0.95] sm:text-7xl lg:text-[5.4rem]">Octobre Rose 2026</span>
            <span className="mt-4 block text-2xl leading-tight tracking-[-0.02em] text-rose sm:text-3xl">
              {siteConfig.tagline}
            </span>
          </h1>
          <p className="rise rise-2 mt-6 max-w-[46ch] text-lg leading-relaxed text-ink-soft">
            Une initiative digitale indépendante pour faciliter l&apos;accès à des informations et ressources fiables
            sur le cancer du sein au Sénégal.
          </p>
          <div className="rise rise-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/comprendre" variant="secondary" icon={<ArrowRight size={16} weight="bold" />}>
              Comprendre
            </ButtonLink>
            {/* Le lien wolof n'est proposé que si au moins une vidéo en wolof est publiée */}
            {hasWolof ? (
              <ButtonLink href="/videos?language=wo" icon={<VideoCamera size={17} weight="fill" />}>
                Voir les vidéos en wolof
              </ButtonLink>
            ) : (
              <ButtonLink href="/#ou-s-adresser" icon={<MapPin size={17} weight="fill" />}>
                Où s&apos;adresser
              </ButtonLink>
            )}
          </div>

          {/* Prochain rendez-vous documenté (page régénérée chaque jour) */}
          {nextEvent ? (
            <Link
              href="/evenements"
              className="rise rise-4 group mt-6 flex w-fit max-w-full items-center gap-3 rounded-full bg-surface py-1.5 pl-1.5 pr-4 ring-1 ring-line shadow-soft transition-shadow hover:ring-rose/40"
            >
              <span className="relative grid size-9 shrink-0 place-items-center rounded-full bg-rose-soft" aria-hidden="true">
                <span className="absolute size-2.5 rounded-full bg-rose opacity-60 motion-safe:animate-ping" />
                <span className="size-2.5 rounded-full bg-rose" />
              </span>
              <span className="min-w-0 text-sm leading-snug">
                <span className="block font-semibold text-ink first-letter:uppercase">
                  Prochain rendez-vous : {formatLongDate(nextEvent.date)}
                </span>
                <span className="block truncate text-ink-soft">{nextEvent.title}</span>
              </span>
              <ArrowRight size={15} weight="bold" className="shrink-0 text-ink-soft transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </Link>
          ) : null}
        </div>

        {featured ? (
          <div className="rise rise-4 relative isolate">
            {/* Plaque rose décalée derrière la vidéo (grands écrans) */}
            <div
              aria-hidden="true"
              className="absolute -z-10 hidden rounded-[2.5rem] bg-rose md:block md:-bottom-4 md:-right-4 md:left-8 md:top-8"
            />
            <div className="bezel bg-paper/70 shadow-lift">
              <div className="bezel-core p-2">
                <VideoPlayer video={featured} priority />
                <div className="flex flex-col gap-2 px-3 pb-2 pt-3.5">
                  <p className="line-clamp-2 font-display text-[1.05rem] font-semibold leading-snug tracking-tight text-ink">
                    {featured.title}
                  </p>
                  <SourceBadge name={featured.sourceName} url={featured.sourceUrl} className="self-start" />
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
