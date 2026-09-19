export type Lang = "tr" | "en" | "de" | "ar";

export type Localized<T> = Record<Lang, T>;

export const LANGS: Lang[] = ["tr", "en", "de", "ar"];

/**
 * The homepage (index.html) has no per-language URL — language there is client-only
 * React state (App.tsx), not a route. A bare `href="/"` from any other page always lands
 * on the Turkish homepage regardless of the language you were just reading in. This keeps
 * the canonical `/` URL untouched (no new routes, no broken backlinks) while letting
 * App.tsx recover the language via `?lang=` on load.
 */
export function homeHref(lang: Lang): string {
  return lang === "tr" ? "/" : `/?lang=${lang}`;
}
