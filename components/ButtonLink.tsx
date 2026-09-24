import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/format";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, { root: string; icon: string }> = {
  primary: {
    root: "bg-rose text-on-rose hover:bg-rose-strong shadow-soft",
    icon: "bg-on-rose/15",
  },
  secondary: {
    root: "bg-ink text-paper hover:opacity-90",
    icon: "bg-paper/15",
  },
  ghost: {
    root: "bg-surface text-ink ring-1 ring-line hover:ring-ink/30",
    icon: "bg-surface-2",
  },
};

interface Props {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: Variant;
  external?: boolean;
  className?: string;
  ariaLabel?: string;
}

/** Bouton-lien en pilule, icône imbriquée dans sa propre pastille. */
export function ButtonLink({ href, children, icon, variant = "primary", external, className, ariaLabel }: Props) {
  const v = variants[variant];
  const classes = cn(
    "group inline-flex min-h-12 items-center gap-3 whitespace-nowrap rounded-full py-1.5 pl-5 text-[0.95rem] font-semibold transition-all duration-500 ease-[var(--ease-spring)] active:scale-[0.98]",
    icon ? "pr-1.5" : "pr-5",
    v.root,
    className,
  );
  const content = (
    <>
      <span>{children}</span>
      {icon ? (
        <span
          aria-hidden="true"
          className={cn(
            "grid size-9 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-105",
            v.icon,
          )}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes} aria-label={ariaLabel}>
      {content}
    </Link>
  );
}
