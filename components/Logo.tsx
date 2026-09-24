import Link from "next/link";

export function Logo({ onClick }: { onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className="group flex items-center gap-2.5 rounded-full pr-2"
      aria-label="Octobre Rose Sénégal 2026, accueil"
    >
      <span
        aria-hidden="true"
        className="grid size-9 place-items-center rounded-[0.8rem] bg-rose font-display text-[0.8rem] font-bold tracking-tight text-on-rose transition-transform duration-500 ease-[var(--ease-spring)] group-hover:-rotate-6"
      >
        OR
      </span>
      <span className="flex flex-col leading-none">
        <span className="font-display text-[0.95rem] font-semibold tracking-tight text-ink">Octobre Rose</span>
        <span className="mt-0.5 text-[0.7rem] font-medium text-ink-soft">Sénégal 2026</span>
      </span>
    </Link>
  );
}
