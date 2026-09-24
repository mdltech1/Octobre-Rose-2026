import { Translate } from "@phosphor-icons/react/dist/ssr";
import { languageLabel } from "@/lib/format";
import type { LanguageCode } from "@/types/content";

export function LanguageBadge({ language, confirmed = true }: { language: LanguageCode; confirmed?: boolean }) {
  const isWolof = language === "wo";
  return (
    <span
      className={
        isWolof
          ? "inline-flex items-center gap-1.5 rounded-full bg-rose px-2.5 py-1 text-xs font-semibold text-on-rose"
          : "inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-2.5 py-1 text-xs font-semibold text-ink"
      }
      title={confirmed ? undefined : "Langue indiquée d'après le titre, à confirmer au visionnage"}
    >
      <Translate size={14} weight="bold" aria-hidden="true" />
      <span>
        <span className="sr-only">Langue : </span>
        {languageLabel[language]}
        {confirmed ? "" : " (à confirmer)"}
      </span>
    </span>
  );
}
