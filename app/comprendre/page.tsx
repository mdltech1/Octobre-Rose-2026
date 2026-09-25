import Link from "next/link";
import { ArticleSection } from "@/components/ArticleSection";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { PageHeader } from "@/components/PageHeader";
import { ShareButtons } from "@/components/ShareButtons";
import { TableOfContents } from "@/components/TableOfContents";
import { getArticles, getFaq, getVideoById } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Comprendre le cancer du sein",
  description:
    "Qu'est-ce que le cancer du sein, facteurs de risque, signes, dépistage, quand consulter, idées reçues : des fiches claires et sourcées (OMS, CIRC, LISCA), à lire ou à écouter.",
  path: "/comprendre",
  keywords: ["signes cancer du sein", "facteurs de risque cancer du sein", "idées reçues cancer du sein"],
});

export default async function ComprendrePage() {
  const [articles, faq] = await Promise.all([getArticles(), getFaq()]);
  const withVideos = await Promise.all(
    articles.map(async (a) => ({ article: a, wolof: a.wolofVideoId ? await getVideoById(a.wolofVideoId) : undefined })),
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: "fr",
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }}
      />
      <PageHeader
        title="Comprendre le cancer du sein"
        intro="Des fiches courtes, construites à partir de sources identifiées. Chaque fiche peut être écoutée à voix haute grâce à la synthèse vocale de votre appareil."
      >
        <MedicalDisclaimer compact className="max-w-2xl" />
      </PageHeader>

      <div className="mx-auto grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[15rem_1fr] lg:gap-16">
        <TableOfContents
          items={[...articles.map((a) => ({ id: a.slug, label: a.title })), { id: "questions", label: "Questions fréquentes" }]}
        />

        <div className="grid gap-16 md:gap-20">
          {withVideos.map(({ article, wolof }) => (
            <ArticleSection key={article.id} article={article} wolofVideo={wolof} />
          ))}

          <section id="questions" aria-labelledby="questions-title" className="scroll-mt-12 lg:scroll-mt-4">
            <h2 id="questions-title" className="font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
              Questions fréquentes
            </h2>
            <div className="mt-6">
              <FaqList items={faq} />
            </div>
          </section>

          <section aria-labelledby="share-comprendre" className="rounded-[1.75rem] bg-surface p-6 ring-1 ring-line sm:p-8">
            <h2 id="share-comprendre" className="font-display text-2xl font-semibold tracking-tight text-ink">
              Partager ces fiches
            </h2>
            <p className="mt-2 text-ink-soft">
              Vous préférez la vidéo ? Rendez-vous sur la page{" "}
              <Link href="/videos" className="font-semibold text-ink underline underline-offset-4">
                Vidéos
              </Link>
              .
            </p>
            <ShareButtons path="/comprendre" text="Comprendre le cancer du sein, avec des sources fiables" className="mt-5" />
            <p className="mt-5 text-sm">
              <Link href="/affiche" className="font-semibold underline decoration-line underline-offset-4 hover:decoration-rose">
                L&apos;affiche des signes à connaître (A4, à imprimer ou en PDF)
              </Link>
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
