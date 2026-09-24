"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowClockwise, CloudSlash, X } from "@phosphor-icons/react";

const savedAtFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  hour: "2-digit",
  minute: "2-digit",
  timeZone: "Africa/Dakar",
});

/**
 * Bandeau « version enregistrée » : affiché quand le service worker (public/sw.js) a servi
 * une copie de la page faute de réseau. Il rappelle que les lieux et horaires ont pu changer.
 */
export function OfflineBanner() {
  const pathname = usePathname();
  // Chemin de la page servie depuis le cache, et date de son enregistrement
  const [copy, setCopy] = useState<{ path: string; savedAt: string | null } | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [online, setOnline] = useState(false);

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="offline-copy"]');
    if (!meta) return;
    const date = meta.content ? new Date(meta.content) : null;
    setCopy({
      path: window.location.pathname,
      savedAt: date && !Number.isNaN(date.getTime()) ? savedAtFormatter.format(date) : null,
    });
    setOnline(navigator.onLine);
    const update = () => setOnline(navigator.onLine);
    window.addEventListener("online", update);
    window.addEventListener("offline", update);
    return () => {
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  // Une navigation interne réussie charge une page à jour : le bandeau ne concerne plus qu'elle
  if (!copy || dismissed || pathname !== copy.path) return null;

  return (
    <div className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-xl sm:bottom-5" role="status">
      <div className="flex items-start gap-3 rounded-[1.4rem] bg-ink p-4 text-paper shadow-lift">
        <CloudSlash size={22} weight="duotone" className="mt-0.5 shrink-0" aria-hidden="true" />
        <div className="min-w-0 flex-1 text-sm leading-relaxed">
          <p className="font-semibold">
            Version enregistrée{copy.savedAt ? ` le ${copy.savedAt}` : ""}
          </p>
          <p className="text-paper/80">
            Vous consultez une copie gardée sur votre appareil. Les lieux, horaires et contacts ont pu changer depuis.
          </p>
          {online ? (
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="mt-2 inline-flex min-h-10 items-center gap-2 rounded-full bg-paper px-4 font-semibold text-ink active:scale-[0.98]"
            >
              <ArrowClockwise size={16} weight="bold" aria-hidden="true" />
              Actualiser
            </button>
          ) : null}
        </div>
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="grid size-10 shrink-0 place-items-center rounded-full text-paper/80 hover:bg-paper/10 hover:text-paper"
          aria-label="Fermer le bandeau"
        >
          <X size={18} weight="bold" />
        </button>
      </div>
    </div>
  );
}
