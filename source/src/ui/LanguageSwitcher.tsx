import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LANGS } from "../content/types";
import type { Lang } from "../content/types";

const FLAG: Record<Lang, string> = { tr: "🇹🇷", en: "🇬🇧", de: "🇩🇪", ar: "🇸🇦" };
const LABEL: Record<Lang, string> = { tr: "Türkçe", en: "English", de: "Deutsch", ar: "العربية" };
const CODE: Record<Lang, string> = { tr: "TR", en: "EN", de: "DE", ar: "AR" };
const SWITCHER_LABEL: Record<Lang, string> = { tr: "Dil seçimi", en: "Language selection", de: "Sprachauswahl", ar: "اختيار اللغة" };

/**
 * Real language switcher — changes the app's active `Lang`, which drives the fully
 * translated header/footer/contact strings already in site.ts. Distinct from the
 * WhatsApp widget's contact number, which now follows this selection instead of
 * exposing its own flags.
 */
export function LanguageSwitcher({
  lang,
  onChange,
  dark,
}: {
  lang: Lang;
  onChange: (lang: Lang) => void;
  dark: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={SWITCHER_LABEL[lang]}
        aria-expanded={open}
        className={`flex items-center gap-1.5 min-h-11 rounded-full border px-2.5 py-1.5 text-xs font-bold tracking-wide transition-colors ${
          dark
            ? "border-navy/15 text-navy/80 hover:border-navy/30"
            : "border-white/25 text-white/85 hover:border-white/50"
        }`}
      >
        <span aria-hidden="true">{FLAG[lang]}</span>
        <span className="font-mono">{CODE[lang]}</span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full end-0 mt-2 min-w-[160px] rounded-lg border border-navy/10 bg-white shadow-xl p-1.5 z-50"
          >
            {LANGS.map((l) => (
              <button
                key={l}
                type="button"
                onClick={() => {
                  onChange(l);
                  setOpen(false);
                }}
                className={`flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm text-start transition-colors ${
                  l === lang ? "bg-accent/10 text-accent-deep font-semibold" : "text-navy hover:bg-navy/5"
                }`}
              >
                <span aria-hidden="true">{FLAG[l]}</span>
                {LABEL[l]}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
