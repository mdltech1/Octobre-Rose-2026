"use client";

import { useEffect, useState } from "react";
import { Check, FacebookLogo, LinkSimple, LinkedinLogo, ShareNetwork, WhatsappLogo } from "@phosphor-icons/react";
import { cn } from "@/lib/format";
import { siteConfig } from "@/lib/site";

interface Props {
  /** Chemin de la page à partager ("/videos"). Par défaut : la page courante. */
  path?: string;
  /** Message d'accompagnement. */
  text?: string;
  className?: string;
  tone?: "light" | "rose";
}

async function copyToClipboard(value: string) {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    // Repli pour les navigateurs sans API Clipboard (anciens Android, contexte non sécurisé)
    const ta = document.createElement("textarea");
    ta.value = value;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(ta);
    return ok;
  }
}

export function ShareButtons({ path, text = `${siteConfig.name} : ${siteConfig.tagline}`, className, tone = "light" }: Props) {
  const [url, setUrl] = useState(`${siteConfig.url}${path ?? "/"}`);
  const [copied, setCopied] = useState<"idle" | "ok" | "error">("idle");
  const [canNativeShare, setCanNativeShare] = useState(false);

  useEffect(() => {
    // Utilise le domaine réellement visité (préproduction, domaine personnalisé...)
    const current = path ? `${window.location.origin}${path}` : window.location.href.split("#")[0];
    setUrl(current);
    setCanNativeShare(typeof navigator !== "undefined" && typeof navigator.share === "function");
  }, [path]);

  useEffect(() => {
    if (copied === "idle") return;
    const t = window.setTimeout(() => setCopied("idle"), 2400);
    return () => window.clearTimeout(t);
  }, [copied]);

  const encodedUrl = encodeURIComponent(url);
  const links = [
    {
      label: "WhatsApp",
      href: `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
      icon: <WhatsappLogo size={20} weight="fill" aria-hidden="true" />,
    },
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <FacebookLogo size={20} weight="fill" aria-hidden="true" />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <LinkedinLogo size={20} weight="fill" aria-hidden="true" />,
    },
  ];

  const base =
    "inline-flex min-h-12 items-center gap-2 rounded-full px-4 text-sm font-semibold transition-all duration-300 ease-[var(--ease-spring)] active:scale-[0.97]";
  const skin =
    tone === "rose"
      ? "bg-on-rose/10 text-on-rose ring-1 ring-on-rose/25 hover:bg-on-rose/20"
      : "bg-surface text-ink ring-1 ring-line hover:ring-ink/30";

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {links.map((l) => (
        <a
          key={l.label}
          href={l.href}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(base, skin)}
          data-share={l.label.toLowerCase()}
        >
          {l.icon}
          {l.label}
          <span className="sr-only">(partager dans un nouvel onglet)</span>
        </a>
      ))}
      <button
        type="button"
        className={cn(base, skin)}
        onClick={async () => setCopied((await copyToClipboard(url)) ? "ok" : "error")}
      >
        {copied === "ok" ? (
          <Check size={20} weight="bold" aria-hidden="true" />
        ) : (
          <LinkSimple size={20} weight="bold" aria-hidden="true" />
        )}
        {copied === "ok" ? "Lien copié" : copied === "error" ? "Copie impossible" : "Copier le lien"}
      </button>
      {canNativeShare ? (
        <button
          type="button"
          className={cn(base, skin)}
          onClick={() => navigator.share({ title: siteConfig.name, text, url }).catch(() => undefined)}
        >
          <ShareNetwork size={20} weight="bold" aria-hidden="true" />
          Autres applis
        </button>
      ) : null}
      <span className="sr-only" aria-live="polite">
        {copied === "ok" ? "Lien copié dans le presse-papiers" : copied === "error" ? "La copie du lien a échoué" : ""}
      </span>
    </div>
  );
}
