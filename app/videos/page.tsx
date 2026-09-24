import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { PageHeader } from "@/components/PageHeader";
import { ShareButtons } from "@/components/ShareButtons";
import { VideoLibrary } from "@/components/VideoLibrary";
import { countVideosInReview, getVideos } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { parseVideoFilters } from "@/lib/videoFilters";

export const metadata = pageMetadata({
  title: "Vidéos : cancer du sein en wolof et en français",
  description:
    "Vidéos de sensibilisation sur le cancer du sein, en wolof et en français, issues de sources identifiables (LISCA, INCa, médias). Filtrez par langue et par thème.",
  path: "/videos",
  keywords: ["vidéo cancer du sein wolof", "Octobre Rose vidéo Sénégal"],
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function VideosPage({ searchParams }: { searchParams: SearchParams }) {
  const [videos, wolofInReview, params] = await Promise.all([getVideos(), countVideosInReview("wo"), searchParams]);
  const filters = parseVideoFilters(params);

  return (
    <>
      <PageHeader
        title="Regarder et comprendre"
        intro="Des vidéos hébergées par leurs auteurs et lues directement ici. Chaque vidéo affiche sa langue et sa source. Les vidéos en wolof sont ajoutées dès qu'elles proviennent d'une source fiable."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* La clé réinitialise les filtres quand on arrive par un autre lien (ex. /videos?language=fr) */}
        <VideoLibrary
          key={`${filters.language}-${filters.category}-${filters.query}`}
          videos={videos}
          wolofInReview={wolofInReview}
          initialFilters={filters}
        />

        <div className="mt-16 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          <MedicalDisclaimer />
          <div className="rounded-[1.5rem] bg-surface p-6 ring-1 ring-line">
            <p className="font-display text-xl font-semibold tracking-tight text-ink">Partager les vidéos</p>
            <ShareButtons path="/videos" text="Des vidéos fiables sur le cancer du sein, en wolof et en français" className="mt-4" />
          </div>
        </div>
      </div>
    </>
  );
}
