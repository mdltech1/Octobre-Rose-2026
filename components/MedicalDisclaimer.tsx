import { Info } from "@phosphor-icons/react/dist/ssr";
import { cn } from "@/lib/format";

export function MedicalDisclaimer({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <aside
      role="note"
      aria-label="Avertissement médical"
      className={cn(
        "flex gap-3 rounded-[1.5rem] border border-rose/25 bg-rose-soft/60 text-rose-ink",
        compact ? "p-4 text-sm" : "p-5 text-[0.95rem] sm:p-6",
        className,
      )}
    >
      <Info size={22} weight="duotone" className="mt-0.5 shrink-0" aria-hidden="true" />
      <p className="leading-relaxed">
        <strong className="font-semibold">Information générale, pas un avis médical.</strong> Cette plateforme ne pose
        pas de diagnostic, n&apos;interprète pas vos symptômes et ne recommande aucun traitement. Pour toute question sur
        votre santé, consultez un professionnel de santé.
      </p>
    </aside>
  );
}
