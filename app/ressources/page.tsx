import { PageHeader } from "@/components/PageHeader";
import { ResourceGuide } from "@/components/ResourceGuide";
import { ResourceList } from "@/components/ResourceList";
import { ShareButtons } from "@/components/ShareButtons";
import { getEvents, getGuides, getInfoLinks, getResources } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { siteConfig, whatsappContactUrl } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Ressources et contacts utiles",
  description:
    "LISCA, Ministère de la Santé du Sénégal, OMS, CIRC : les organismes à connaître sur le cancer du sein, avec des coordonnées vérifiées et leur source.",
  path: "/ressources",
  keywords: ["LISCA contact", "association cancer du sein Dakar"],
});

// Régénération quotidienne (prochain événement)
export const revalidate = 86400;

export default async function RessourcesPage() {
  const [resources, guides, infoLinks, events] = await Promise.all([
    getResources(),
    getGuides(),
    getInfoLinks(),
    getEvents(),
  ]);
  return (
    <>
      <PageHeader
        title="Ressources et contacts"
        intro="Chaque fiche n'affiche que des informations publiées par une source identifiable, indiquée en bas de carte. Avant tout déplacement, confirmez les informations auprès de l'organisme."
      />
      <div className="mx-auto mb-20 max-w-[76rem] px-3 sm:px-5">
        <ResourceGuide guides={guides} infoLinks={infoLinks} nextEvent={events.upcoming[0]} title="Vers qui se tourner ?" />
      </div>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-8 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Toutes les ressources</h2>
        <ResourceList resources={resources} />
        <div className="mt-16 rounded-[1.75rem] bg-surface p-6 ring-1 ring-line sm:p-8">
          <p className="font-display text-2xl font-semibold tracking-tight text-ink">Vous représentez un organisme ?</p>
          <p className="mt-2 max-w-[64ch] leading-relaxed text-ink-soft">
            Pour ajouter ou corriger une ressource, écrivez sur WhatsApp au{" "}
            <a
              href={whatsappContactUrl("Bonjour, je souhaite ajouter ou corriger une ressource : ")}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-ink underline underline-offset-4"
            >
              {siteConfig.contact.whatsappLabel}
              <span className="sr-only"> (WhatsApp, nouvel onglet)</span>
            </a>{" "}
            en indiquant une source publique qui confirme les informations.
          </p>
          <ShareButtons path="/ressources" text="Ressources fiables sur le cancer du sein au Sénégal" className="mt-6" />
        </div>
      </div>
    </>
  );
}
