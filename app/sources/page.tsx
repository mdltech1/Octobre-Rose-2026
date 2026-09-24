import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { PageHeader } from "@/components/PageHeader";
import { Reveal } from "@/components/Reveal";
import { SourceCard } from "@/components/SourceCard";
import { getSources } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sources et vérification",
  description:
    "Les sources utilisées par Octobre Rose Sénégal 2026 (OMS, CIRC, LISCA, Ministère de la Santé) et la méthode de vérification des contenus et des vidéos.",
  path: "/sources",
});

const rules = [
  {
    title: "Une source pour chaque information",
    text: "Chaque information médicale ou chiffrée renvoie à un organisme identifiable. Les citations reprennent le texte de la source.",
  },
  {
    title: "Des vidéos vérifiées, jamais réhébergées",
    text: "L'existence de chaque vidéo et l'identité de sa chaîne sont vérifiées. Une vidéo dont l'auteur n'est pas identifié reste en attente et n'est pas affichée.",
  },
  {
    title: "Rien d'inventé",
    text: "Aucun chiffre, médecin, numéro, événement, témoignage ou partenariat n'est créé. Une information absente reste absente.",
  },
  {
    title: "Une relecture médicale prévue",
    text: "Les fiches seront relues par des professionnels de santé. Tant que ce n'est pas fait, elles l'indiquent clairement.",
  },
];

export default async function SourcesPage() {
  const sources = await getSources();
  return (
    <>
      <PageHeader
        title="Sources et vérification"
        intro="Cette plateforme facilite l'accès à des informations provenant de sources identifiables. Elle ne produit pas d'information médicale et ne remplace pas l'avis d'un professionnel de santé."
      />
      <div className="mx-auto max-w-6xl space-y-20 px-4 sm:px-6">
        <section aria-labelledby="methode-title">
          <h2 id="methode-title" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Notre méthode
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {rules.map((r, i) => (
              <Reveal as="li" key={r.title} index={i} className="rounded-[1.75rem] bg-surface p-6 ring-1 ring-line sm:p-7">
                <p className="font-display text-xl font-semibold tracking-tight text-ink">{r.title}</p>
                <p className="mt-2 leading-relaxed text-ink-soft">{r.text}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section aria-labelledby="liste-sources">
          <h2 id="liste-sources" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Sources consultées
          </h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sources.map((s, i) => (
              <Reveal as="li" key={s.id} index={i % 3}>
                <SourceCard source={s} />
              </Reveal>
            ))}
          </ul>
        </section>

        <MedicalDisclaimer />
      </div>
    </>
  );
}
