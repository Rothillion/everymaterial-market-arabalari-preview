import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { homeContent } from "../content/home";
import { productCatalogContent } from "../content/productCatalog";
import { rememberCatalogSelection } from "../content/productCatalogLookup";
import { getProductImageClass } from "../media/productMedia";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { homeHref, type Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

const CHROME = {
  tr: {
    pageTitle: "Ürün Kataloğu",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Katalog",
    heroLead: "Pleksi, cam, ahşap ve akrilik teşhir ekipmanlarında gerçek fotoğraf ve gerçek ölçülerle tam katalog.",
    productLabel: "ÜRÜN",
    categoryLabel: "KATEGORİ",
    photoLabel: "GERÇEK ÜRÜN GÖRSELİ",
    count: (n: number) => `${n} ürün gösteriliyor`,
    tableHeaders: { no: "No", product: "Ürün", volume: "Hacim", width: "Genişlik", length: "Uzunluk", height: "Yükseklik", material: "Malzeme" },
    ctaTitle: "Toplu Alım ve Özel Teklif İçin Bize Ulaşın",
    ctaBody: "Renk, ölçü ve toplu alım detaylarını netleştirmek için ekibimizle iletişime geçin.",
    ctaButton: "Sizi Arayalım",
  },
  en: {
    pageTitle: "Product Catalog",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Catalog",
    heroLead: "The full catalog of plexiglass, glass, wood and acrylic display equipment — real photos, real dimensions.",
    productLabel: "PRODUCTS",
    categoryLabel: "CATEGORIES",
    photoLabel: "REAL PRODUCT PHOTOS",
    count: (n: number) => `Showing ${n} products`,
    tableHeaders: { no: "No", product: "Product", volume: "Volume", width: "Width", length: "Length", height: "Height", material: "Material" },
    ctaTitle: "Contact Us for Bulk Orders & Custom Quotes",
    ctaBody: "Get in touch with our team to work out color, sizing and bulk order details.",
    ctaButton: "Call Us",
  },
  de: {
    pageTitle: "Produktkatalog",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Katalog",
    heroLead: "Der komplette Katalog für Plexiglas-, Glas-, Holz- und Acryl-Präsentationsausrüstung — echte Fotos, echte Maße.",
    productLabel: "PRODUKTE",
    categoryLabel: "KATEGORIEN",
    photoLabel: "ECHTE PRODUKTFOTOS",
    count: (n: number) => `${n} Produkte werden angezeigt`,
    tableHeaders: { no: "Nr.", product: "Produkt", volume: "Volumen", width: "Breite", length: "Länge", height: "Höhe", material: "Material" },
    ctaTitle: "Kontaktieren Sie uns für Großbestellungen & individuelle Angebote",
    ctaBody: "Nehmen Sie Kontakt mit unserem Team auf, um Farbe, Maße und Großbestellungsdetails zu klären.",
    ctaButton: "Rufen Sie uns an",
  },
  ar: {
    pageTitle: "كتالوج المنتجات",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "الكتالوج",
    heroLead: "الكتالوج الكامل لمعدات العرض من البلكسي والزجاج والخشب والأكريليك — صور حقيقية وأبعاد حقيقية.",
    productLabel: "منتج",
    categoryLabel: "فئة",
    photoLabel: "صورة منتج حقيقية",
    count: (n: number) => `عرض ${n} منتج`,
    tableHeaders: { no: "رقم", product: "المنتج", volume: "الحجم", width: "العرض", length: "الطول", height: "الارتفاع", material: "الخامة" },
    ctaTitle: "تواصلوا معنا للطلبات بالجملة والعروض الخاصة",
    ctaBody: "تواصلوا مع فريقنا لتحديد تفاصيل اللون والقياس والطلب بالجملة.",
    ctaButton: "اتصلوا بنا",
  },
} as const;

/**
 * Faz 3c v2: repoints the catalog page from the old 62-product/5-family market-arabaları
 * data (content/catalog.ts, still used by the standalone CategoryPage.tsx at
 * kategori-{lang}.html?aile=...) to the real 175-product/9-category EveryMaterial
 * pleksi/cam/ahşap catalog (content/productCatalog.ts), per explicit user decision
 * (2026-09-19): "Ürün Kataloğu" must reflect the current brand's real products, not the
 * legacy shopping-cart line. Certificates from the old catalog were cart/shelving-specific
 * (food compliance for market trolleys etc.) and don't apply here, so that section is
 * dropped rather than reused or fabricated.
 */
export function CatalogPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const t = CHROME[lang];
  const families = productCatalogContent[lang].map((family, i) => ({
    ...family,
    name: homeContent[lang].categories[i].name,
  }));
  const [activeFamily, setActiveFamily] = useState(0);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/katalog-${l}.html`;
  }

  const family = families[activeFamily];
  const totalProducts = families.reduce((sum, f) => sum + f.products.length, 0);
  const totalPhotos = families.reduce((sum, f) => sum + f.products.reduce((s, p) => s + p.media.length, 0), 0);
  const globalStartIndex = families.slice(0, activeFamily).reduce((sum, f) => sum + f.products.length, 0);

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="catalog" onLangChange={navigateToLang} />

      <section className="pt-32 pb-10 px-6 lg:px-10 bg-navy-deep">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-onNavy-muted mb-3">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">
              {t.breadcrumbHome}
            </a>
            <span className="text-onNavy-faint" aria-hidden="true">
              /
            </span>
            <span className="text-white font-semibold">{t.breadcrumbCurrent}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">{t.pageTitle}</h1>
          <p className="text-base text-onNavy-bright max-w-xl leading-relaxed mb-6">{t.heroLead}</p>
          <div className="flex gap-8 flex-wrap">
            <div>
              <span className="block font-display text-2xl font-extrabold text-white">{totalProducts}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-onNavy-muted">{t.productLabel}</span>
            </div>
            <div>
              <span className="block font-display text-2xl font-extrabold text-white">{families.length}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-onNavy-muted">{t.categoryLabel}</span>
            </div>
            <div>
              <span className="block font-display text-2xl font-extrabold text-white">{totalPhotos}</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-onNavy-muted">{t.photoLabel}</span>
            </div>
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div role="tablist" className="flex flex-wrap gap-2.5 mb-12">
          {families.map((f, i) => (
            <button
              key={f.slug}
              type="button"
              role="tab"
              aria-selected={i === activeFamily}
              onClick={() => setActiveFamily(i)}
              className={`rounded-full px-5 py-3 text-[13px] font-bold transition-colors ${
                i === activeFamily
                  ? "bg-accent-deep text-white"
                  : "bg-white border border-navy/15 text-[#5b6b7d] hover:border-accent hover:text-accent-deep"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <motion.div key={family.slug} ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerChildren}>
          <div className="flex flex-wrap items-end justify-between gap-4 max-w-[1200px] mb-7">
            <div className="max-w-[820px]">
              <h2 className="font-display text-2xl font-extrabold text-navy mb-2.5">{family.name}</h2>
              <p className="font-mono text-xs text-[#5b6b7d]">{t.count(family.products.length)}</p>
            </div>
            <a
              href={`/kategoriler-${lang}.html?slug=${family.slug}`}
              className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-accent-deep hover:text-accent-deepHover transition-colors"
            >
              {family.name} <span className="inline-block rtl:rotate-180">→</span>
            </a>
          </div>

          {family.products.length === 0 ? null : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {family.products.map((p, i) => (
                  <motion.a
                    key={p.visualKey}
                    variants={staggerItem}
                    href={`/kategori-urun-${lang}.html?slug=${p.permalink}`}
                    onClick={() => rememberCatalogSelection({ lang, slug: p.permalink, visualKey: p.visualKey })}
                    className="group bg-white/70 backdrop-blur-md border border-navy/10 hover:border-accent/40 rounded-xl overflow-hidden shadow-md flex flex-col transition-colors"
                  >
                    <div className="aspect-[4/3] bg-white/60 flex items-center justify-center overflow-hidden">
                      <img
                        src={p.media[0].src}
                        alt={p.media[0].alt}
                        loading="lazy"
                        className={`w-full h-full ${getProductImageClass(p.media[0])} group-hover:scale-105 transition-transform duration-500`}
                      />
                    </div>
                    <div className="grid grid-cols-3 text-center text-[10px] uppercase tracking-wide text-[#5b6b7d] border-t border-navy/10 py-2">
                      {p.widthCm != null && <span>{p.widthCm} cm</span>}
                      {p.lengthCm != null && <span>{p.lengthCm} cm</span>}
                      {p.heightCm != null && <span>{p.heightCm} cm</span>}
                    </div>
                    <div className="p-4 flex-1 flex flex-col gap-1.5 border-t border-navy/10">
                      <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#5b6b7d]">
                        {pad(globalStartIndex + i + 1)}
                      </span>
                      <h3 className="font-display text-[15px] font-bold text-navy leading-tight mb-1">{p.name}</h3>
                      {p.material && (
                        <div className="flex justify-between text-[12.5px] border-t border-navy/10 pt-1.5">
                          <span className="text-[#5b6b7d]">{t.tableHeaders.material}</span>
                          <span className="font-semibold text-navy text-end">{p.material}</span>
                        </div>
                      )}
                    </div>
                  </motion.a>
                ))}
              </div>

              <div className="overflow-x-auto rounded-xl border border-navy/10 bg-white/60 backdrop-blur-md mb-16">
                <table className="w-full text-[13px] whitespace-nowrap">
                  <thead>
                    <tr className="border-b border-navy/10">
                      <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">{t.tableHeaders.no}</th>
                      <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">{t.tableHeaders.product}</th>
                      <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">{t.tableHeaders.volume}</th>
                      <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">{t.tableHeaders.width}</th>
                      <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">{t.tableHeaders.length}</th>
                      <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">{t.tableHeaders.height}</th>
                      <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">{t.tableHeaders.material}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {family.products.map((p, i) => (
                      <tr key={p.visualKey} className="border-b border-navy/5 last:border-0 hover:bg-accent/5">
                        <td className="px-4 py-3 text-navy">{pad(globalStartIndex + i + 1)}</td>
                        <td className="px-4 py-3 text-navy font-semibold">{p.name}</td>
                        <td className="px-4 py-3 text-navy">{p.volumeLabel ?? "—"}</td>
                        <td className="px-4 py-3 text-navy">{p.widthCm != null ? `${p.widthCm} cm` : "—"}</td>
                        <td className="px-4 py-3 text-navy">{p.lengthCm != null ? `${p.lengthCm} cm` : "—"}</td>
                        <td className="px-4 py-3 text-navy">{p.heightCm != null ? `${p.heightCm} cm` : "—"}</td>
                        <td className="px-4 py-3 text-navy">{p.material ?? "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </motion.div>

        <div className="mt-14 bg-navy-deep rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-2">{t.ctaTitle}</h3>
            <p className="text-sm text-onNavy-muted max-w-md">{t.ctaBody}</p>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              onClick={trackWhatsAppContact}
              className="bg-accent-deep hover:bg-accent-deepHover text-white text-sm font-bold uppercase tracking-wide rounded-lg px-6 py-3.5 transition-colors"
            >
              {t.ctaButton}
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
