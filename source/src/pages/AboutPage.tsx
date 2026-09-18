import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { aboutContent } from "../content/about";
import { homeContent } from "../content/home";
import { CATEGORY_SLUGS } from "../content/productCategoryContent";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

const EXPERTISE_INDICES = [0, 5, 7, 8];

const EXPERTISE_ICONS: React.ReactNode[] = [
  // Pleksi Teşhir Ekipmanları (display case)
  <>
    <rect x="4" y="8" width="16" height="12" rx="1" />
    <path d="M4 8l8-5 8 5" />
  </>,
  // Market Ekipmanları (basket)
  <>
    <path d="M4 9h16l-1.5 9.3A2 2 0 0 1 16.5 20h-9a2 2 0 0 1-2-1.7L4 9z" />
    <path d="M8 9V6a4 4 0 0 1 8 0v3" />
  </>,
  // Makineler (gear)
  <>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1l2.1-2.1M17 7l2.1-2.1" />
  </>,
  // Dolaplar ve Depolama Sistemleri (cabinet)
  <>
    <rect x="5" y="3" width="14" height="18" rx="1" />
    <line x1="5" y1="12" x2="19" y2="12" />
    <circle cx="9" cy="7.5" r="0.6" fill="currentColor" />
    <circle cx="9" cy="16.5" r="0.6" fill="currentColor" />
  </>,
];

/**
 * Faz 3a pilot: first non-homepage page, proving the static multi-page pattern
 * (one HTML entry + mount file per language, see entry-about-{lang}.tsx) that the
 * rest of Faz 3's pages will follow. Language switching here navigates to the
 * sibling static page instead of flipping in-memory state (unlike HomePage's SPA).
 *
 * Layout: "Magazine Layout" — the Stitch variant picked for this page. An oversized
 * uppercase hero headline, an offset hero image with an overlapping glass pull-quote
 * panel, an asymmetric two-column narrative block, a real-category "expertise" grid,
 * and a sticky navy CTA rail with real stats (years of experience, partner countries).
 */
