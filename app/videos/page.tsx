import { Suspense } from "react";
import { MedicalDisclaimer } from "@/components/MedicalDisclaimer";
import { PageHeader } from "@/components/PageHeader";
import { ShareButtons } from "@/components/ShareButtons";
import { VideoGridSkeleton, VideoLibrary } from "@/components/VideoLibrary";
import { countVideosInReview, getVideos } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vidéos : cancer du sein en wolof et en français",
  description:
    "Vidéos de sensibilisation sur le cancer du sein, en wolof et en français, issues de sources identifiables (LISCA, INCa, médias). Filtrez par langue et par thème.",
  path: "/videos",
  keywords: ["vidéo cancer du sein wolof", "Octobre Rose vidéo Sénégal"],
});

export default async function VideosPage() {
  const [videos, wolofInReview] = await Promise.all([getVideos(), countVideosInReview("wo")]);

  return (
    <>
      <PageHeader
        title="Regarder et comprendre"
        intro="Des vidéos hébergées par leurs auteurs et lues directement ici. Chaque vidéo affiche sa langue et sa source. Les vidéos en wolof sont ajoutées dès qu'elles proviennent d'une source fiable."
      />
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Suspense fallback={<VideoGridSkeleton />}>
          <VideoLibrary videos={videos} wolofInReview={wolofInReview} />
        </Suspense>

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
