"use client";

import Link from "next/link";
import { useId, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bank,
  BookOpenText,
  CaretDown,
  ChartBar,
  Clock,
  Globe,
  Headphones,
  MapPin,
  MapTrifold,
  MagnifyingGlassPlus,
  PersonSimpleWalk,
  Phone,
  Quotes,
  Stethoscope,
} from "@phosphor-icons/react";
import { resourceTypeLabel } from "@/data/resources";
import { cn, hostname } from "@/lib/format";
import type { Event, Guide, InfoLink, Resource } from "@/types/content";

type ResolvedGuide = Guide & { resources: Resource[] };

interface Props {
  guides: ResolvedGuide[];
  infoLinks: InfoLink[];
  nextEvent?: Event;
  headingLevel?: "h2" | "h3";
  title?: string;
  intro?: string;
}

const guideIcons: Record<Guide["icon"], (size: number) => ReactNode> = {
  stethoscope: (s) => <Stethoscope size={s} weight="light" />,
  walk: (s) => <PersonSimpleWalk size={s} weight="light" />,
  bank: (s) => <Bank size={s} weight="light" />,
};

const infoIcons: Record<InfoLink["icon"], ReactNode> = {
  headphones: <Headphones size={24} weight="light" />,
  book: <BookOpenText size={24} weight="light" />,
  chart: <ChartBar size={24} weight="light" />,
  scan: <MagnifyingGlassPlus size={24} weight="light" />,
};

/**
 * « Où s'adresser, où s'informer ».
 * - S'adresser : la personne choisit son besoin, la réponse indique vers qui se tourner,
 *   avec des actions directes (appeler, site, carte) et le prochain événement si pertinent.
 *   Onglets sur grand écran, accordéon sur mobile.
 * - S'informer : tuiles vers des références fiables.
 */
