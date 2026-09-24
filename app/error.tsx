"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section role="alert" className="mx-auto flex min-h-[70dvh] max-w-3xl flex-col items-start justify-center px-4 pt-32 sm:px-6">
      <h1 className="font-display text-4xl font-semibold tracking-tight text-ink">Un problème est survenu</h1>
      <p className="mt-3 max-w-[50ch] text-lg leading-relaxed text-ink-soft">
        La page n&apos;a pas pu s&apos;afficher. Vérifiez votre connexion puis réessayez.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-semibold text-paper active:scale-[0.98]"
        >
          Réessayer
        </button>
        <Link href="/" className="inline-flex min-h-12 items-center rounded-full bg-surface px-6 font-semibold text-ink ring-1 ring-line">
          Accueil
        </Link>
      </div>
    </section>
  );
}
