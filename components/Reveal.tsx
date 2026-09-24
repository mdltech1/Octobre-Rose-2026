"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";

interface Props {
  children: ReactNode;
  as?: ElementType;
  index?: number;
  className?: string;
}

/** Apparition douce à l'entrée dans le viewport (IntersectionObserver, sans écouteur de scroll). */
export function Reveal({ children, as: Tag = "div", index = 0, className }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.dataset.visible = "true";
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = "true";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className ?? ""}`} style={{ "--reveal-index": index } as React.CSSProperties}>
      {children}
    </Tag>
  );
}
