/** Utilitaires YouTube : aucune vidéo n'est téléchargée ni réhébergée. */

export function youtubeWatchUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

/** Domaine youtube-nocookie : pas de cookie publicitaire avant la lecture. */
export function youtubeEmbedUrl(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}`;
}

export function youtubeThumbnail(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}

export function youtubeAutoplayUrl(embedUrl: string) {
  const sep = embedUrl.includes("?") ? "&" : "?";
  return `${embedUrl}${sep}autoplay=1&rel=0&modestbranding=1&hl=fr&cc_lang_pref=fr`;
}
