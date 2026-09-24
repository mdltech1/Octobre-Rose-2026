import type { Article } from "@/types/content";

/** Texte brut d'une fiche, pour la lecture audio. */
export function articleToPlainText(article: Article) {
  const parts: string[] = [article.title + ".", article.summary];
  for (const block of article.blocks) {
    if (block.type === "paragraph" || block.type === "quote") parts.push(block.text);
    if (block.type === "list") parts.push(block.items.join(" "));
    if (block.type === "myth") parts.push(`Idée reçue : ${block.myth} Ce que dit la source : ${block.fact}`);
  }
  return parts.join(" ");
}
