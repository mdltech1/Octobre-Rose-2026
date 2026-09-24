import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-start justify-center px-4 pt-32 sm:px-6">
      <p className="font-display text-7xl font-semibold tracking-[-0.05em] text-rose">404</p>
      <h1 className="mt-4 font-display text-4xl font-semibold tracking-tight text-ink">Cette page n&apos;existe pas</h1>
      <p className="mt-3 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
        Le lien est peut-être incomplet. Retrouvez les informations essentielles depuis l&apos;accueil.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <ButtonLink href="/" variant="secondary" icon={<ArrowRight size={15} weight="bold" />}>
          Accueil
        </ButtonLink>
        <ButtonLink href="/comprendre" variant="ghost">
          Comprendre
        </ButtonLink>
      </div>
    </section>
  );
}
