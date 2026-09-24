/**
 * Remonté à chaque navigation (contrairement au layout) : sert de transition douce entre les pages.
 * Animation CSS pure (.page-enter), neutralisée si le mouvement est réduit.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
