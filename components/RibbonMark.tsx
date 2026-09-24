import { RIBBON } from "@/lib/ribbon";

interface Props {
  className?: string;
  /** Couleur du fond sur lequel le ruban est posé : sert à marquer le croisement des brins. */
  gapColor?: string;
  /** Trace le ruban une fois au chargement (CSS pur, désactivé si le mouvement est réduit). */
  animated?: boolean;
}

/** Ruban rose d'Octobre Rose, décoratif. Sa couleur est celle du texte (currentColor). */
export function RibbonMark({ className, gapColor = "var(--paper)", animated = false }: Props) {
  const common = { fill: "none", strokeLinecap: "butt" as const, strokeLinejoin: "round" as const, pathLength: 1 };
  return (
    <svg
      viewBox={RIBBON.viewBox}
      className={`${animated ? "ribbon-draw " : ""}${className ?? ""}`}
      aria-hidden="true"
      focusable="false"
    >
      <path className="ribbon-a" d={RIBBON.strandA} stroke="currentColor" strokeWidth={RIBBON.strokeWidth} {...common} />
      <path className="ribbon-gap" d={RIBBON.crossingGap} stroke={gapColor} strokeWidth={RIBBON.gapWidth} {...common} />
      <path className="ribbon-b" d={RIBBON.strandB} stroke="currentColor" strokeWidth={RIBBON.strokeWidth} {...common} />
    </svg>
  );
}
