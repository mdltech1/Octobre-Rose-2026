"use client";

import { useCallback, useEffect, useId, useState, useSyncExternalStore } from "react";

/**
 * Lecture vocale locale (Web Speech API), en français.
 * Rien n'est envoyé à un serveur : la voix est produite par l'appareil.
 *
 * Une seule lecture à la fois pour tout le site : l'état est partagé, ce qui permet au
 * lecteur fixe (SpeechBar) de suivre et d'arrêter la lecture lancée depuis n'importe quel bouton.
 * Le texte est lu phrase par phrase : certaines voix de Chrome s'arrêtent seules sur un long texte.
 */
export interface SpeechState {
  /** Identifiant du bouton qui a lancé la lecture. */
  ownerId: string;
  /** Ce qui est lu (titre de la fiche…), affiché par le lecteur fixe. */
  label: string;
  /** Phrase en cours (à partir de 0) et nombre de phrases. */
  index: number;
  total: number;
}

let state: SpeechState | null = null;
const listeners = new Set<() => void>();

function setState(next: SpeechState | null) {
  state = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const isSupported = () => typeof window !== "undefined" && "speechSynthesis" in window;

/** Découpe en phrases (ponctuation forte), en regroupant les fragments trop courts. */
function toSentences(text: string) {
  // Sans « lookbehind » dans l'expression régulière : non supporté avant iOS 16.4
  const parts = (text.match(/[^.!?;:]+[.!?;:]*/g) ?? []).map((p) => p.trim()).filter(Boolean);
  const out: string[] = [];
  for (const part of parts) {
    if (out.length && out[out.length - 1].length < 40) out[out.length - 1] += ` ${part}`;
    else out.push(part);
  }
  return out;
}

export function stopSpeech() {
  if (isSupported()) window.speechSynthesis.cancel();
  setState(null);
}

function startSpeech(ownerId: string, text: string, label: string) {
  if (!isSupported()) return;
  const synth = window.speechSynthesis;
  synth.cancel();
  const sentences = toSentences(text);
  if (!sentences.length) return;
  const voice = synth.getVoices().find((v) => v.lang.toLowerCase().startsWith("fr"));
  setState({ ownerId, label, index: 0, total: sentences.length });

  sentences.forEach((sentence, i) => {
    const u = new SpeechSynthesisUtterance(sentence);
    u.lang = "fr-FR";
    u.rate = 0.95;
    if (voice) u.voice = voice;
    u.onstart = () => {
      if (state?.ownerId === ownerId) setState({ ...state, index: i });
    };
    // Fin de la dernière phrase, ou erreur : la lecture est terminée
    u.onend = () => {
      if (i === sentences.length - 1 && state?.ownerId === ownerId) setState(null);
    };
    u.onerror = () => {
      if (state?.ownerId === ownerId) setState(null);
    };
    synth.speak(u);
  });
}

/** État partagé de la lecture en cours (null si rien n'est lu). */
export function useSpeechState() {
  return useSyncExternalStore(
    subscribe,
    () => state,
    () => null,
  );
}

/** Contrôle de la lecture pour un bouton : `speaking` n'est vrai que pour le bouton qui lit. */
export function useSpeech() {
  const ownerId = useId();
  const current = useSpeechState();
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    setSupported(isSupported());
  }, []);

  const speaking = current?.ownerId === ownerId;
  const speak = useCallback((text: string, label: string) => startSpeech(ownerId, text, label), [ownerId]);
  const toggle = useCallback(
    (text: string, label: string) => (speaking ? stopSpeech() : startSpeech(ownerId, text, label)),
    [ownerId, speaking],
  );

  return { supported, speaking, speak, stop: stopSpeech, toggle };
}