export function ResourceGuide({
  guides,
  infoLinks,
  nextEvent,
  headingLevel = "h2",
  title = "Où s'adresser, où s'informer",
  intro = "Dites-nous ce que vous cherchez : nous vous indiquons vers qui vous tourner, et où trouver une information fiable.",
}: Props) {
  const [active, setActive] = useState(0);
  const tabs = useRef<Array<HTMLButtonElement | null>>([]);
  const uid = useId();
  const Heading = headingLevel;
  const g = guides[active];

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const last = guides.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = i === last ? 0 : i + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = i === 0 ? last : i - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="relative isolate overflow-hidden rounded-[2.5rem] bg-deep px-4 py-14 text-on-deep sm:px-8 md:px-12 md:py-20">
      {/* Champs de couleur diffus */}
      <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-40 -z-10 size-[36rem] rounded-full bg-rose opacity-30 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-48 -left-24 -z-10 size-[28rem] rounded-full bg-terra opacity-15 blur-3xl" />

      <Heading
        id={`${uid}-title`}
        className="max-w-[16ch] font-display text-[2.5rem] font-semibold leading-[1] tracking-[-0.035em] sm:text-6xl"
      >
        {title}
      </Heading>
      <p className="mt-5 max-w-[52ch] text-lg leading-relaxed text-on-deep/75">{intro}</p>

      {/* ---------- S'ADRESSER ---------- */}
      <div className="mt-12">
        <SubHeading id={`${uid}-need`} icon={<MapPin size={16} weight="bold" />}>
          Où s&apos;adresser : je...
        </SubHeading>

        {/* Mobile : accordéon, la réponse s'ouvre sous le besoin choisi */}
        <ul className="mt-5 grid gap-2.5 lg:hidden">
          {guides.map((item, i) => {
            const open = i === active;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-expanded={open}
                  aria-controls={`${uid}-m-${item.id}`}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-[1.4rem] p-3 pr-4 text-left transition-colors duration-500",
                    open ? "bg-on-deep text-deep" : "bg-on-deep/6 text-on-deep ring-1 ring-on-deep/10",
                  )}
                >
                  <NeedIcon guide={item} selected={open} />
                  <span className="flex-1 font-display text-lg font-medium leading-tight tracking-tight">{item.need}</span>
                  <CaretDown
                    size={18}
                    weight="bold"
                    aria-hidden="true"
                    className={cn("shrink-0 transition-transform duration-500", open ? "rotate-180" : "opacity-60")}
                  />
                </button>
                {open ? (
                  <div id={`${uid}-m-${item.id}`} className="mt-2.5">
                    <AnswerCard guide={item} nextEvent={nextEvent} />
                  </div>
                ) : null}
              </li>
            );
          })}
        </ul>

        {/* Grand écran : onglets + panneau */}
        <div className="mt-5 hidden gap-10 lg:grid lg:grid-cols-[0.8fr_1.2fr]">
          <div role="tablist" aria-labelledby={`${uid}-need`} aria-orientation="vertical" className="flex flex-col gap-2.5">
            {guides.map((item, i) => {
              const selected = i === active;
              return (
                <button
                  key={item.id}
                  ref={(el) => {
                    tabs.current[i] = el;
                  }}
                  id={`${uid}-tab-${item.id}`}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  aria-controls={`${uid}-panel`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(i)}
                  onKeyDown={(e) => onKeyDown(e, i)}
                  className={cn(
                    "group flex items-center gap-4 rounded-[1.6rem] p-3 pr-5 text-left transition-all duration-500 ease-[var(--ease-spring)]",
                    selected
                      ? "translate-x-2 bg-on-deep text-deep shadow-lift"
                      : "bg-on-deep/6 text-on-deep/80 ring-1 ring-on-deep/10 hover:bg-on-deep/10 hover:text-on-deep",
                  )}
                >
                  <NeedIcon guide={item} selected={selected} large />
                  <span className="flex-1 font-display text-[1.35rem] font-medium leading-tight tracking-tight">{item.need}</span>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-full transition-all duration-500 ease-[var(--ease-spring)]",
                      selected ? "bg-rose text-on-rose" : "-rotate-45 bg-on-deep/8 text-on-deep/60",
                    )}
                  >
                    <ArrowRight size={17} weight="bold" />
                  </span>
                </button>
              );
            })}
            <p className="mt-3 px-2 text-sm leading-relaxed text-on-deep/60">
              Cette plateforme ne pose pas de diagnostic. En cas de doute sur votre santé, un professionnel de santé
              reste votre premier interlocuteur.
            </p>
          </div>

          <div
            id={`${uid}-panel`}
            role="tabpanel"
            aria-labelledby={`${uid}-tab-${g.id}`}
            tabIndex={0}
            className="rounded-[2.1rem] bg-on-deep/8 p-1.5 ring-1 ring-on-deep/12 focus-visible:outline-deep-accent"
          >
            <AnswerCard key={g.id} guide={g} nextEvent={nextEvent} />
          </div>
        </div>
      </div>

      {/* ---------- S'INFORMER ---------- */}
      <div className="mt-16 border-t border-on-deep/12 pt-12">
        <SubHeading icon={<BookOpenText size={16} weight="bold" />}>Où s&apos;informer</SubHeading>
        {/* Mobile : rangée qui défile horizontalement ; grille dès sm */}
        <ul className="scroll-row -mx-4 mt-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
          {infoLinks.map((l, i) => (
            <li key={l.id} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <InfoTile link={l} featured={i === 0} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function SubHeading({ children, icon, id }: { children: ReactNode; icon: ReactNode; id?: string }) {
  return (
    <p id={id} className="flex items-center gap-2 text-sm font-semibold text-deep-accent">
      <span className="grid size-7 place-items-center rounded-full bg-deep-accent/15" aria-hidden="true">
        {icon}
      </span>
      {children}
    </p>
  );
}

function NeedIcon({ guide, selected, large = false }: { guide: Guide; selected: boolean; large?: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-2xl transition-colors duration-500",
        large ? "size-14" : "size-12",
        selected ? "bg-rose-soft text-rose-ink" : "bg-on-deep/8 text-deep-accent",
      )}
    >
      {guideIcons[guide.icon](large ? 28 : 24)}
    </span>
  );
}

function AnswerCard({ guide: g, nextEvent }: { guide: ResolvedGuide; nextEvent?: Event }) {
  return (
    <div className="swap-in h-full rounded-[1.75rem] bg-surface p-6 text-ink shadow-lift sm:p-9">
      <h3 className="max-w-[20ch] font-display text-[1.9rem] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-4xl">
        {g.title}
      </h3>
      <p className="mt-4 max-w-[58ch] text-[1.05rem] leading-relaxed text-ink-soft">{g.answer}</p>

      {g.quote ? (
        <figure className="mt-6 rounded-[1.4rem] bg-rose-soft p-5 text-rose-ink">
          <Quotes size={22} weight="fill" aria-hidden="true" />
          <blockquote className="mt-2 font-display text-xl font-medium leading-snug tracking-tight">« {g.quote.text} »</blockquote>
          <figcaption className="mt-2 text-sm">
            <a href={g.quote.url} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4">
              {g.quote.source}
              <span className="sr-only"> (nouvel onglet)</span>
            </a>
          </figcaption>
        </figure>
      ) : null}

      {g.showNextEvent && nextEvent ? <NextEvent event={nextEvent} /> : null}

      {g.resources.map((r) => (
        <ResourceSlip key={r.id} resource={r} />
      ))}

      {g.links.length ? (
        <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
          {g.links.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="group inline-flex items-center gap-2 text-[0.95rem] font-semibold text-ink">
                {l.label}
                <span
                  className="grid size-8 place-items-center rounded-full bg-surface-2 transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  <ArrowRight size={14} weight="bold" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** Prochain événement documenté, mis en avant dans la réponse. */
function NextEvent({ event }: { event: Event }) {
  const d = new Date(`${event.date}T00:00:00Z`);
  const day = d.getUTCDate();
  const month = new Intl.DateTimeFormat("fr-FR", { month: "short", timeZone: "UTC" }).format(d).replace(".", "");
  const weekday = new Intl.DateTimeFormat("fr-FR", { weekday: "long", timeZone: "UTC" }).format(d);
  return (
    <Link
      href="/evenements"
      className="group mt-6 grid grid-cols-[auto_1fr] items-center gap-4 sm:grid-cols-[auto_1fr_auto] rounded-[1.4rem] bg-rose p-3 pr-4 text-on-rose transition-transform duration-500 ease-[var(--ease-spring)] hover:-translate-y-0.5"
    >
      <span className="flex size-16 flex-col items-center justify-center rounded-2xl bg-on-rose/15 leading-none">
        <span className="font-display text-2xl font-semibold tabular-nums">{day}</span>
        <span className="mt-1 text-xs font-semibold">{month}</span>
      </span>
      <span className="min-w-0">
        <span className="block text-xs font-semibold opacity-85">Prochain rendez-vous</span>
        <span className="block font-display text-[1.05rem] font-semibold leading-snug tracking-tight">{event.title}</span>
        <span className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs opacity-90">
          <span className="capitalize">{weekday}</span>
          {event.time ? (
            <span className="inline-flex items-center gap-1">
              <Clock size={12} weight="bold" aria-hidden="true" />
              {event.time}
            </span>
          ) : null}
          {event.location ? (
            <span className="inline-flex items-center gap-1">
              <MapPin size={12} weight="bold" aria-hidden="true" />
              {event.location}
            </span>
          ) : null}
        </span>
      </span>
      <ArrowRight size={18} weight="bold" aria-hidden="true" className="hidden transition-transform duration-500 group-hover:translate-x-1 sm:block" />
    </Link>
  );
}

/** Fiche contact compacte avec actions directes. */
function ResourceSlip({ resource: r }: { resource: Resource }) {
  const tel = r.phone?.replace(/[^\d+]/g, "");
  const actions = [
    r.phone && tel
      ? { href: `tel:${tel}`, label: "Appeler", detail: r.phone, icon: <Phone size={18} weight="bold" />, external: false }
      : null,
    r.website
      ? { href: r.website, label: "Site web", detail: hostname(r.website), icon: <Globe size={18} weight="bold" />, external: true }
      : null,
    r.address
      ? {
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.address)}`,
          label: "Voir sur la carte",
          detail: r.address,
          icon: <MapTrifold size={18} weight="bold" />,
          external: true,
        }
      : null,
  ].filter((a): a is NonNullable<typeof a> => Boolean(a));

  return (
    <div className="mt-7 border-t border-line pt-6">
      <div className="flex flex-wrap items-center gap-2">
        <p className="font-display text-lg font-semibold tracking-tight">{r.name}</p>
        <span className="rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-semibold text-ink-soft">{resourceTypeLabel[r.type]}</span>
      </div>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {actions.map((a) => (
          <li key={a.label} className={cn(actions.length === 3 && a.label === "Voir sur la carte" && "sm:col-span-2")}>
            <a
              href={a.href}
              {...(a.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="group flex min-h-14 items-center gap-3 rounded-2xl bg-surface-2 px-4 py-2.5 transition-all duration-300 ease-[var(--ease-spring)] hover:bg-rose-soft active:scale-[0.98]"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-rose text-on-rose" aria-hidden="true">
                {a.icon}
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-semibold text-ink">{a.label}</span>
                <span className="block truncate text-xs text-ink-soft">{a.detail}</span>
              </span>
              {a.external ? <ArrowUpRight size={14} weight="bold" className="ml-auto shrink-0 text-ink-soft" aria-hidden="true" /> : null}
              {a.external ? <span className="sr-only"> (nouvel onglet)</span> : null}
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-xs leading-relaxed text-ink-soft">
        Informations publiées par{" "}
        <a href={r.sourceUrl} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-2">
          {r.sourceLabel}
        </a>
        {r.note ? `. ${r.note}` : "."}
      </p>
    </div>
  );
}

/** Tuile « Où s'informer ». */
function InfoTile({ link: l, featured }: { link: InfoLink; featured: boolean }) {
  const classes = cn(
    "group flex h-full min-h-[13.5rem] flex-col rounded-[1.6rem] p-5 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-1",
    featured ? "bg-deep-accent text-deep" : "bg-on-deep/6 text-on-deep ring-1 ring-on-deep/10 hover:bg-on-deep/10",
  );
  const content = (
    <>
      <span
        aria-hidden="true"
        className={cn(
          "grid size-11 place-items-center rounded-xl",
          featured ? "bg-deep/10" : "bg-on-deep/8 text-deep-accent",
        )}
      >
        {infoIcons[l.icon]}
      </span>
      <span className="mt-5 block font-display text-xl font-semibold leading-tight tracking-tight">{l.title}</span>
      <span className={cn("mt-2 block text-sm leading-relaxed", featured ? "text-deep/80" : "text-on-deep/70")}>
        {l.description}
      </span>
      <span className="mt-auto flex items-center justify-between gap-3 pt-5 text-sm font-semibold">
        <span>{l.external ? `${l.label}, ${hostname(l.href)}` : l.label}</span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-8 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
            featured ? "bg-deep text-deep-accent" : "bg-on-deep/10",
          )}
        >
          {l.external ? <ArrowUpRight size={14} weight="bold" /> : <ArrowRight size={14} weight="bold" />}
        </span>
      </span>
    </>
  );
  if (l.external) {
    return (
      <a href={l.href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
        <span className="sr-only"> (nouvel onglet)</span>
      </a>
    );
  }
  return (
    <Link href={l.href} className={classes}>
      {content}
    </Link>
  );
}
