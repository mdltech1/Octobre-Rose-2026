"use client";

import { useCallback, useEffect, useState } from "react";

/**
 * Lecture vocale locale (Web Speech API), en français.
 * Rien n'est envoyé à un serveur : la voix est produite par l'appareil.
 */
export function useSpeech() {
  const [supported, setSupported] = useState<boolean | null>(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    const ok = typeof window !== "undefined" && "speechSynthesis" in window;
    setSupported(ok);
    return () => {
      if (ok) window.speechSynthesis.cancel();
    };
  }, []);

  const stop = useCallback(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const speak = useCallback((text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const synth = window.speechSynthesis;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "fr-FR";
    u.rate = 0.95;
    const fr = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("fr"));
    if (fr) u.voice = fr;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    setSpeaking(true);
    synth.speak(u);
  }, []);

  const toggle = useCallback((text: string) => (speaking ? stop() : speak(text)), [speak, speaking, stop]);

  return { supported, speaking, speak, stop, toggle };
}
