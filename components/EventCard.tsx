import { ArrowUpRight, Clock, MapPin, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { cn, formatLongDate } from "@/lib/format";
import type { Event } from "@/types/content";

export function EventCard({ event, past = false }: { event: Event; past?: boolean }) {
  const d = new Date(`${event.date}T00:00:00Z`);
  const day = d.getUTCDate();
  const month = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" }).format(d).replace(".", "");
  const year = d.getUTCFullYear();

  return (
    <article
      aria-labelledby={`${event.id}-title`}
      className="grid grid-cols-[auto_1fr] gap-5 rounded-[1.75rem] bg-surface p-5 ring-1 ring-line sm:gap-7 sm:p-7"
    >
      <div
        className={cn(
          "flex w-20 flex-col items-center justify-center self-start rounded-[1.25rem] py-3 text-center sm:w-24",
          past ? "bg-surface-2 text-ink-soft" : "bg-rose text-on-rose",
        )}
      >
        <span className="font-display text-3xl font-semibold leading-none tabular-nums">{day}</span>
        <span className="mt-1 text-sm font-semibold">{month}</span>
        <span className="text-xs opacity-80">{year}</span>
      </div>
      <div className="min-w-0">
        {past ? (
          <span className="rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-ink-soft">Édition passée</span>
        ) : null}
        <h3 id={`${event.id}-title`} className="mt-2 font-display text-xl font-semibold leading-snug tracking-tight text-ink">
          {event.title}
        </h3>
        <p className="mt-1 text-sm text-ink-soft first-letter:uppercase">
          <time dateTime={event.date}>{formatLongDate(event.date)}</time>
        </p>
        <p className="mt-3 max-w-[62ch] leading-relaxed text-ink-soft">{event.description}</p>
        <ul className="mt-4 grid gap-1.5 text-sm text-ink">
          <li className="flex items-center gap-2">
            <UsersThree size={16} className="text-rose" aria-hidden="true" />
            <span>
              <span className="sr-only">Organisateur : </span>
              {event.organizer}
            </span>
          </li>
          {event.time ? (
            <li className="flex items-center gap-2">
              <Clock size={16} className="text-rose" aria-hidden="true" />
              <span>
                <span className="sr-only">Horaire : </span>
                {event.time}
              </span>
            </li>
          ) : null}
          <li className="flex items-center gap-2">
            <MapPin size={16} className="text-rose" aria-hidden="true" />
            {event.location ? (
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.location)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline decoration-line underline-offset-4 hover:decoration-rose"
              >
                {event.location}
                <span className="sr-only"> (voir sur la carte, nouvel onglet)</span>
              </a>
            ) : (
              <span>Lieu exact non précisé par la source</span>
            )}
          </li>
        </ul>
        <a
          href={event.sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rose"
        >
          Source : {event.sourceName}
          <ArrowUpRight size={13} weight="bold" aria-hidden="true" />
          <span className="sr-only"> (nouvel onglet)</span>
        </a>
      </div>
    </article>
  );
}
