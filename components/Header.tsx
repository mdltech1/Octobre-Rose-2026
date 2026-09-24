"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "@phosphor-icons/react";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/format";
import { mainNav } from "@/lib/site";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);

  const close = useCallback(() => setOpen(false), []);

  // Ferme le menu à chaque changement de route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Verrouille le défilement, gère Échap et le focus
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // La page derrière le menu devient inerte : Tab reste dans l'en-tête et le menu
    const behind = [document.querySelector("main"), document.querySelector("body > footer")].filter(
      (el): el is HTMLElement => el instanceof HTMLElement,
    );
    behind.forEach((el) => (el.inert = true));
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => firstLinkRef.current?.focus(), 60);
    return () => {
      document.body.style.overflow = previous;
      behind.forEach((el) => (el.inert = false));
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Aller au contenu
      </a>

      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
        <div className="glass mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 rounded-full border border-line/80 bg-surface/80 pl-3 pr-2 shadow-soft backdrop-blur-xl">
          <Logo />

          <nav aria-label="Navigation principale" className="hidden lg:block">
            <ul className="flex items-center gap-0.5">
              {mainNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "rounded-full px-3 py-2 text-[0.875rem] font-medium transition-colors duration-300",
                      isActive(item.href)
                        ? "bg-rose-soft text-rose-ink"
                        : "text-ink-soft hover:bg-surface-2 hover:text-ink",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="menu-mobile"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            className="relative grid size-12 place-items-center rounded-full bg-ink text-paper transition-transform duration-300 active:scale-95 lg:hidden"
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-500 ease-[var(--ease-spring)]",
                  open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
                )}
              />
              <span
                className={cn(
                  "absolute left-0 h-[1.5px] w-5 rounded-full bg-current transition-all duration-500 ease-[var(--ease-spring)]",
                  open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
                )}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Menu mobile plein écran */}
      <div
        id="menu-mobile"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
        className={cn(
          "glass fixed inset-0 z-[45] overflow-y-auto bg-paper/[0.97] backdrop-blur-2xl transition-all duration-500 ease-[var(--ease-spring)] lg:hidden",
          open ? "visible opacity-100" : "pointer-events-none invisible opacity-0",
        )}
      >
        <div className="flex min-h-[100dvh] flex-col px-6 pb-10 pt-28">
          <nav aria-label="Navigation mobile">
            <ul className="flex flex-col gap-1">
              {[{ href: "/", label: "Accueil" }, ...mainNav].map((item, i) => (
                <li
                  key={item.href}
                  className={cn(
                    "transition-all duration-700 ease-[var(--ease-spring)]",
                    open ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0",
                  )}
                  style={{ transitionDelay: open ? `${80 + i * 45}ms` : "0ms" }}
                >
                  <Link
                    ref={i === 0 ? firstLinkRef : undefined}
                    href={item.href}
                    onClick={close}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className={cn(
                      "flex items-center justify-between rounded-2xl px-3 py-3 font-display text-[2rem] font-semibold tracking-tight",
                      pathname === item.href ? "text-rose" : "text-ink",
                    )}
                  >
                    {item.label}
                    <ArrowUpRight size={22} weight="light" aria-hidden="true" className="text-ink-soft" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="mt-auto pt-10 text-sm text-ink-soft">
            Initiative indépendante. Ne remplace pas l&apos;avis d&apos;un professionnel de santé.
          </p>
        </div>
      </div>
    </>
  );
}
