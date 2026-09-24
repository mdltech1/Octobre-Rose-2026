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

/** Rubrique « Comprendre en wolof » : vidéos publiées, ou bandeau d'attente tant qu'il n'y en a aucune. */
export function WolofSection({ published, inReview, frenchCount }: Props) {
  // Tant qu'aucune vidéo n'est publiée : bandeau court, sans compteur à zéro
  if (published.length === 0) {
    return (
      <section aria-labelledby="wolof-title" className="px-3 py-8 sm:px-5">
        <Reveal className="mx-auto flex max-w-[76rem] flex-col gap-6 rounded-[2rem] bg-rose-soft p-6 text-rose-ink sm:p-8 md:flex-row md:items-center md:justify-between md:p-10">
          <div className="flex gap-4 sm:gap-5">
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-rose text-on-rose" aria-hidden="true">
              <VideoCamera size={24} weight="fill" />
            </span>
            <div>
              <h2 id="wolof-title" className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                Comprendre en wolof
              </h2>
              <p className="mt-2 max-w-[60ch] leading-relaxed text-rose-ink/90">
                {WOLOF_EMPTY_MESSAGE}
                {inReview > 0 ? ` ${inReview} vidéo${inReview > 1 ? "s sont" : " est"} en cours de vérification.` : ""}
              </p>
            </div>
          </div>
          <ButtonLink href="/videos?language=fr" variant="ghost" icon={<ArrowRight size={15} weight="bold" />} className="self-start md:self-auto">
            {`Vidéos en français (${frenchCount})`}
          </ButtonLink>
        </Reveal>
      </section>
    );
  }

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
            Pour celles et ceux qui préfèrent une explication orale, dans leur langue.
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

        <ul className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {published.slice(0, 3).map((v) => (
            <li key={v.id}>
              <VideoCard video={v} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
