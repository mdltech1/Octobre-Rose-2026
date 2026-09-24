"use client";

import { useEffect } from "react";

/** Enregistre le service worker (public/sw.js) en production, pour la consultation hors connexion. */
export function ServiceWorker() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
  }, []);

  return null;
}
