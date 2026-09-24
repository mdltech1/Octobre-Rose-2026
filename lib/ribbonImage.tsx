import { RIBBON } from "@/lib/ribbon";

/**
 * Ruban pour les images générées (next/og : icônes, image de partage).
 * Couleurs en valeurs explicites : les variables CSS n'existent pas dans ce moteur de rendu.
 */
export function RibbonImage({ height, color, background }: { height: number; color: string; background: string }) {
  const width = (height * RIBBON.width) / RIBBON.height;
  return (
    <svg width={width} height={height} viewBox={RIBBON.viewBox}>
      <path d={RIBBON.strandA} fill="none" stroke={color} strokeWidth={RIBBON.strokeWidth} strokeLinejoin="round" />
      <path d={RIBBON.crossingGap} fill="none" stroke={background} strokeWidth={RIBBON.gapWidth} />
      <path d={RIBBON.strandB} fill="none" stroke={color} strokeWidth={RIBBON.strokeWidth} />
    </svg>
  );
}
