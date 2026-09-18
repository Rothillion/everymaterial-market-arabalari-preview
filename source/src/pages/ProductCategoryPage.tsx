import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { homeContent } from "../content/home";
import { CATEGORY_SLUGS } from "../content/productCategoryContent";
import { productCatalogContent } from "../content/productCatalog";
import { rememberCatalogSelection } from "../content/productCatalogLookup";
import { getProductImageClass } from "../media/productMedia";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

const CHROME = {
  tr: { breadcrumbHome: "Ana Sayfa", breadcrumbCategories: "Kategoriler", count: (n: number) => `${n} ürün gösteriliyor`, empty: "Bu kategoride henüz ürün bulunmuyor." },
  en: { breadcrumbHome: "Home", breadcrumbCategories: "Categories", count: (n: number) => `Showing ${n} products`, empty: "No products in this category yet." },
  de: { breadcrumbHome: "Startseite", breadcrumbCategories: "Kategorien", count: (n: number) => `${n} Produkte werden angezeigt`, empty: "Noch keine Produkte in dieser Kategorie." },
  ar: { breadcrumbHome: "الرئيسية", breadcrumbCategories: "الفئات", count: (n: number) => `عرض ${n} منتج`, empty: "لا توجد منتجات في هذه الفئة بعد." },
} as const;

function useQuerySlug() {
  const [slug] = useState<string | null>(() => new URLSearchParams(window.location.search).get("slug"));
  return slug;
}

/**
 * Faz 3j: sitewide category landing page for the 9 real categories listed in SiteHeader's
 * "Kategoriler" dropdown. Real product grid (name/image/material/dims where known) sourced
 * from productCatalog.ts — 175 real products extracted from a full real-site archive the user
 * supplied, reusing the exact card/grid pattern from CategoryPage.tsx per their instruction.
 */
export function ProductCategoryPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const t = CHROME[lang];
  const slug = useQuerySlug();
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/kategoriler-${l}.html?slug=${slug ?? ""}`;
  }

  if (slug === null) return null;

  const index = CATEGORY_SLUGS.indexOf(slug as (typeof CATEGORY_SLUGS)[number]);
  const category = index >= 0 ? homeContent[lang].categories[index] : undefined;
  const family = index >= 0 ? productCatalogContent[lang][index] : undefined;

  if (!category || !family) {
    return (
      <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
        <SiteHeader lang={lang} activePage="catalog" onLangChange={(l) => (window.location.href = `/kategoriler-${l}.html`)} />
        <main className="max-w-[900px] mx-auto px-6 py-32 text-center">
          <p className="text-navy">404</p>
        </main>
        <SiteFooter lang={lang} />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen flex flex-col">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="catalog" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-16 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted">
            <a href="/" className="hover:text-white transition-colors">{t.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-onNavy-muted">{t.breadcrumbCategories}</span>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-white">{category.name}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4 max-w-2xl">{category.name}</h1>
        </div>
      </section>

      <main className="flex-grow max-w-[1400px] w-full mx-auto px-6 lg:px-10 py-12 md:py-16">
        {family.products.length === 0 ? (
          <p className="text-center text-[#5b6b7d] py-16">{t.empty}</p>
        ) : (
          <>
            <p className="font-mono text-xs text-[#5b6b7d] mb-8">{t.count(family.products.length)}</p>
            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {family.products.map((p) => (
                <motion.a
                  key={p.visualKey}
                  variants={staggerItem}
                  href={`/kategori-urun-${lang}.html?slug=${p.slug}`}
                  onClick={() => rememberCatalogSelection({ lang, slug: p.slug, visualKey: p.visualKey })}
                  className="group bg-white/70 backdrop-blur-md border border-navy/10 hover:border-accent/40 rounded-xl overflow-hidden shadow-md flex flex-col transition-colors"
                >
                  <div className="aspect-[4/3] bg-white/60 flex items-center justify-center overflow-hidden">
                    <img src={p.media[0].src} alt={p.media[0].alt} loading="lazy" className={`w-full h-full ${getProductImageClass(p.media[0])} group-hover:scale-105 transition-transform duration-500`} />
                  </div>
                  <div className="p-4 flex-1 flex flex-col gap-1.5 border-t border-navy/10">
                    <h3 className="font-display text-[15px] font-bold text-navy leading-tight">{p.name}</h3>
                    {p.material && <span className="text-[12.5px] text-[#5b6b7d]">{p.material}</span>}
                  </div>
                </motion.a>
              ))}
            </motion.div>
          </>
        )}
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
