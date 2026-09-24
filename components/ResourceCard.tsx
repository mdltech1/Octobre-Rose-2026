import { ArrowUpRight, Envelope, Globe, MapPin, Phone } from "@phosphor-icons/react/dist/ssr";
import { resourceTypeLabel } from "@/data/resources";
import { formatShortDate, hostname } from "@/lib/format";
import type { Resource } from "@/types/content";

const countryLabel: Record<Resource["country"], string> = {
  SN: "Sénégal",
  INT: "International",
  FR: "France",
};

/** Carte ressource : n'affiche que les champs renseignés et vérifiés. */
export function ResourceCard({ resource }: { resource: Resource }) {
  const tel = resource.phone?.replace(/[^\d+]/g, "");
  return (
    <article className="bezel relative h-full" aria-labelledby={`${resource.id}-title`}>
      <div className="bezel-core flex h-full flex-col p-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
          <span className="rounded-full bg-rose-soft px-2.5 py-1 text-rose-ink">{resourceTypeLabel[resource.type]}</span>
          <span className="rounded-full border border-line px-2.5 py-1 text-ink-soft">{countryLabel[resource.country]}</span>
        </div>
        <h3 id={`${resource.id}-title`} className="mt-4 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
          {resource.name}
        </h3>
        <p className="mt-2 leading-relaxed text-ink-soft">{resource.description}</p>

        <dl className="mt-5 grid gap-2.5 text-[0.95rem]">
          {resource.website ? (
            <div className="flex items-start gap-2.5">
              <dt className="sr-only">Site web</dt>
              <Globe size={18} className="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
              <dd>
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rose"
                >
                  {hostname(resource.website)}
                  <span className="sr-only"> (nouvel onglet)</span>
                </a>
              </dd>
            </div>
          ) : null}
          {resource.phone && tel ? (
            <div className="flex items-start gap-2.5">
              <dt className="sr-only">Téléphone</dt>
              <Phone size={18} className="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
              <dd>
                <a href={`tel:${tel}`} className="font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rose">
                  {resource.phone}
                </a>
              </dd>
            </div>
          ) : null}
          {resource.email ? (
            <div className="flex items-start gap-2.5">
              <dt className="sr-only">E-mail</dt>
              <Envelope size={18} className="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
              <dd>
                <a href={`mailto:${resource.email}`} className="font-semibold text-ink underline decoration-line underline-offset-4">
                  {resource.email}
                </a>
              </dd>
            </div>
          ) : null}
          {resource.address ? (
            <div className="flex items-start gap-2.5">
              <dt className="sr-only">Adresse</dt>
              <MapPin size={18} className="mt-0.5 shrink-0 text-rose" aria-hidden="true" />
              <dd className="text-ink">{resource.address}</dd>
            </div>
          ) : null}
        </dl>

        {resource.note ? <p className="mt-4 text-sm leading-relaxed text-ink-soft">{resource.note}</p> : null}

        <div className="mt-auto pt-6" />
        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-line pt-4 text-xs text-ink-soft">
          <a
            href={resource.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-ink-soft hover:text-ink"
          >
            Source : {resource.sourceLabel}
            <ArrowUpRight size={12} weight="bold" aria-hidden="true" />
            <span className="sr-only"> (nouvel onglet)</span>
          </a>
          <span>Vérifié le {formatShortDate(resource.verifiedAt)}</span>
        </div>
      </div>
    </article>
  );
}
