import { ArrowRight, MapPin, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";
import { SourceBadge } from "@/components/SourceBadge";
import { VideoPlayer } from "@/components/VideoPlayer";
import { siteConfig } from "@/lib/site";
import type { Video } from "@/types/content";

/** Héro asymétrique : message à gauche, vidéo réelle à droite. */
export function Hero({ featured, hasWolof }: { featured?: Video; hasWolof: boolean }) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 md:pb-24 md:pt-36"
    >
      {/* Halo discret */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 size-[34rem] rounded-full bg-rose-soft opacity-70 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.08fr_1fr] lg:gap-14">
        <div>
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
        </div>

        {featured ? (
          <div className="rise rise-4 relative isolate">
            {/* Plaques de couleur superposées (effet collage) */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-2 -bottom-4 top-8 -z-10 hidden rounded-[2.5rem] bg-rose md:-inset-x-4 md:block lg:-right-8 lg:left-10 lg:top-10 lg:-rotate-[4deg]"
            />
            <div
              aria-hidden="true"
              className="absolute -z-20 hidden rounded-[2.5rem] bg-deep lg:block lg:-right-2 lg:-top-6 lg:bottom-24 lg:left-24 lg:rotate-[5deg]"
            />
            <div className="bezel bg-paper/70 shadow-lift lg:rotate-[1.2deg]">
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
