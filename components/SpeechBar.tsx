"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { Stop } from "@phosphor-icons/react";
import { stopSpeech, useSpeechState } from "@/lib/useSpeech";

/**
 * Lecteur fixe : visible pendant une lecture vocale, où que l'on soit dans la page.
 * Permet d'arrêter la lecture sans remonter jusqu'au bouton « Écouter ».
 */
export function SpeechBar() {
  const speech = useSpeechState();
  const pathname = usePathname();
  const firstPath = useRef(pathname);

  // Changer de page arrête la lecture (le texte lu n'est plus à l'écran)
  useEffect(() => {
    if (pathname !== firstPath.current) {
      firstPath.current = pathname;
      stopSpeech();
    }
  }, [pathname]);

  if (!speech) return null;
  const progress = ((speech.index + 1) / speech.total) * 100;

  return (
    <div className="swap-in pointer-events-auto overflow-hidden rounded-[1.4rem] bg-rose text-on-rose shadow-lift">
      <div className="flex items-center gap-3 p-3 pl-4">
        <div className="eq flex h-7 w-8 shrink-0 items-end gap-[3px]" data-on="true" aria-hidden="true">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} style={{ "--i": i } as React.CSSProperties} />
          ))}
        </div>
        <div className="min-w-0 flex-1" aria-live="polite">
          <p className="truncate text-sm font-semibold">{speech.label}</p>
          <p className="text-xs opacity-85">
            Lecture en cours, phrase {speech.index + 1} sur {speech.total}
          </p>
        </div>
        <button
          type="button"
          onClick={stopSpeech}
          className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-full bg-on-rose px-4 text-sm font-semibold text-rose active:scale-[0.97]"
        >
          <Stop size={16} weight="fill" aria-hidden="true" />
          Arrêter
        </button>
      </div>
      <div className="h-1 bg-on-rose/20" aria-hidden="true">
        <div className="h-full bg-on-rose transition-[width] duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
