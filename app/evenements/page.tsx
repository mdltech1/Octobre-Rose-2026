import { CalendarBlank } from "@phosphor-icons/react/dist/ssr";
import { EmptyState } from "@/components/EmptyState";
import { EventCard } from "@/components/EventCard";
import { JsonLd } from "@/components/JsonLd";
import { PageHeader } from "@/components/PageHeader";
import { ShareButtons } from "@/components/ShareButtons";
import { getEvents } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, whatsappContactUrl } from "@/lib/site";
import type { Event } from "@/types/content";

export const metadata = pageMetadata({
  title: "Événements Octobre Rose au Sénégal",
  description:
    "Les événements Octobre Rose au Sénégal et à Dakar, uniquement lorsqu'ils sont annoncés par leur organisateur ou un média identifié.",
  path: "/evenements",
  keywords: ["Octobre Rose Dakar 2026", "marche Octobre Rose LISCA"],
});

// Régénère la page chaque jour : un événement passe automatiquement dans les éditions passées.
export const revalidate = 86400;

/** Données structurées schema.org d'un événement (résultats enrichis des moteurs de recherche). */
function eventJsonLd(e: Event) {
  return {
    "@type": "Event",
    name: e.title,
    startDate: e.date,
    description: e.description,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(e.location
      ? { location: { "@type": "Place", name: e.location, address: { "@type": "PostalAddress", addressCountry: "SN" } } }
      : {}),
    organizer: { "@type": "Organization", name: e.organizer },
    url: e.sourceUrl,
  };
}

export default async function EvenementsPage() {
  const { upcoming, past } = await getEvents();

  return (
    <>
      {upcoming.length ? (
        <JsonLd data={{ "@context": "https://schema.org", "@graph": upcoming.map(eventJsonLd) }} />
      ) : null}
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
            Transmettez le lien de l&apos;annonce publique (site, page officielle, article de presse) sur WhatsApp au{" "}
            <a
              href={whatsappContactUrl("Bonjour, je souhaite signaler un événement Octobre Rose : ")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline underline-offset-4"
            >
              {siteConfig.contact.whatsappLabel}
              <span className="sr-only"> (WhatsApp, nouvel onglet)</span>
            </a>
            . Il sera ajouté après vérification.
          </p>
          <ShareButtons path="/evenements" className="mt-6" />
        </section>
      </div>
    </>
  );
}
