export type Lang = "tr" | "en" | "de" | "ar";

export type Localized<T> = Record<Lang, T>;

export const LANGS: Lang[] = ["tr", "en", "de", "ar"];
