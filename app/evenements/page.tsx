import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { EmptyState } from "@/components/EmptyState";
import { EventCard } from "@/components/EventCard";
import { PageHeader } from "@/components/PageHeader";
import { ShareButtons } from "@/components/ShareButtons";
import { getEvents } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Événements Octobre Rose au Sénégal",
  description:
    "Les événements Octobre Rose au Sénégal et à Dakar, uniquement lorsqu'ils sont annoncés par leur organisateur ou un média identifié.",
  path: "/evenements",
  keywords: ["Octobre Rose Dakar 2026", "marche Octobre Rose LISCA"],
});

// Régénère la page chaque jour : un événement passe automatiquement dans les éditions passées.
export const revalidate = 86400;

export default async function EvenementsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <>
      <PageHeader
        title="Événements"
        intro="Nous référençons uniquement les événements documentés par leur organisateur ou par un média identifié, avec un lien vers l'annonce."
      />
      <div className="mx-auto max-w-6xl space-y-16 px-4 sm:px-6">
        <section aria-labelledby="a-venir">
          <h2 id="a-venir" className="font-display text-3xl font-semibold tracking-tight text-ink">
            À venir
          </h2>
          <div className="mt-6 grid gap-4">
            {upcoming.length ? (
              upcoming.map((e) => <EventCard key={e.id} event={e} />)
            ) : (
              <EmptyState
                icon={<CalendarBlank size={24} weight="duotone" />}
                title="Aucun événement 2026 publié pour l'instant"
                description="Aucun événement Octobre Rose 2026 au Sénégal n'a encore été annoncé par une source vérifiable. Cette page sera mise à jour dès la publication du programme officiel."
              />
            )}
          </div>
        </section>

        {past.length ? (
          <section aria-labelledby="passes">
            <h2 id="passes" className="font-display text-3xl font-semibold tracking-tight text-ink">
              Éditions passées
            </h2>
            <div className="mt-6 grid gap-4">
              {past.map((e) => (
                <EventCard key={e.id} event={e} past />
              ))}
            </div>
          </section>
        ) : null}

        <section aria-labelledby="share-evt" className="rounded-[1.75rem] bg-surface p-6 ring-1 ring-line sm:p-8">
          <h2 id="share-evt" className="font-display text-2xl font-semibold tracking-tight text-ink">
            Vous organisez un événement ?
          </h2>
          <p className="mt-2 max-w-[62ch] leading-relaxed text-ink-soft">
            Transmettez l&apos;annonce publique (site, page officielle, article de presse) via{" "}
            <a href="https://www.mdltech.site/" target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
              mdltech.site
            </a>
            . Elle sera ajoutée après vérification.
          </p>
          <ShareButtons path="/evenements" className="mt-6" />
        </section>
      </div>
    </>
  );
}
