import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { categoryLabel, cn } from "@/lib/format";
import type { Article } from "@/types/content";

interface Props {
  article: Article;
  sourceNames: string[];
  variant?: "default" | "feature" | "tint";
  className?: string;
}

/** Carte de fiche pédagogique, renvoie vers la section correspondante de /comprendre. */
export function ArticleCard({ article, sourceNames, variant = "default", className }: Props) {
  const quoteBlock = article.blocks.find((block) => block.type === "quote");
  const quote = quoteBlock?.type === "quote" ? quoteBlock.text : null;
  return (
    <Link
      href={`/comprendre#${article.slug}`}
      className={cn(
        "group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-[1.75rem] p-6 transition-all duration-500 ease-[var(--ease-spring)] hover:-translate-y-1 sm:p-7",
        variant === "feature" && "bg-ink text-paper",
        variant === "tint" && "bg-rose-soft text-rose-ink",
        variant === "default" && "bg-surface text-ink ring-1 ring-line hover:shadow-soft",
        className,
      )}
    >
      <div>
        <span
          className={cn(
            "text-sm font-semibold",
            variant === "feature" ? "text-paper/70" : variant === "tint" ? "text-rose-ink/80" : "text-ink-soft",
          )}
        >
          {categoryLabel[article.category]}
        </span>
        <h3
          className={cn(
            "mt-3 font-display font-semibold tracking-tight",
            variant === "feature" ? "text-3xl leading-[1.05] sm:text-4xl" : "text-xl leading-snug",
          )}
        >
          {article.title}
        </h3>
        <p
          className={cn(
            "mt-3 max-w-[48ch] leading-relaxed",
            variant === "feature" ? "text-paper/80" : variant === "tint" ? "text-rose-ink/90" : "text-ink-soft",
          )}
        >
          {article.summary}
        </p>
        {/* Grande carte (grand écran) : la citation de la fiche occupe l'espace, avec sa source en pied de carte */}
        {variant === "feature" && quote ? (
          <blockquote className="mt-10 hidden max-w-[34ch] border-l-2 border-deep-accent pl-5 font-display text-2xl font-medium leading-snug tracking-tight text-paper md:block">
            « {quote} »
          </blockquote>
        ) : null}
      </div>
      <div className="flex items-end justify-between gap-4">
        <span className={cn("text-xs", variant === "feature" ? "text-paper/70" : "opacity-80")}>
          Source : {sourceNames.join(", ")}
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-spring)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5",
            variant === "feature" ? "bg-paper/10" : variant === "tint" ? "bg-rose-ink/10" : "bg-surface-2",
          )}
        >
          <ArrowUpRight size={18} weight="bold" />
        </span>
      </div>
    </Link>
  );
}
