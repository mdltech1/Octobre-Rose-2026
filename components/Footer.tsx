import Link from "next/link";
import { ArrowUpRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { Logo } from "@/components/Logo";
import { mainNav, siteConfig, whatsappContactUrl } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto max-w-6xl overflow-hidden px-4 pt-16 sm:px-6 md:pt-24">
        <p className="pb-[0.14em] font-display text-[12.5vw] font-semibold leading-[0.9] tracking-[-0.055em] text-ink lg:text-[8rem]"
        >
          S&apos;informer.
          <br />
          Se sensibiliser.
          <br />
          <span className="text-rose">Agir.</span>
        </p>
      </div>
      <div className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[46ch] text-sm leading-relaxed text-ink-soft">
            Plateforme indépendante d&apos;information sur le cancer du sein au Sénégal. Elle ne remplace pas l&apos;avis
            d&apos;un professionnel de santé et n&apos;est pas le site officiel de la LISCA, du Ministère de la Santé ou
            d&apos;une autre organisation.
          </p>
        </div>

        <nav aria-label="Plan du site">
          <p className="text-sm font-semibold text-ink">Explorer</p>
          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 text-sm md:grid-cols-1">
            {[...mainNav, { href: "/affiche", label: "Affiche (A4, PDF)" }].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-ink-soft transition-colors hover:text-ink">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="text-sm font-semibold text-ink">Une initiative de</p>
          <p className="mt-4 font-display text-xl font-semibold tracking-tight text-ink">{siteConfig.author.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-ink-soft">
            {siteConfig.author.role}, qui a conçu et développé la plateforme bénévolement.
          </p>
          <a
            href={siteConfig.brand.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-3 inline-flex items-center gap-1.5 text-sm"
          >
            <span className="font-semibold text-terra">{siteConfig.brand.name}</span>
            <span className="text-ink-soft">{siteConfig.brand.signature}</span>
            <ArrowUpRight size={14} weight="bold" className="text-terra transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            <span className="sr-only">(site freelance de {siteConfig.author.name}, nouvel onglet)</span>
          </a>
          <p className="mt-6 text-sm font-semibold text-ink">Signaler un événement ou une correction</p>
          <a
            href={whatsappContactUrl("Bonjour, je vous écris au sujet de la plateforme Octobre Rose Sénégal 2026 : ")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-rose"
          >
            <WhatsappLogo size={18} weight="fill" className="text-rose" aria-hidden="true" />
            {siteConfig.contact.whatsappLabel}
            <span className="sr-only"> (WhatsApp, nouvel onglet)</span>
          </a>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-xs text-ink-soft sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>© 2026 {siteConfig.name}. Contenus sourcés, vidéos hébergées par leurs auteurs.</p>
          <Link href="/sources" className="font-semibold hover:text-ink">
            Sources et vérification
          </Link>
        </div>
      </div>
    </footer>
  );
}
