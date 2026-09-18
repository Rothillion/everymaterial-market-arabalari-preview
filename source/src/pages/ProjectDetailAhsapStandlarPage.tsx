import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { projectDetailContent } from "../content/projects";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

/**
 * Faz 3f: Ahşap Standlar — the only Projeler item with real detail content (14 real
 * gallery photos). Reuses the established navy-hero + glass-card page pattern.
 */
export function ProjectDetailAhsapStandlarPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const c = projectDetailContent[lang];
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/proje-ahsap-standlar-${l}.html`;
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="projects" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-16 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted flex-wrap">
            <a href="/" className="hover:text-white transition-colors">{c.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <a href={`/projeler-${lang}.html`} className="hover:text-white transition-colors">{c.breadcrumbProjects}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-white">{c.breadcrumbCurrent}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white uppercase">{c.pageTitle}</h1>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerChildren}>
          <motion.div variants={staggerItem} className="rounded-2xl overflow-hidden shadow-xl mb-16 -mt-24 md:-mt-32 relative z-10 max-h-[520px]">
            <img src={c.heroImage} alt={c.pageTitle} className="w-full h-full object-cover max-h-[520px]" />
          </motion.div>

          <motion.h2 variants={staggerItem} className="font-display text-2xl font-extrabold text-navy mb-7">
            {c.galleryTitle}
          </motion.h2>
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 mb-16 [column-fill:_balance]">
            {c.gallery.map((img) => (
              <motion.a
                key={img}
                variants={staggerItem}
                href={img}
                target="_blank"
                rel="noreferrer"
                className="block mb-4 rounded-lg overflow-hidden shadow-md break-inside-avoid"
              >
                <img src={img} alt={c.pageTitle} className="w-full h-auto transition-transform duration-500 hover:scale-105" loading="lazy" />
              </motion.a>
            ))}
          </div>

          <motion.div
            variants={staggerItem}
            className="bg-navy-deep rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6"
          >
            <div>
              <h3 className="font-display text-xl font-bold text-white mb-2">{c.ctaTitle}</h3>
              <p className="text-sm text-onNavy-muted max-w-md">{c.ctaBody}</p>
            </div>
            <div className="flex items-center gap-5 flex-wrap">
              <a
                href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                onClick={trackWhatsAppContact}
                className="bg-accent-deep hover:bg-accent-deepHover text-white text-sm font-bold uppercase tracking-wide rounded-lg px-6 py-3.5 transition-colors"
              >
                {site.nav.callButton}
              </a>
              <a href={site.contact.phoneHref} className="text-white font-bold text-sm hover:text-accent transition-colors">
                {site.contact.phone}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
