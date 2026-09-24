import { ArrowRight, VideoCamera } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";
import { Reveal } from "@/components/Reveal";
import { VideoCard } from "@/components/VideoCard";
import { WOLOF_EMPTY_MESSAGE } from "@/lib/messages";
import type { Video } from "@/types/content";

interface Props {
  published: Video[];
  inReview: number;
  frenchCount: number;
}

/** Rubrique « Comprendre en wolof » : vidéos publiées, ou état du référencement. */
export function WolofSection({ published, inReview, frenchCount }: Props) {
  const pipeline = [
    { verb: "Repérées", value: published.length + inReview, text: "vidéos en wolof identifiées" },
    { verb: "En vérification", value: inReview, text: "auteur en cours d'identification" },
    { verb: "Publiées", value: published.length, text: "vidéos de sources fiables" },
  ];

  return (
    <section aria-labelledby="wolof-title" className="px-3 py-8 sm:px-5">
      <div className="relative isolate mx-auto max-w-[76rem] overflow-hidden rounded-[2.5rem] bg-rose-soft px-5 py-14 sm:px-8 md:px-12 md:py-20">
        {/* Grand mot en contour, purement typographique */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.18em] -right-[0.04em] -z-10 select-none font-display text-[38vw] font-bold leading-none tracking-[-0.06em] text-transparent opacity-40 [-webkit-text-stroke:1.5px_var(--rose)] lg:text-[22rem]"
        >
          Wolof
        </span>

        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <Reveal>
            <span className="grid size-14 place-items-center rounded-2xl bg-rose text-on-rose" aria-hidden="true">
              <VideoCamera size={28} weight="fill" />
            </span>
            <h2
              id="wolof-title"
              className="mt-6 font-display text-[2.6rem] font-semibold leading-[1] tracking-[-0.035em] text-rose-ink sm:text-6xl"
            >
              Comprendre en wolof
            </h2>
            <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-rose-ink/90">
              Pour celles et ceux qui préfèrent une explication orale, dans leur langue. {published.length === 0 ? WOLOF_EMPTY_MESSAGE : ""}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/videos?language=wo" icon={<ArrowRight size={15} weight="bold" />}>
                La rubrique wolof
              </ButtonLink>
              <ButtonLink href="/videos?language=fr" variant="ghost">
                {`En français (${frenchCount})`}
              </ButtonLink>
            </div>
          </Reveal>

          {published.length === 0 ? (
            <Reveal index={1} className="rounded-[2rem] bg-paper/80 p-2 ring-1 ring-rose/15">
              <div className="rounded-[1.6rem] bg-surface p-6 sm:p-7">
                <p className="text-sm font-semibold text-ink">Où en est le référencement</p>
                <ul className="mt-5 grid gap-4">
                  {pipeline.map((p) => (
                    <li key={p.verb} className="flex items-center gap-4">
                      <span
                        className={
                          p.value > 0
                            ? "grid size-14 shrink-0 place-items-center rounded-2xl bg-rose font-display text-2xl font-semibold text-on-rose tabular-nums"
                            : "grid size-14 shrink-0 place-items-center rounded-2xl bg-surface-2 font-display text-2xl font-semibold text-ink-soft tabular-nums"
                        }
                      >
                        {p.value}
                      </span>
                      <span>
                        <span className="block font-display text-lg font-semibold tracking-tight text-ink">{p.verb}</span>
                        <span className="block text-sm text-ink-soft">{p.text}</span>
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="mt-6 border-t border-line pt-4 text-sm leading-relaxed text-ink-soft">
                  Une vidéo n&apos;est publiée que si son auteur est identifié : institution, association reconnue ou
                  professionnel de santé.
                </p>
              </div>
            </Reveal>
          ) : null}
        </div>

        {published.length > 0 ? (
          <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {published.slice(0, 3).map((v) => (
              <li key={v.id}>
                <VideoCard video={v} />
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}
