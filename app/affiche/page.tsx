import QRCode from "qrcode";
import { DownloadSimple } from "@phosphor-icons/react/dist/ssr";
import { PrintButton } from "@/components/PrintButton";
import { RibbonMark } from "@/components/RibbonMark";
import { getArticles, getResources, getSourceById } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Affiche à imprimer : les signes du cancer du sein",
  description:
    "Une affiche A4 à imprimer ou à partager en PDF : les signes du cancer du sein listés par l'OMS, quand consulter, où s'adresser au Sénégal.",
  path: "/affiche",
});

/**
 * PDF prêt à télécharger, copie exacte de cette affiche.
 * À régénérer quand son contenu change : `npm run affiche:pdf` (voir scripts/affiche-pdf.mjs).
 */
const POSTER_PDF = "/affiche-octobre-rose-2026.pdf";

/** « une masse… ; » -> « Une masse… » : les éléments de liste des fiches, en phrases autonomes. */
function asPosterLine(item: string) {
  const text = item.trim().replace(/\s*[;.]$/, "");
  return text.charAt(0).toUpperCase() + text.slice(1);
}

export default async function AffichePage() {
  const [articles, resources] = await Promise.all([getArticles(), getResources()]);

  // Contenus repris des fiches et des ressources sourcées : rien n'est écrit spécialement pour l'affiche
  const signsBlock = articles.find((a) => a.slug === "signes-et-symptomes")?.blocks.find((b) => b.type === "list");
  const signs = signsBlock?.type === "list" ? signsBlock.items.map(asPosterLine) : [];
  const lisca = resources.find((r) => r.id === "resource-lisca");
  const oms = getSourceById("oms-cancer-sein");
  const siteLabel = siteConfig.url.replace(/^https?:\/\//, "");
  // QR code généré au build, en SVG (aucune bibliothèque envoyée au navigateur)
  const qr = await QRCode.toString(siteConfig.url, { type: "svg", margin: 0, errorCorrectionLevel: "M", color: { dark: "#25242a", light: "#ffffff" } });

  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-28 sm:px-6 md:pt-36 print:p-0">
      {/* Écran uniquement : explication et bouton d'impression */}
      <div className="mb-10 max-w-[62ch] print:hidden">
        <h1 className="font-display text-[2.4rem] font-semibold leading-[1.02] tracking-[-0.035em] text-ink sm:text-5xl">
          L&apos;affiche des signes à connaître
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-ink-soft">
          Pour une salle d&apos;attente, un local associatif, un lieu de travail ou un groupe WhatsApp. Format A4, en
          couleur ou en noir et blanc. Le QR code renvoie vers la plateforme.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          {/* Deux usages distincts : imprimer sur papier, ou récupérer le fichier (envoi, impression ailleurs) */}
          <PrintButton />
          <a
            href={POSTER_PDF}
            download
            className="inline-flex min-h-12 items-center gap-3 rounded-full bg-surface py-1.5 pl-5 pr-1.5 text-[0.95rem] font-semibold text-ink ring-1 ring-line transition-all duration-500 ease-[var(--ease-spring)] hover:ring-ink/30 active:scale-[0.98]"
          >
            Télécharger le PDF
            <span className="grid size-9 place-items-center rounded-full bg-surface-2" aria-hidden="true">
              <DownloadSimple size={17} weight="bold" />
            </span>
          </a>
        </div>
      </div>

      {/* Affiche A4 (210 × 297 mm) : aperçu à l'écran, seule chose imprimée.
          Toutes les tailles sont en em, rapportées à la largeur de l'affiche (unités cqw du conteneur) :
          mêmes proportions sur téléphone, sur ordinateur et à l'impression. */}
      <div className="mx-auto w-full max-w-[794px] [container-type:inline-size] print:max-w-none">
      <article
        aria-label="Affiche : les signes du cancer du sein"
        className="flex aspect-[210/297] w-full break-inside-avoid flex-col overflow-hidden rounded-2xl bg-white text-[2.015cqw] text-[#25242a] shadow-lift ring-1 ring-line print:rounded-none print:shadow-none print:ring-0"
      >
        <header className="flex items-center gap-[4%] bg-[#bf2c61] px-[7%] py-[5%] text-white">
          <RibbonMark className="h-[5.5em] w-auto shrink-0 text-white" gapColor="#bf2c61" />
          <div>
            <p className="text-[0.95em] font-semibold uppercase tracking-[0.14em] opacity-90">Octobre Rose · Sénégal 2026</p>
            <p className="mt-[0.3em] font-display text-[2.3em] font-semibold leading-[1.05] tracking-[-0.03em]">
              Cancer du sein : les signes à connaître
            </p>
          </div>
        </header>

        <div className="flex flex-1 flex-col px-[7%] py-[4.5%]">
          <ul className="grid gap-[0.75em]">
            {signs.map((sign) => (
              <li key={sign} className="flex gap-[0.8em] text-[1.45em] leading-snug">
                <span className="mt-[0.45em] h-[0.35em] w-[0.9em] shrink-0 rounded-full bg-[#bf2c61]" aria-hidden="true" />
                <span>{sign}</span>
              </li>
            ))}
          </ul>
          <p className="mt-[1.1em] text-[1.1em] text-[#54525b]">
            Ces signes justifient de consulter, sans signifier un cancer. Liste de l&apos;OMS.
          </p>

          <div className="mt-[1.6em] grid grid-cols-2 gap-[1.2em]">
            <section className="rounded-[1em] bg-[#fbe5ec] p-[1.2em] text-[#7a1740]">
              <h2 className="font-display text-[1.45em] font-semibold">Quand consulter ?</h2>
              <p className="mt-[0.5em] text-[1.2em] font-medium leading-snug">
                « En cas de masse anormale dans le sein, même indolore, il faut consulter un médecin. »
              </p>
              <p className="mt-[0.5em] text-[1.05em] leading-snug">La plupart des masses du sein ne sont pas cancéreuses. (OMS)</p>
            </section>
            <section className="rounded-[1em] border border-[#e7dfdd] p-[1.2em]">
              <h2 className="font-display text-[1.45em] font-semibold">Où s&apos;adresser ?</h2>
              <p className="mt-[0.5em] text-[1.15em] leading-snug">À un médecin, dans une structure de santé proche de chez vous.</p>
              {lisca ? (
                <p className="mt-[0.7em] text-[1.05em] leading-snug">
                  <span className="font-semibold">{lisca.name}</span>
                  {lisca.phone ? (
                    <>
                      <br />
                      Tél. {lisca.phone}
                    </>
                  ) : null}
                  <br />
                  <span className="text-[#54525b]">Coordonnées : {lisca.sourceLabel}, à confirmer auprès de la LISCA.</span>
                </p>
              ) : null}
            </section>
          </div>

          <div className="mt-auto flex items-end gap-[1.4em] border-t border-[#e7dfdd] pt-[1.2em]">
            <div
              className="size-[8em] shrink-0 [&>svg]:size-full"
              role="img"
              aria-label={`QR code vers ${siteLabel}`}
              // SVG généré par la bibliothèque qrcode à partir de l'URL du site (contenu maîtrisé)
              dangerouslySetInnerHTML={{ __html: qr }}
            />
            <div className="min-w-0 text-[0.95em] leading-snug text-[#54525b]">
              <p className="text-[1.25em] font-semibold text-[#25242a]">Fiches, vidéos et contacts :</p>
              <p className="text-[1.25em] font-semibold text-[#bf2c61]">{siteLabel}</p>
              <p className="mt-[0.6em]">
                Information générale, pas un avis médical. Source : {oms ? `${oms.name}, ${oms.documentTitle}` : "OMS"}.
              </p>
              <p>
                Initiative bénévole et indépendante de {siteConfig.author.name} ({siteConfig.brand.name}). Ce n&apos;est pas
                un document officiel de la LISCA ou du Ministère de la Santé.
              </p>
            </div>
          </div>
        </div>
      </article>
      </div>
    </div>
  );
}
