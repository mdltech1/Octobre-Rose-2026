"use client";

import { Headphones, Stop } from "@phosphor-icons/react";
import { cn } from "@/lib/format";
import { useSpeech } from "@/lib/useSpeech";

/**
 * Lecture audio d'un texte par la synthèse vocale de l'appareil.
 * Le bouton ne s'affiche que si l'appareil propose cette fonction.
 */
export function ListenButton({ text, label, className }: { text: string; label: string; className?: string }) {
  const { supported, speaking, toggle } = useSpeech();
  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={() => toggle(text)}
      aria-pressed={speaking}
      className={cn(
        "inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 text-sm font-semibold transition-all duration-300 active:scale-[0.97]",
        speaking ? "bg-rose text-on-rose" : "bg-surface-2 text-ink hover:bg-rose-soft hover:text-rose-ink",
        className,
      )}
    >
      {speaking ? <Stop size={16} weight="fill" aria-hidden="true" /> : <Headphones size={16} weight="bold" aria-hidden="true" />}
      {speaking ? "Arrêter la lecture" : "Écouter"}
      <span className="sr-only"> : {label} (lecture par la voix de votre appareil, en français)</span>
    </button>
  );
}
