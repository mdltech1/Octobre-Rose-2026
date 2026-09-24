import type { Metadata } from "next";
import Link from "next/link";
import { WifiSlash } from "@phosphor-icons/react/dist/ssr";
import { mainNav } from "@/lib/site";

// Page servie par le service worker (public/sw.js) quand une page n'est pas enregistrée.
export const metadata: Metadata = {
  title: "Hors ligne",
  robots: { index: false, follow: false },
};

export default function HorsLignePage() {
  return (
    <section className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-start justify-center px-4 pt-32 sm:px-6">
      <span className="grid size-14 place-items-center rounded-2xl bg-rose-soft text-rose-ink" aria-hidden="true">
        <WifiSlash size={28} weight="duotone" />
      </span>
      <h1 className="mt-6 font-display text-4xl font-semibold tracking-tight text-ink">Pas de connexion</h1>
      <p className="mt-3 max-w-[52ch] text-lg leading-relaxed text-ink-soft">
        Cette page n&apos;a pas encore été enregistrée sur votre appareil. Les pages déjà consultées restent
        lisibles sans connexion. Les vidéos, elles, demandent une connexion.
      </p>
      <nav aria-label="Pages de la plateforme" className="mt-8">
        <ul className="flex flex-wrap gap-2">
          {[{ href: "/", label: "Accueil" }, ...mainNav].map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="inline-flex min-h-11 items-center rounded-full bg-surface px-4 text-sm font-semibold text-ink ring-1 ring-line hover:ring-ink/30"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
