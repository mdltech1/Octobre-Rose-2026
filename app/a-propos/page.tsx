import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { ButtonLink } from "@/components/ButtonLink";
import { PageHeader } from "@/components/PageHeader";
import { ShareButtons } from "@/components/ShareButtons";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "À propos : une initiative indépendante de MdlTech",
  description:
    "Octobre Rose Sénégal 2026 est une initiative digitale indépendante et bénévole créée par Mame Diarra, développeuse Web Full-Stack freelance et fondatrice de MdlTech.",
  path: "/a-propos",
});

export default function AProposPage() {
  return (
    <>
      <PageHeader
        title="Une initiative digitale indépendante de MdlTech"
        intro="Cette plateforme a été créée bénévolement par Mame Diarra, développeuse Web Full-Stack freelance et fondatrice de MdlTech."
      />

      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.3fr_1fr]">
        <section aria-labelledby="pourquoi-title" className="bezel">
          <div className="bezel-core h-full p-7 sm:p-10">
            <h2 id="pourquoi-title" className="font-display text-3xl font-semibold tracking-tight text-ink">
              Pourquoi cette plateforme
            </h2>
            <div className="mt-5 space-y-4 text-lg leading-relaxed text-ink-soft">
              <p>
                Tout le monde ne reçoit pas l&apos;information de la même manière. Certaines personnes lisent, d&apos;autres
                préfèrent écouter ou regarder, en français ou en wolof.
              </p>
              <p>
                L&apos;objectif est simple : rassembler au même endroit des informations générales et des ressources
                fiables sur le cancer du sein au Sénégal, et orienter vers les organismes compétents.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="statut-title" className="rounded-[2rem] bg-ink p-7 text-paper sm:p-10">
          <h2 id="statut-title" className="font-display text-2xl font-semibold tracking-tight">
            Statut de la plateforme
          </h2>
          <p className="mt-4 leading-relaxed text-paper/85">
            Cette plateforme n&apos;est pas le site officiel de la LISCA, du Ministère de la Santé ou d&apos;une autre
            organisation, sauf collaboration officiellement confirmée.
          </p>
          <p className="mt-4 leading-relaxed text-paper/85">
            Elle ne pose aucun diagnostic, n&apos;interprète pas de symptômes et ne recommande aucun traitement.
          </p>
        </section>

        <section aria-labelledby="mdltech-title" className="rounded-[2rem] bg-surface p-7 ring-1 ring-line sm:p-10 lg:col-span-2">
          <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <h2 id="mdltech-title" className="font-display text-3xl font-semibold tracking-tight text-ink">
                <span className="text-terra">MdlTech</span>
              </h2>
              <p className="mt-1 text-ink-soft">{siteConfig.studio.signature}</p>
              <p className="mt-5 max-w-[60ch] leading-relaxed text-ink-soft">
                MdlTech est la structure de développement web fondée par {siteConfig.author.name}. Cette plateforme est
                une contribution bénévole à Octobre Rose, sans but commercial.
              </p>
            </div>
            <ButtonLink href={siteConfig.studio.url} external variant="ghost" icon={<ArrowUpRight size={15} weight="bold" />}>
              mdltech.site
            </ButtonLink>
          </div>
        </section>

        <section aria-labelledby="share-apropos" className="rounded-[2rem] bg-rose-soft p-7 text-rose-ink sm:p-10 lg:col-span-2">
          <h2 id="share-apropos" className="font-display text-2xl font-semibold tracking-tight">
            Faire connaître l&apos;initiative
          </h2>
          <ShareButtons path="/" className="mt-5" />
        </section>
      </div>
    </>
  );
}
