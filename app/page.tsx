import Link from "next/link";
import { ArrowRight, ArrowUpRight, CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { AccessModes } from "@/components/AccessModes";
import { ArticleCard } from "@/components/ArticleCard";
import { ButtonLink } from "@/components/ButtonLink";
import { EmptyState } from "@/components/EmptyState";
import { EventCard } from "@/components/EventCard";
import { Hero } from "@/components/Hero";
import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { ResourceGuide } from "@/components/ResourceGuide";
import { Reveal } from "@/components/Reveal";
import { ShareButtons } from "@/components/ShareButtons";
import { WolofSection } from "@/components/WolofSection";
import {
  countVideosInReview,
  getArticles,
  getEvents,
  getGuides,
  getInfoLinks,
  getSourcesByIds,
  getSourceUrl,
  getVideoById,
  getVideos,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

// Régénération quotidienne (événements à venir / passés)
export const revalidate = 86400;

const GLOBOCAN = getSourceUrl("circ-globocan-senegal");
const DAKARACTU = getSourceUrl("dakaractu-marche-2025");

export default async function HomePage() {
  const [articles, wolofVideos, frVideos, wolofInReview, events, featured, inca, guides, infoLinks] = await Promise.all([
    getArticles(),
    getVideos({ language: "wo" }),
    getVideos({ language: "fr" }),
    countVideosInReview("wo"),
    getEvents(),
    getVideoById("video-003"),
    getVideoById("video-001"),
    getGuides(),
    getInfoLinks(),
  ]);

  const bySlug = (slug: string) => articles.find((a) => a.slug === slug);
  const bento = [
    { a: bySlug("quest-ce-que"), variant: "feature" as const, cls: "md:col-span-2 md:row-span-2" },
    { a: bySlug("pourquoi-en-parler"), variant: "tint" as const, cls: "" },
    { a: bySlug("signes-et-symptomes"), variant: "default" as const, cls: "" },
    { a: bySlug("facteurs-de-risque"), variant: "default" as const, cls: "" },
    { a: bySlug("idees-recues"), variant: "default" as const, cls: "" },
  ].filter((x) => x.a);

  const signsBlock = bySlug("signes-et-symptomes")?.blocks.find((b) => b.type === "list");
  const signs = signsBlock && signsBlock.type === "list" ? signsBlock.items : [];

  const nextEvent = events.upcoming[0];
  const lastEvent = events.past[0];

  const stats = [
    {
      value: "2 220",
      label: "nouveaux cas de cancer du sein estimés chaque année au Sénégal, soit 15,5 % des nouveaux cancers.",
      source: "CIRC, GLOBOCAN 2024",
      url: GLOBOCAN,
      tone: "rose",
    },
    {
      value: "1 041",
      label: "décès estimés par an liés au cancer du sein.",
      source: "CIRC, GLOBOCAN 2024",
      url: GLOBOCAN,
      tone: "ink",
    },
    {
      value: "70 %",
      label: "des patientes arrivent à un stade avancé, selon la présidente de la LISCA.",
      source: "Dakaractu, septembre 2025",
      url: DAKARACTU,
      tone: "ink",
    },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          inLanguage: "fr-SN",
          description: siteConfig.description,
          // Autrice et éditrice : une personne, MdlTech étant sa marque de freelance
          publisher: {
            "@type": "Person",
            name: siteConfig.author.name,
            jobTitle: siteConfig.author.role,
            url: siteConfig.brand.url,
            brand: { "@type": "Brand", name: siteConfig.brand.name },
          },
        }}
      />

      <Hero featured={featured} hasWolof={wolofVideos.length > 0} nextEvent={nextEvent} />

      {/* ACCESSIBILITÉ : démonstration interactive */}
      <section aria-labelledby="acces-title" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
        <Reveal>
          <h2
            id="acces-title"
            className="max-w-[20ch] font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-6xl"
          >
            Tout le monde ne reçoit pas l&apos;information de la même manière.
          </h2>
        </Reveal>
        <Reveal index={1} className="mt-12">
          <AccessModes
            signs={signs}
            listenText="En cas de masse anormale dans le sein, même indolore, il faut consulter un médecin. La plupart des masses de ce type ne sont pas cancéreuses."
            video={inca}
            sources={getSourcesByIds(["oms-cancer-sein", "circ-globocan-senegal", "lisca"])}
          />
        </Reveal>
      </section>

      {/* OÙ S'ADRESSER, OÙ S'INFORMER : orienteur */}
      <section id="ou-s-adresser" aria-label="Où s'adresser, où s'informer" className="scroll-mt-24 px-3 py-8 sm:px-5">
        <Reveal className="mx-auto max-w-[76rem]">
          <ResourceGuide guides={guides} infoLinks={infoLinks} nextEvent={events.upcoming[0]} />
        </Reveal>
        <div className="mx-auto mt-6 flex max-w-[76rem] justify-end px-2">
          <Link
            href="/ressources"
            className="inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rose"
          >
            Toutes les ressources et contacts <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* COMPRENDRE (bento) */}
      <section aria-labelledby="comprendre-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-24">
        <Reveal>
          <h2 id="comprendre-title" className="font-display text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            Comprendre, sans jargon
          </h2>
          <p className="mt-4 max-w-[56ch] text-lg leading-relaxed text-ink-soft">
            Des fiches courtes, chacune reliée à sa source, pour savoir de quoi on parle.
          </p>
        </Reveal>
        {/* Mobile : rangée qui défile horizontalement (la carte suivante dépasse pour inviter au geste).
            Dès md : grille bento. Une seule apparition pour la rangée, pour ne pas masquer les cartes hors écran. */}
        <Reveal className="scroll-row -mx-4 mt-8 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 md:mx-0 md:mt-10 md:grid md:auto-rows-[minmax(15rem,auto)] md:grid-cols-4 md:gap-4 md:overflow-visible md:px-0 md:pb-0">
          {bento.map(({ a, variant, cls }) => (
            <div key={a!.id} className={`w-[82%] shrink-0 snap-start md:w-auto ${cls}`}>
              <ArticleCard
                article={a!}
                variant={variant}
                sourceNames={getSourcesByIds(a!.sourceIds).map((s) => s.shortName)}
              />
            </div>
          ))}
        </Reveal>
        <div className="mt-8">
          <ButtonLink href="/comprendre" variant="ghost" icon={<ArrowRight size={15} weight="bold" />}>
            Toutes les fiches
          </ButtonLink>
        </div>
      </section>

      {/* VIDÉOS EN WOLOF */}
      <WolofSection published={wolofVideos} inReview={wolofInReview} frenchCount={frVideos.length} />

      {/* CHIFFRES SOURCÉS */}
      <section aria-labelledby="chiffres-title" className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-28">
        <Reveal>
          <h2 id="chiffres-title" className="font-display text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            Pourquoi en parler au Sénégal
          </h2>
        </Reveal>
        <dl className="mt-10 grid gap-8 md:mt-14 md:grid-cols-[1.3fr_1fr_1fr] md:gap-10">
          {stats.map((s, i) => (
            <Reveal
              key={s.value}
              index={i}
              className={`flex flex-col border-t-2 pt-5 md:pt-6 ${i === 0 ? "border-rose" : "border-ink/15"} ${i === 1 ? "md:mt-16" : ""} ${i === 2 ? "md:mt-32" : ""}`}
            >
              <dt className="order-2 mt-4 max-w-[32ch] leading-relaxed text-ink-soft">{s.label}</dt>
              <dd
                className={`font-display font-semibold leading-[0.9] tracking-[-0.05em] tabular-nums ${
                  s.tone === "rose" ? "text-[4.5rem] text-rose sm:text-[7.5rem]" : "text-6xl text-ink sm:text-7xl"
                }`}
              >
                {s.value}
              </dd>
              <dd className="order-3 mt-3">
                <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rose">
                  {s.source}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </dd>
            </Reveal>
          ))}
        </dl>
      </section>

      {/* DÉPISTAGE */}
      <section aria-labelledby="depistage-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 id="depistage-title" className="font-display text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
              Détecter tôt change les choses
            </h2>
            <p className="mt-5 max-w-[48ch] text-lg leading-relaxed text-ink-soft">
              Selon l&apos;OMS, la détection et le traitement précoces permettent de réduire la mortalité liée au cancer
              du sein.
            </p>
            <div className="mt-8">
              <ButtonLink href="/depistage" variant="secondary" icon={<ArrowRight size={15} weight="bold" />}>
                Le dépistage
              </ButtonLink>
            </div>
          </Reveal>
          <div className="grid gap-4">
            <Reveal index={1} className="bezel">
              <div className="bezel-core p-6 sm:p-7">
                <p className="font-display text-2xl font-semibold tracking-tight text-ink">Le dépistage</p>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  Le recours à la mammographie dans une population apparemment en bonne santé.
                </p>
              </div>
            </Reveal>
            <Reveal index={2} className="bezel">
              <div className="bezel-core p-6 sm:p-7">
                <p className="font-display text-2xl font-semibold tracking-tight text-ink">Le diagnostic précoce</p>
                <p className="mt-2 leading-relaxed text-ink-soft">
                  Connaître les signes et symptômes du cancer du sein, pour consulter sans attendre.
                </p>
              </div>
            </Reveal>
            <Reveal index={3}>
              <MedicalDisclaimer compact />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ÉVÉNEMENTS */}
      <section aria-labelledby="evenements-title" className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-24">
        <Reveal>
          <h2 id="evenements-title" className="font-display text-4xl font-semibold tracking-[-0.035em] text-ink sm:text-6xl">
            Événements
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          <Reveal index={0} className={lastEvent ? "" : "lg:col-span-2"}>
            {nextEvent ? (
              <EventCard event={nextEvent} />
            ) : (
              <EmptyState
                className="h-full"
                icon={<CalendarBlank size={24} weight="duotone" />}
                title="Programme 2026 : pas encore annoncé"
                description="Aucun événement Octobre Rose 2026 au Sénégal n'a encore été publié par une source vérifiable. Les annonces officielles seront ajoutées ici dès leur publication."
              />
            )}
          </Reveal>
          {lastEvent ? (
            <Reveal index={1}>
              <EventCard event={lastEvent} past />
            </Reveal>
          ) : null}
        </div>
        <Link
          href="/evenements"
          className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rose"
        >
          Voir la page Événements <ArrowUpRight size={14} weight="bold" aria-hidden="true" />
        </Link>
      </section>

      {/* PARTAGE */}
      <section aria-labelledby="partage-title" className="px-3 pb-8 pt-8 sm:px-5">
        <Reveal className="relative isolate mx-auto max-w-[76rem] overflow-hidden rounded-[2.5rem] bg-rose px-6 py-16 text-center text-on-rose md:px-12 md:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-on-rose opacity-15 blur-3xl"
          />
          <h2 id="partage-title" className="mx-auto max-w-[20ch] font-display text-4xl font-semibold leading-[1.02] tracking-[-0.035em] sm:text-6xl">
            Une information partagée peut en encourager une autre à consulter.
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-lg leading-relaxed opacity-90">
            Envoyez la plateforme à une mère, une sœur, une amie, un collègue.
          </p>
          <ShareButtons path="/" tone="rose" className="mt-10 justify-center" />
        </Reveal>
      </section>
    </>
  );
}
