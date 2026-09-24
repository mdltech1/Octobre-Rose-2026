import { CaretDown } from "@phosphor-icons/react/dist/ssr";
import { getSourcesByIds } from "@/lib/content";
import type { FaqItem } from "@/types/content";

/** Questions fréquentes : éléments <details> natifs, accessibles au clavier sans JavaScript. */
export function FaqList({ items }: { items: FaqItem[] }) {
  return (
    <div className="grid gap-3">
      {items.map((item) => {
        const sources = getSourcesByIds(item.sourceIds);
        return (
          <details key={item.id} className="group rounded-[1.5rem] bg-surface ring-1 ring-line open:shadow-soft">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-lg font-semibold tracking-tight text-ink [&::-webkit-details-marker]:hidden">
              {item.question}
              <span className="grid size-9 shrink-0 place-items-center rounded-full bg-surface-2 transition-transform duration-500 ease-[var(--ease-spring)] group-open:rotate-180" aria-hidden="true">
                <CaretDown size={16} weight="bold" />
              </span>
            </summary>
            <div className="px-5 pb-5">
              <p className="max-w-[68ch] leading-relaxed text-ink-soft">{item.answer}</p>
              {sources.length ? (
                <p className="mt-3 text-sm text-ink-soft">
                  Source :{" "}
                  {sources.map((s, i) => (
                    <span key={s.id}>
                      {i > 0 ? ", " : ""}
                      <a href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-ink underline underline-offset-4">
                        {s.shortName}
                      </a>
                    </span>
                  ))}
                </p>
              ) : null}
            </div>
          </details>
        );
      })}
    </div>
  );
}
