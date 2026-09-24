import Link from "next/link";
import { ArrowRight, Stethoscope, Eye, Heartbeat } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { ShareButtons } from "@/components/ShareButtons";
import { SourceBadge } from "@/components/SourceBadge";
import { VideoCard } from "@/components/VideoCard";
import { getEvents, getVideos } from "@/lib/content";
import { formatLongDate } from "@/lib/format";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dépistage du cancer du sein au Sénégal",
  description:
    "Dépistage et diagnostic précoce du cancer du sein : informations générales de l'OMS, signes qui doivent amener à consulter, actions de la LISCA pendant Octobre Rose au Sénégal.",
  path: "/depistage",
  keywords: ["mammographie Sénégal", "dépistage gratuit Octobre Rose Dakar"],
});

const OMS = "https://www.who.int/fr/news-room/fact-sheets/detail/breast-cancer";

// Régénération quotidienne : le texte sur le lancement passe du futur au passé après la date.
export const revalidate = 86400;

export default async function DepistagePage() {
  const [videos, events] = await Promise.all([getVideos({ category: "depistage" }), getEvents()]);
  // Événement d'ouverture : le premier de 2026 par date, qu'il soit passé ou à venir
  const campaign = [...events.past, ...events.upcoming]
    .filter((e) => e.date.startsWith("2026"))
    .sort((a, b) => a.date.localeCompare(b.date))[0];
  const campaignIsPast = campaign ? events.past.includes(campaign) : false;

  return (
    <>
      <PageHeader
        title="Dépistage du cancer du sein"
        intro="Informations générales issues de sources reconnues. Cette page n'évalue pas votre situation personnelle : seul un professionnel de santé peut le faire."
      >
        <MedicalDisclaimer className="max-w-3xl" />
      </PageHeader>

      <div className="mx-auto max-w-6xl space-y-24 px-4 sm:px-6">
        {/* Deux approches */}
        <section aria-labelledby="approches-title">
          <Reveal>
            <h2 id="approches-title" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Deux façons de détecter tôt
            </h2>
            <p className="mt-3 max-w-[60ch] text-lg leading-relaxed text-ink-soft">
              L&apos;OMS distingue le dépistage et le diagnostic précoce. Les deux ont le même objectif : trouver la
              maladie le plus tôt possible.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-[1.2fr_1fr]">
            <Reveal index={0} className="bezel">
              <div className="bezel-core h-full p-7 sm:p-9">
                <Heartbeat size={30} weight="light" className="text-rose" aria-hidden="true" />
                <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight text-ink">Le dépistage</h3>
                <p className="mt-3 leading-relaxed text-ink-soft">
                  « Recours à la mammographie dans une population apparemment en bonne santé. »
                </p>
                <SourceBadge name="OMS, aide-mémoire Cancer du sein" url={OMS} className="mt-5" />
              </div>
            </Reveal>
            <Reveal index={1} className="rounded-[2rem] bg-ink p-7 text-paper sm:p-9">
              <Eye size={30} weight="light" aria-hidden="true" />
              <h3 className="mt-5 font-display text-2xl font-semibold tracking-tight">Le diagnostic précoce</h3>
              <p className="mt-3 leading-relaxed text-paper/80">
                « Connaître les signes et symptômes du cancer du sein », pour consulter dès qu&apos;un changement
                apparaît.
              </p>
              <Link href="/comprendre#signes-et-symptomes" className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-paper underline underline-offset-4">
                Voir les signes listés par l&apos;OMS <ArrowRight size={14} weight="bold" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </section>

        {/* Quand consulter */}
        <section aria-labelledby="consulter-title" className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <Reveal>
            <Stethoscope size={34} weight="light" className="text-rose" aria-hidden="true" />
            <h2 id="consulter-title" className="mt-4 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Quand consulter ?
            </h2>
          </Reveal>
          <Reveal index={1}>
            <blockquote className="font-display text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl">
              « En cas de masse anormale dans le sein, même indolore, il faut consulter un médecin. »
            </blockquote>
            <p className="mt-5 max-w-[56ch] leading-relaxed text-ink-soft">
              L&apos;OMS rappelle aussi que la plupart des masses du sein ne sont pas cancéreuses. Consulter permet
              d&apos;être examinée et, si nécessaire, orientée vers des examens complémentaires.
            </p>
            <SourceBadge name="OMS" url={OMS} className="mt-5" />
          </Reveal>
        </section>

        {/* Au Sénégal */}
        <section aria-labelledby="senegal-title">
          <Reveal className="rounded-[2rem] bg-rose-soft p-7 text-rose-ink sm:p-10">
            <h2 id="senegal-title" className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Pendant Octobre Rose au Sénégal
            </h2>
            <p className="mt-4 max-w-[64ch] text-lg leading-relaxed">
              Lors d&apos;une précédente campagne Octobre Rose, la Ligue Sénégalaise Contre le Cancer (LISCA) a indiqué
              avoir examiné plus de 3 500 femmes dans plusieurs localités du pays, selon le Ministère de la Santé.
            </p>
            <p className="mt-3 max-w-[64ch] leading-relaxed">
              {campaign
                ? `${campaign.organizer} ${campaignIsPast ? "a ouvert" : "ouvre"} la campagne 2026 le ${formatLongDate(campaign.date)}, avec la « ${campaign.title} ». `
                : ""}
              Les autres actions seront ajoutées à la page Événements dès leur annonce officielle.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ButtonLink href="/evenements" variant="secondary" icon={<ArrowRight size={15} weight="bold" />}>
                Événements
              </ButtonLink>
              <ButtonLink href="/ressources" variant="ghost">
                Contacts utiles
              </ButtonLink>
            </div>
            <SourceBadge
              name="Ministère de la Santé du Sénégal"
              url="https://www.sante.gouv.sn/Actualites/octobre-rose%E2%80%99%E2%80%99-jusque-l%C3%A0-permis-d%E2%80%99examiner-plus-de-3500-femmes%E2%80%99%E2%80%99-pr%C3%A9sidente-lisca"
              className="mt-6"
            />
          </Reveal>
        </section>

        {/* Vidéo */}
        {videos.length ? (
          <section aria-labelledby="video-depistage-title">
            <h2 id="video-depistage-title" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              En vidéo
            </h2>
            <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {videos.map((v) => (
                <li key={v.id}>
                  <VideoCard video={v} />
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section aria-labelledby="share-depistage" className="rounded-[1.75rem] bg-surface p-6 ring-1 ring-line sm:p-8">
          <h2 id="share-depistage" className="font-display text-2xl font-semibold tracking-tight text-ink">
            Partager cette page
          </h2>
          <ShareButtons path="/depistage" text="Dépistage du cancer du sein : les informations essentielles" className="mt-5" />
        </section>
      </div>
    </>
  );
}
