import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { catalogContent } from "../content/catalog";
import { categoryContent } from "../content/categoryContent";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { homeHref, type Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

const CHROME = {
  tr: { filterLabel: "Kapasiteye Göre Filtrele", all: "Tümü", small: "≤100L", mid: "101–150L", large: "151L+", count: (n: number) => `${n} ürün gösteriliyor`, seeAll: "Kataloğa Dön" },
  en: { filterLabel: "Filter by Capacity", all: "All", small: "≤100L", mid: "101–150L", large: "151L+", count: (n: number) => `Showing ${n} products`, seeAll: "Back to Catalog" },
  de: { filterLabel: "Nach Kapazität filtern", all: "Alle", small: "≤100L", mid: "101–150L", large: "151L+", count: (n: number) => `${n} Produkte werden angezeigt`, seeAll: "Zurück zum Katalog" },
  ar: { filterLabel: "تصفية حسب السعة", all: "الكل", small: "≤100 لتر", mid: "101–150 لتر", large: "+151 لتر", count: (n: number) => `عرض ${n} منتج`, seeAll: "العودة إلى الكتالوج" },
} as const;

function volumeBucket(volumeLabel: string): "small" | "mid" | "large" | null {
  const n = parseFloat(volumeLabel.replace(",", "."));
  if (Number.isNaN(n)) return null;
  if (n <= 100) return "small";
  if (n <= 150) return "mid";
  return "large";
}

/**
 * Faz 3d: reusable category page, scoped to the 2 real "market arabaları" families
 * (metal-yuk-tasima, alisveris-arabalari) per the user's confirmed scope. Restyles the
 * real .deploy/full-metal-*.html / full-plastic-*.html layout (hero, trust strip, capacity
 * filter chips, product grid) into the current v2 look instead of the old Inter/M3-token page.
 */
export function CategoryPage({ lang, familySlug }: { lang: Lang; familySlug: string }) {
  const site = siteContent[lang];
  const catalog = catalogContent[lang];
  const chrome = categoryContent[lang][familySlug];
  const t = CHROME[lang];
  const [filter, setFilter] = useState<"all" | "small" | "mid" | "large">("all");
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  const family = catalog.families.find((f) => f.slug === familySlug);

  const filtered = useMemo(() => {
    if (!family) return [];
    if (filter === "all") return family.products;
    return family.products.filter((p) => volumeBucket(p.volumeLabel) === filter);
  }, [family, filter]);

  if (!family) {
    return (
      <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
        <SiteHeader lang={lang} activePage="catalog" onLangChange={(l) => (window.location.href = `/katalog-${l}.html`)} />
        <main className="max-w-[900px] mx-auto px-6 py-32 text-center">
          <p className="text-navy">404</p>
        </main>
        <SiteFooter lang={lang} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="catalog" onLangChange={(l) => (window.location.href = `/kategori-${l}.html?aile=${familySlug}`)} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-16 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">{catalog.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <a href={`/katalog-${lang}.html`} className="hover:text-white transition-colors">{catalog.breadcrumbCurrent}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-white">{family.name}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl">{family.name}</h1>
          <p className="text-base text-onNavy-bright max-w-xl leading-relaxed">{family.description}</p>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        {chrome && chrome.trustPoints.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {chrome.trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-3 bg-white/70 backdrop-blur-md border border-navy/10 rounded-xl px-5 py-4">
                <span className="w-9 h-9 shrink-0 rounded-lg bg-accent/10 flex items-center justify-center text-accent-deep" aria-hidden="true">✓</span>
                <span className="text-sm font-semibold text-navy leading-tight">{point}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-2.5 mb-10 bg-white/60 border border-navy/10 rounded-xl p-3">
          <span className="font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] me-1">{t.filterLabel}</span>
          {(["all", "small", "mid", "large"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`rounded-full px-4 py-2 text-[13px] font-bold transition-colors ${
                filter === f ? "bg-accent-deep text-white" : "bg-white border border-navy/15 text-[#5b6b7d] hover:border-accent hover:text-accent-deep"
              }`}
            >
              {t[f]}
            </button>
          ))}
          <span className="ms-auto font-mono text-xs text-[#5b6b7d]">{t.count(filtered.length)}</span>
        </div>

        <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerChildren} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((p) => (
            <motion.a
              key={p.slug}
              variants={staggerItem}
              href={`/urun-${lang}.html?slug=${p.slug}`}
              className="group bg-white/70 backdrop-blur-md border border-navy/10 hover:border-accent/40 rounded-xl overflow-hidden shadow-md flex flex-col transition-colors"
            >
              <div className="aspect-[4/3] bg-white/60 flex items-center justify-center overflow-hidden">
                <img src={p.image} alt={p.alt} loading="lazy" className="w-full h-full object-contain p-2.5 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4 flex-1 flex flex-col gap-1.5 border-t border-navy/10">
                <h3 className="font-display text-[15px] font-bold text-navy leading-tight">{p.name}</h3>
                <div className="flex flex-col text-[12.5px] text-[#5b6b7d]">
                  <div className="flex justify-between border-b border-navy/10 py-1.5">
                    <span>Hacim</span>
                    <span className="font-semibold text-navy">{p.volumeLabel}</span>
                  </div>
                  {p.weightKg != null && (
                    <div className="flex justify-between border-b border-navy/10 py-1.5">
                      <span>Ağırlık</span>
                      <span className="font-semibold text-navy">{p.weightKg} kg</span>
                    </div>
                  )}
                  <div className="flex justify-between py-1.5">
                    <span>Malzeme</span>
                    <span className="font-semibold text-navy">{p.material}</span>
                  </div>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        <div className="mt-14 bg-navy-deep rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-2">{catalog.ctaTitle}</h3>
            <p className="text-sm text-onNavy-muted max-w-md">{catalog.ctaBody}</p>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <a href={`/katalog-${lang}.html`} className="bg-accent-deep hover:bg-accent-deepHover text-white text-sm font-bold uppercase tracking-wide rounded-lg px-6 py-3.5 transition-colors">
              {t.seeAll}
            </a>
            <a href={site.contact.phoneHref} className="text-white font-bold text-sm hover:text-accent transition-colors">
              {site.contact.phone}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
