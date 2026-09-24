import { VideoGridSkeleton } from "@/components/VideoLibrary";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-10 pt-32 sm:px-6 md:pt-40" role="status" aria-label="Chargement des vidéos">
      <div className="skeleton h-14 w-3/4 max-w-xl rounded-2xl" />
      <div className="skeleton mt-6 h-5 w-full max-w-2xl rounded-lg" />
      <div className="skeleton mt-3 mb-14 h-5 w-2/3 max-w-xl rounded-lg" />
      <VideoGridSkeleton />
    </div>
  );
}
