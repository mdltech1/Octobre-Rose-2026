/**
 * Géométrie du ruban rose, symbole d'Octobre Rose.
 * Partagée par le composant RibbonMark (site) et les images générées (icônes, image de partage).
 *
 * Deux brins tracés au trait : A monte depuis la base gauche et forme la boucle,
 * B redescend vers la base droite en passant par-dessus A. Une « découpe » de la
 * couleur du fond, sous B, marque ce croisement.
 */
export const RIBBON = {
  viewBox: "0 0 48 64",
  width: 48,
  height: 64,
  strokeWidth: 8,
  /** Largeur de la découpe au croisement (un peu plus large que le trait). */
  gapWidth: 12,
  strandA: "M12 60 L29.5 31 C35 21 33.5 6 24 6 C14.5 6 13 21 18.5 31",
  // Commence légèrement avant la fin de A, sur la même droite, pour éviter une jointure visible
  strandB: "M17.9 30 L36 60",
  /** Portion de B autour du croisement (vers x=24, y=40). */
  crossingGap: "M22 36.8 L26.4 44.05",
} as const;