export function AboutPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const about = aboutContent[lang];
  const expertise = EXPERTISE_INDICES.map((i) => homeContent[lang].categories[i]);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/about-${l}.html`;
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="about" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-40 md:pb-56 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[500px] h-[500px] md:w-[800px] md:h-[800px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1440px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-6 md:mb-8 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted">
            <a href="/" className="hover:text-white transition-colors">
              {about.breadcrumbHome}
            </a>
            <span className="opacity-50" aria-hidden="true">
              /
            </span>
            <span className="text-white">{about.breadcrumbCurrent}</span>
          </nav>
          <h1 className="font-display text-[16vw] sm:text-[80px] md:text-[110px] leading-[0.9] uppercase font-black text-white/90 -ms-1 select-none">
            {about.pageTitle}
          </h1>
        </div>
      </section>

      <main className="max-w-[1440px] mx-auto px-6 lg:px-10 -mt-28 md:-mt-32 pb-20 md:pb-28">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-16 md:gap-y-24"
        >
          <div className="lg:col-span-8 space-y-16 md:space-y-24">
            <motion.div variants={staggerItem} className="relative">
              <div className="w-11/12 ms-auto aspect-[16/9] overflow-hidden rounded-xl shadow-2xl">
                <img src={about.heroImage} alt={about.heroImageAlt} className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-10 md:-bottom-12 start-0 w-3/4 md:w-1/2 bg-white/75 backdrop-blur-md border border-navy/10 rounded-xl shadow-xl p-6 md:p-9">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-9 h-1 bg-accent-deep shrink-0" aria-hidden="true" />
                  <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-accent-deep">
                    {about.statYears} {about.statYearsLabel}
                  </span>
                </div>
                <h2 className="font-display text-xl md:text-2xl font-bold text-navy uppercase leading-tight mb-4">
                  {about.bodyHeading}
                </h2>
                <p className="text-sm text-[#5b6b7d] italic leading-relaxed">&ldquo;{about.pullQuote}&rdquo;</p>
              </div>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center pt-6 md:pt-10"
            >
              <div className="order-2 md:order-1 space-y-6">
                <h3 className="inline-block font-display text-lg font-bold uppercase text-navy border-b-4 border-accent pb-1">
                  {about.bodyHeading}
                </h3>
                <div className="space-y-5 text-[15.5px] leading-relaxed text-[#5b6b7d]">
                  <p>{about.paragraphs[0]}</p>
                  <p>{about.paragraphs[1]}</p>
                </div>
              </div>
              <div className="order-1 md:order-2 relative ps-8 md:ps-12">
                <div className="absolute inset-0 bg-accent/5 rounded-lg translate-x-3 translate-y-3 rtl:-translate-x-3" aria-hidden="true" />
                <img
                  src={about.ctaImage}
                  alt="Every Material"
                  className="relative z-10 w-full h-auto rounded-lg grayscale hover:grayscale-0 transition-all duration-700 shadow-xl"
                />
              </div>
            </motion.div>

            <motion.p variants={staggerItem} className="text-[15.5px] leading-relaxed text-[#5b6b7d] max-w-[72ch]">
              {about.paragraphs[2]}
            </motion.p>

            <motion.div variants={staggerItem} className="space-y-8 md:space-y-10">
              <div className="max-w-2xl">
                <h4 className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-deep mb-2">
                  {about.expertiseLabel}
                </h4>
                <p className="text-[#5b6b7d]">{about.expertiseIntro}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {expertise.map((cat, i) => (
                  <a
                    key={cat.name}
                    href={`/kategoriler-${lang}.html?slug=${CATEGORY_SLUGS[EXPERTISE_INDICES[i]]}`}
                    className="group relative overflow-hidden bg-white border border-navy/10 hover:border-transparent rounded-lg p-6 md:p-7 transition-colors duration-300"
                  >
                    <div
                      className="absolute inset-0 bg-navy-deep opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-accent-deep mb-4">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6" aria-hidden="true">
                          {EXPERTISE_ICONS[i]}
                        </svg>
                      </div>
                      <h5 className="font-display text-base font-bold text-navy group-hover:text-white transition-colors">
                        {cat.name}
                      </h5>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <div className="lg:col-span-4">
            <motion.div variants={staggerItem} className="lg:sticky lg:top-28 space-y-5">
              <div className="relative overflow-hidden bg-navy-deep text-white rounded-2xl p-8 md:p-10 shadow-2xl">
                <div
                  className="absolute inset-0 opacity-[0.06] pointer-events-none"
                  style={{ backgroundImage: "radial-gradient(#fff 1px, transparent 1px)", backgroundSize: "20px 20px" }}
                  aria-hidden="true"
                />
                <div className="relative z-10 space-y-7">
                  <h3 className="font-display text-xl font-bold leading-tight">{about.ctaTitle}</h3>
                  <div className="flex items-end gap-6">
                    <div>
                      <span className="block font-display text-4xl font-extrabold text-accent leading-none">
                        {about.statYears}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-onNavy-faint">
                        {about.statYearsLabel}
                      </span>
                    </div>
                    <div>
                      <span className="block font-display text-4xl font-extrabold text-accent leading-none">
                        {about.statCountries}
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-widest text-onNavy-faint">
                        {about.statCountriesLabel}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`/iletisim-${lang}.html`}
                    className="group/btn flex items-center justify-center gap-2 w-full bg-accent-deep hover:bg-accent-deepHover text-white font-bold text-sm uppercase tracking-widest rounded-lg px-5 py-4 transition-colors"
                  >
                    {about.ctaButton}
                    <span
                      className="inline-block transition-transform group-hover/btn:translate-x-1 rtl:rotate-180 rtl:group-hover/btn:-translate-x-1"
                      aria-hidden="true"
                    >
                      →
                    </span>
                  </a>
                </div>
              </div>
              <a
                href={`/katalog-${lang}.html`}
                className="flex items-center gap-5 bg-white/70 backdrop-blur-md border border-navy/10 rounded-2xl p-6 hover:border-accent/40 transition-colors"
              >
                <span
                  className="shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-xl"
                  aria-hidden="true"
                >
                  📖
                </span>
                <span className="font-bold text-sm text-navy">{site.footer.catalogLink}</span>
              </a>
            </motion.div>
          </div>
        </motion.div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
