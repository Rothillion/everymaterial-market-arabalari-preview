import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "../content/site";
import { LANGS } from "../content/types";
import type { Lang } from "../content/types";
import { trackWhatsAppContact } from "../lib/analytics";

const REP_LABEL: Record<Lang, string> = {
  tr: "Türkçe temsilcimiz",
  en: "English-speaking representative",
  de: "Deutschsprachiger Vertreter",
  ar: "ممثلنا الناطق بالعربية",
};

const FLAG: Record<Lang, string> = { tr: "🇹🇷", en: "🇬🇧", de: "🇩🇪", ar: "🇸🇦" };
const CODE: Record<Lang, string> = { tr: "TR", en: "EN", de: "DE", ar: "AR" };
const PICK_REP_LABEL: Record<Lang, string> = {
  tr: "Hangi dilde yazmak istersiniz?",
  en: "Which language would you like to write in?",
  de: "In welcher Sprache möchten Sie schreiben?",
  ar: "بأي لغة تريد الكتابة؟",
};

const FORM_TITLE: Record<Lang, string> = {
  tr: "WhatsApp'tan yazın",
  en: "Message us on WhatsApp",
  de: "Schreiben Sie uns auf WhatsApp",
  ar: "راسلنا عبر واتساب",
};

const NAME_LABEL: Record<Lang, string> = { tr: "Adınız", en: "Your name", de: "Ihr Name", ar: "اسمك" };
const SEND_LABEL: Record<Lang, string> = { tr: "WhatsApp'ta Aç", en: "Open in WhatsApp", de: "In WhatsApp öffnen", ar: "افتح في واتساب" };
const CLOSE_LABEL: Record<Lang, string> = { tr: "Kapat", en: "Close", de: "Schließen", ar: "إغلاق" };

/**
 * Single WhatsApp entry point, lang-aware (real per-language rep number/message already
 * in site.ts). Clicking opens a small glass form instead of navigating straight to
 * wa.me; submitting builds the chat link with the (optionally personalized) message and
 * opens it in a new tab. The icon is a transparent/outline mark — no flat WhatsApp green.
 */
export function WhatsAppButton({ lang }: { lang: Lang }) {
  const [open, setOpen] = useState(false);
  const [waLang, setWaLang] = useState<Lang>(lang);
  const [name, setName] = useState("");
  const [message, setMessage] = useState(siteContent[lang].contact.whatsappText);
  const c = siteContent[waLang];

  function openForm() {
    setWaLang(lang);
    setMessage(siteContent[lang].contact.whatsappText);
    setOpen(true);
  }

  function pickLang(l: Lang) {
    setWaLang(l);
    setMessage(siteContent[l].contact.whatsappText);
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const text = name.trim() ? `${message} — ${name.trim()}` : message;
    const href = `https://wa.me/${c.contact.whatsappNumber}?text=${encodeURIComponent(text)}`;
    trackWhatsAppContact();
    window.open(href, "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <>
      <motion.button
        type="button"
        onClick={openForm}
        aria-label={FORM_TITLE[lang]}
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="fixed left-4 bottom-4 z-40 w-12 h-12 rounded-full bg-navy-deep/85 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-center text-white"
      >
        <svg viewBox="0 0 32 32" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.02 3C9.4 3 4 8.4 4 15.02c0 2.22.6 4.3 1.63 6.1L4 29l8.06-1.6a12.9 12.9 0 0 0 3.96.62h.01c6.62 0 12.02-5.4 12.02-12.02C28.05 8.4 22.65 3 16.02 3Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21.85 16.09c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.51-.16-.72.16-.21.32-.83 1.04-1.02 1.25-.19.21-.37.24-.69.08-.32-.16-1.36-.5-2.6-1.6-.96-.85-1.6-1.91-1.79-2.23-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.53-.54-.72-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67 0 1.57 1.15 3.09 1.3 3.3.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.67.77.24 1.46.21 2.02.13.62-.09 1.89-.77 2.15-1.51.27-.75.27-1.38.19-1.51-.08-.13-.29-.21-.61-.37Z"
          />
        </svg>
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40 bg-navy-deep/50 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={FORM_TITLE[lang]}
              initial={{ opacity: 0, y: 16, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="fixed left-4 bottom-20 z-50 w-[calc(100%-2rem)] max-w-[320px] rounded-2xl bg-navy-deep/95 backdrop-blur-md border border-white/15 shadow-2xl p-5 text-white"
            >
              <h3 className="font-display text-base font-bold mb-1">{FORM_TITLE[lang]}</h3>
              <p className="text-xs text-onNavy-faint mb-2">{PICK_REP_LABEL[lang]}</p>
              <div className="flex items-center gap-1.5 mb-3" role="group" aria-label={PICK_REP_LABEL[lang]}>
                {LANGS.map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => pickLang(l)}
                    aria-pressed={l === waLang}
                    className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-bold transition-colors ${
                      l === waLang
                        ? "bg-accent-deep border-accent-deep text-white"
                        : "border-white/20 text-onNavy-muted hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <span aria-hidden="true">{FLAG[l]}</span>
                    {CODE[l]}
                  </button>
                ))}
              </div>
              <p className="text-xs text-onNavy-faint mb-4">{REP_LABEL[waLang]}</p>
              <form onSubmit={submit} className="flex flex-col gap-3">
                <input
                  type="text"
                  name="whatsapp-name"
                  id="whatsapp-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={NAME_LABEL[lang]}
                  className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-white placeholder:text-onNavy-faint focus:outline-none focus:border-accent"
                />
                <textarea
                  name="whatsapp-message"
                  id="whatsapp-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg bg-white/10 border border-white/15 px-3 py-2 text-sm text-white focus:outline-none focus:border-accent resize-none"
                />
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="submit"
                    className="flex-1 rounded-lg bg-accent-deep hover:bg-accent-deepHover text-white text-sm font-bold py-2.5 transition-colors"
                  >
                    {SEND_LABEL[lang]}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-lg border border-white/15 text-onNavy-muted text-sm font-semibold px-3 py-2.5 hover:text-white transition-colors"
                  >
                    {CLOSE_LABEL[lang]}
                  </button>
                </div>
              </form>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
