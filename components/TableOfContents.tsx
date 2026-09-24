"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/format";

interface Item {
  id: string;
  label: string;
}

/**
 * Sommaire de /comprendre.
 * Mobile : barre de puces collée sous l'en-tête, qui défile pour garder la section en cours visible.
 * Grand écran : colonne collante à gauche. Dans les deux cas, la section en cours est mise en avant.
 */
export function TableOfContents({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const rowRef = useRef<HTMLOListElement>(null);

  // Section en cours : la dernière dont le haut est passé sous la barre de navigation
  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<string>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        }
        const first = items.find((item) => visible.has(item.id));
        if (first) setActive(first.id);
      },
      // Bande de lecture : du bas de la barre collante jusqu'au milieu de l'écran
      { rootMargin: "-140px 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  // Mobile : fait défiler la barre horizontalement (jamais la page) pour montrer la puce active
  useEffect(() => {
    const row = rowRef.current;
    const chip = row?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!row || !chip || row.scrollWidth <= row.clientWidth) return;
    row.scrollTo({ left: chip.offsetLeft - 16, behavior: "smooth" });
  }, [active]);

  return (
    <nav
      aria-label="Sommaire"
      className="sticky top-[5.25rem] z-30 -mx-4 bg-paper/90 sm:-mx-6 py-2 backdrop-blur-md sm:top-[5.75rem] lg:top-28 lg:mx-0 lg:self-start lg:bg-transparent lg:py-0 lg:backdrop-blur-none"
    >
      <p className="hidden text-sm font-semibold text-ink lg:block">Sommaire</p>
      <ol
        ref={rowRef}
        className="scroll-row flex gap-2 overflow-x-auto px-4 sm:px-6 lg:mt-3 lg:flex-col lg:gap-1 lg:overflow-visible lg:px-0"
      >
        {items.map((item) => {
          const isActive = item.id === active;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                data-id={item.id}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "block rounded-full px-3.5 py-2 text-sm font-medium ring-1 transition-colors duration-300 lg:rounded-xl lg:px-3 lg:ring-0",
                  isActive
                    ? "bg-rose-soft text-rose-ink ring-rose/25"
                    : "bg-surface text-ink-soft ring-line hover:text-ink lg:bg-transparent lg:hover:bg-surface",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
