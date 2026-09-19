import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { exportConsultancyContent } from "../content/exportConsultancy";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { homeHref, type Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

const ICON_PATHS: Record<string, React.ReactNode> = {
  market: (
    <>
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="18" y1="20" x2="18" y2="10" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
    </>
  ),
  legal: (
    <>
      <line x1="12" y1="3" x2="12" y2="21" />
      <line x1="5" y1="21" x2="19" y2="21" />
      <line x1="7" y1="7" x2="17" y2="7" />
      <path d="M7 7l-4 8a4 4 0 0 0 8 0l-4-8z" />
      <path d="M17 7l-4 8a4 4 0 0 0 8 0l-4-8z" />
    </>
  ),
  logistics: (
    <>
      <rect x="2.5" y="8" width="11" height="9" rx="1" />
      <path d="M13.5 11h4l3 3v3h-7z" />
      <circle cx="7" cy="18.5" r="1.7" />
      <circle cx="17" cy="18.5" r="1.7" />
    </>
  ),
  docs: (
    <>
      <rect x="6" y="3.5" width="12" height="17" rx="1.5" />
      <line x1="9" y1="8" x2="15" y2="8" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="16" x2="13" y2="16" />
    </>
  ),
  handshake: (
    <>
      <circle cx="8" cy="8" r="3" />
      <circle cx="16" cy="8" r="3" />
      <path d="M2 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M10 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
    </>
  ),
};

function ServiceIcon({ name, className }: { name: string; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {ICON_PATHS[name]}
    </svg>
  );
}

/**
 * Faz 3e: İhracat Danışmanlığı — "Numbered List Variant" picked from 5 Stitch designs,
 * ported from its original dark theme into the site's light "Cinematic Industrial" body
 * (only the photo hero stays visually dark, same convention as elsewhere in v2). Real
 * content ported from .deploy/ihracat-danismanligi-{lang}.html.
 */
export function ExportConsultancyPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const c = exportConsultancyContent[lang];
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/ihracat-danismanligi-${l}.html`;
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="export" onLangChange={navigateToLang} />

      <section className="relative min-h-[60vh] flex items-center justify-center py-24 overflow-hidden">
        <div className="absolute inset-0 z-0" aria-hidden="true">
          <img src={c.heroImage} alt="" className="w-full h-full object-cover brightness-[0.55]" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/30 via-navy-deep/50 to-[#fbfcfe]" />
        </div>
        <div className="max-w-[1200px] mx-auto px-6 lg:px-10 relative z-10 text-center">
          <nav className="flex items-center justify-center gap-2 mb-8 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">{c.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-accent">{c.breadcrumbCurrent}</span>
          </nav>
          <div className="inline-block max-w-3xl bg-white/75 backdrop-blur-md border-t-4 border-accent rounded-2xl shadow-2xl p-10 md:p-14">
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-navy mb-5 uppercase leading-tight">{c.pageTitle}</h1>
            <p className="text-base text-[#5b6b7d] max-w-xl mx-auto leading-relaxed">{c.heroLead}</p>
          </div>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-10">
        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerChildren}>
          <section className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-center">
              <div className="md:col-span-7 space-y-10">
                <motion.div variants={staggerItem} className="space-y-4">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-navy uppercase tracking-tight">
                    <span className="text-accent me-3">//</span>{c.introTitle1}
                  </h2>
                  <p className="text-[15.5px] leading-relaxed text-[#5b6b7d] border-s-2 border-navy/10 ps-6">{c.introBody1}</p>
                </motion.div>
                <motion.div variants={staggerItem} className="space-y-4">
                  <h2 className="font-display text-xl md:text-2xl font-bold text-navy uppercase tracking-tight">
                    <span className="text-accent me-3">//</span>{c.introTitle2}
                  </h2>
                  <p className="text-[15.5px] leading-relaxed text-[#5b6b7d] border-s-2 border-navy/10 ps-6">{c.introBody2}</p>
                </motion.div>
              </div>
              <motion.div variants={staggerItem} className="md:col-span-5 relative">
                <div className="absolute -top-8 -end-8 w-40 h-40 bg-accent/10 rounded-full blur-[80px]" aria-hidden="true" />
                <img
                  src={c.heroImage}
                  alt={c.heroImageAlt}
                  className="relative z-10 w-full aspect-square object-cover grayscale hover:grayscale-0 transition-all duration-700 rounded-xl border-t-4 border-e-4 border-accent p-2 bg-white shadow-xl"
                />
              </motion.div>
            </div>
          </section>

          <section className="py-16 md:py-24 -mx-6 lg:-mx-10 px-6 lg:px-10 bg-navy/[0.03] border-y border-navy/10">
            <div className="max-w-[1200px] mx-auto">
              <motion.div variants={staggerItem} className="mb-14 flex flex-wrap items-end justify-between gap-6 border-b border-navy/10 pb-10">
                <h2 className="font-display text-2xl md:text-3xl font-extrabold text-navy uppercase">{c.servicesTitle}</h2>
              </motion.div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-12">
                {c.services.map((service, i) => (
                  <motion.div key={service.title} variants={staggerItem} className="flex items-start gap-6 group">
                    <span
                      className="font-display text-5xl font-extrabold leading-none shrink-0"
                      style={{ WebkitTextStroke: "1px #a04100", color: "transparent" }}
                      aria-hidden="true"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="flex gap-5 items-start">
                      <div className="w-12 h-12 shrink-0 bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg flex items-center justify-center text-accent-deep" aria-hidden="true">
                        <ServiceIcon name={service.icon} className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-bold text-navy mb-2 uppercase tracking-tight group-hover:text-accent-deep transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-sm leading-relaxed text-[#5b6b7d]">{service.body}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          <motion.div
            variants={staggerItem}
            className="my-16 bg-navy-deep rounded-2xl p-10 md:p-16 text-center"
          >
            <h2 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-8 uppercase">{c.ctaTitle}</h2>
            <p className="text-sm text-onNavy-muted max-w-md mx-auto mb-8">{c.ctaBody}</p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-5">
              <a
                href={site.contact.phoneHref}
                className="bg-accent-deep hover:bg-accent-deepHover text-white font-bold text-sm uppercase tracking-widest rounded-lg px-10 py-4 transition-colors"
              >
                {site.contact.phone}
              </a>
              <a
                href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappText)}`}
                target="_blank"
                rel="noreferrer"
                onClick={trackWhatsAppContact}
                className="bg-white/10 border border-white/15 text-white font-bold text-sm uppercase tracking-widest rounded-lg px-10 py-4 hover:bg-white/15 transition-colors"
              >
                {site.nav.callButton}
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
