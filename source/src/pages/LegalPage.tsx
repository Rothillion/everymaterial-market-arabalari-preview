import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import type { LegalPageContent } from "../content/legal";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

/**
 * Shared long-form article layout for the KVKK disclosure and Cookie Policy pages —
 * both real legal/compliance documents rather than marketing content, so this reuses
 * the site's navy-hero + white-card pattern without any decorative embellishment.
 */
export function LegalPage({
  lang,
  content,
  navigateHref,
}: {
  lang: Lang;
  content: LegalPageContent;
  navigateHref: (l: Lang) => string;
}) {
  const site = siteContent[lang];
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = navigateHref(l);
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="legal" onLangChange={navigateToLang} />

      <section className="pt-32 pb-16 md:pb-20 px-6 lg:px-10 bg-navy-deep">
        <div className="max-w-[900px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-onNavy-muted mb-3">
            <a href="/" className="hover:text-white transition-colors">
              {content.breadcrumbHome}
            </a>
            <span className="text-onNavy-faint" aria-hidden="true">
              /
            </span>
            <span className="text-white font-semibold">{content.breadcrumbCurrent}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">{content.pageTitle}</h1>
          <p className="font-mono text-xs uppercase tracking-widest text-onNavy-muted">
            {content.updatedLabel}: {content.updatedDate}
          </p>
        </div>
      </section>

      <main className="max-w-[900px] mx-auto px-6 lg:px-10 py-16 md:py-20">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerChildren} className="space-y-10">
          <motion.p variants={staggerItem} className="text-[15.5px] leading-relaxed text-[#5b6b7d] max-w-[72ch]">
            {content.intro}
          </motion.p>

          {content.sections.map((section) => (
            <motion.section key={section.heading} variants={staggerItem}>
              <h2 className="font-display text-xl font-bold text-navy mb-4">{section.heading}</h2>
              {section.paragraphs?.map((p, i) => (
                <p key={i} className="text-[15px] leading-relaxed text-[#5b6b7d] max-w-[72ch] mb-3">
                  {p}
                </p>
              ))}
              {section.list && (
                <ul className="flex flex-col gap-2.5 mt-2">
                  {section.list.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-[#5b6b7d] max-w-[72ch]">
                      <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent-deep mt-2.5" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.section>
          ))}
        </motion.div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
