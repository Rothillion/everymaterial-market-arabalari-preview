import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { updatesContent } from "../content/updates";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { homeHref, type Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

/**
 * Faz 3i: Gelişmeler — "Updates: Minimalist Variant" picked from a 5-variant Stitch round,
 * ported into the site's navy/accent tokens. Real content: the source page is a genuine
 * empty state (no updates have been published yet), so there is no listing/detail pattern
 * here, only this single centered empty-state card pointing to the real Blog page.
 */
export function UpdatesPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const c = updatesContent[lang];
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/gelismeler-${l}.html`;
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen flex flex-col">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="updates" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-20 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10 text-center">
          <nav className="flex items-center justify-center gap-3 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">{c.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-white">{c.breadcrumbCurrent}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">{c.pageTitle}</h1>
          <p className="text-base text-onNavy-bright max-w-xl mx-auto leading-relaxed">{c.heroLead}</p>
        </div>
      </section>

      <main className="flex-grow flex items-center justify-center px-6 lg:px-10 py-20 md:py-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="max-w-xl w-full bg-white border border-navy/10 rounded-2xl shadow-xl p-10 md:p-16 flex flex-col items-center text-center"
        >
          <motion.span
            variants={staggerItem}
            className="w-16 h-16 rounded-full bg-accent/10 text-accent-deep flex items-center justify-center text-3xl mb-8"
            aria-hidden="true"
          >
            🔔
          </motion.span>
          <motion.h2 variants={staggerItem} className="font-display text-xl md:text-2xl font-extrabold text-navy mb-4">
            {c.emptyTitle}
          </motion.h2>
          <motion.p variants={staggerItem} className="text-[15px] leading-relaxed text-[#5b6b7d] max-w-md mb-10">
            {c.emptyBody}
          </motion.p>
          <motion.a
            variants={staggerItem}
            href={`/blog-${lang}.html`}
            className="inline-flex items-center gap-2 bg-accent-deep hover:bg-accent-deepHover text-white font-bold text-sm uppercase tracking-widest rounded-full px-8 py-4 transition-colors"
          >
            {c.emptyCta} <span className="rtl:rotate-180">→</span>
          </motion.a>
        </motion.div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
