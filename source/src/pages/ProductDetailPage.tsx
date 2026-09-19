import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../content/site";
import { catalogContent } from "../content/catalog";
import { productDetails } from "../content/productDetails";
import { homeHref, type Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

const CHROME = {
  tr: { about: "Ürün Hakkında", specs: "Teknik Özellikler", capacity: "Kapasite", dimensions: "Ölçüler", material: "Malzeme", origin: "Üretim", colors: "Renk Seçenekleri", weight: "Ağırlık", wheel: "Teker Sayısı", sizeFamily: "Ölçü Ailesi", related: "Diğer Ürünler", quote: "Teklif İste", back: "Kategoriye Dön" },
  en: { about: "About This Product", specs: "Specifications", capacity: "Capacity", dimensions: "Dimensions", material: "Material", origin: "Origin", colors: "Color Options", weight: "Weight", wheel: "Wheel Count", sizeFamily: "Size Family", related: "Other Products", quote: "Request a Quote", back: "Back to Category" },
  de: { about: "Über dieses Produkt", specs: "Technische Daten", capacity: "Kapazität", dimensions: "Abmessungen", material: "Material", origin: "Herkunft", colors: "Farboptionen", weight: "Gewicht", wheel: "Anzahl Räder", sizeFamily: "Größenfamilie", related: "Weitere Produkte", quote: "Angebot anfordern", back: "Zurück zur Kategorie" },
  ar: { about: "عن هذا المنتج", specs: "المواصفات الفنية", capacity: "السعة", dimensions: "الأبعاد", material: "الخامة", origin: "بلد الإنتاج", colors: "خيارات الألوان", weight: "الوزن", wheel: "عدد العجلات", sizeFamily: "عائلة المقاسات", related: "منتجات أخرى", quote: "اطلب عرض سعر", back: "العودة إلى الفئة" },
} as const;

function useQuerySlug() {
  const [slug] = useState<string | null>(() => new URLSearchParams(window.location.search).get("slug"));
  return slug;
}

/**
 * Faz 3d: reusable product-detail page, scoped to catalog.ts products with a real slug
 * (currently the 2 "market arabaları" families). Uses ?slug= query-param routing instead of
 * a static file per product to avoid ~96 near-identical HTML/entry files for one template.
 * Real narrative/gallery overlay (productDetails.ts) is shown only for the ~17 products with
 * a confident match to an old .deploy detail page; otherwise only catalog.ts fields render —
 * no fabricated paragraph.
 */
export function ProductDetailPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const catalog = catalogContent[lang];
  const t = CHROME[lang];
  const slug = useQuerySlug();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  const found = useMemo(() => {
    if (!slug) return null;
    for (const family of catalog.families) {
      const product = family.products.find((p) => p.slug === slug);
      if (product) return { family, product };
    }
    return null;
  }, [catalog, slug]);

  if (!found) {
    return (
      <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen overflow-x-hidden">
        <SiteHeader lang={lang} activePage="catalog" onLangChange={(l) => (window.location.href = `/katalog-${l}.html`)} />
        <main className="max-w-[900px] mx-auto px-6 py-32 text-center">
          <p className="text-navy">404</p>
        </main>
        <SiteFooter lang={lang} />
      </div>
    );
  }

  const { family, product } = found;
  const familyIndex = catalog.families.findIndex((f) => f.slug === family.slug);
  const productIndex = family.products.indexOf(product);

  function navigateToLang(l: Lang) {
    const targetFamily = catalogContent[l].families[familyIndex];
    const targetProduct = targetFamily?.products[productIndex];
    window.location.href = targetProduct ? `/urun-${l}.html?slug=${targetProduct.slug}` : `/katalog-${l}.html`;
  }

  const extra = productDetails[lang][product.slug];
  const images = extra?.galleryImages?.length ? extra.galleryImages : [product.image];
  const hasDims = product.widthCm != null && product.lengthCm != null && product.heightCm != null;
  const related = family.products.filter((p) => p.slug !== product.slug).slice(0, 4);
  const whatsappMessage = `${site.contact.whatsappText} (${product.name})`;
  const whatsappHref = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="catalog" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-10 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted flex-wrap">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">{catalog.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <a href={`/kategori-${lang}.html?aile=${family.slug}`} className="hover:text-white transition-colors">{family.name}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            {extra?.code && <span className="text-accent font-bold">{extra.code}</span>}
          </nav>
          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-white max-w-2xl">{product.name}</h1>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="aspect-[4/3] bg-white/60 border border-navy/10 rounded-xl overflow-hidden">
            <img src={images[activeImage]} alt={product.alt} className="w-full h-full object-contain p-4" />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((img, i) => (
                <button
                  key={img}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${i === activeImage ? "border-accent-deep" : "border-transparent hover:border-accent/50"}`}
                >
                  <img src={img} alt="" aria-hidden="true" className="w-full h-full object-contain bg-white/50 p-1" />
                </button>
              ))}
            </div>
          )}

          {family.products.length > 1 && (
            <div className="mt-4">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wide text-[#5b6b7d] mb-3">{t.sizeFamily}</h3>
              <div className="bg-white/60 border border-navy/10 rounded-lg overflow-hidden">
                {family.products.map((sibling) => (
                  <a
                    key={sibling.slug}
                    href={`/urun-${lang}.html?slug=${sibling.slug}`}
                    className={`flex items-center justify-between px-4 py-2.5 text-sm border-b border-navy/5 last:border-0 hover:bg-accent/5 transition-colors ${
                      sibling.slug === product.slug ? "bg-accent/10" : ""
                    }`}
                  >
                    <span className={sibling.slug === product.slug ? "text-accent-deep font-bold" : "text-navy font-semibold"}>{sibling.name}</span>
                    <span className="text-[#5b6b7d] font-mono text-xs">{sibling.volumeLabel}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wide text-[#5b6b7d]">{t.specs}</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.capacity}</span>
              <span className="font-display font-bold text-navy">{product.volumeLabel}</span>
            </div>
            {hasDims && (
              <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.dimensions}</span>
                <span className="font-display font-bold text-navy">{product.widthCm}×{product.lengthCm}×{product.heightCm} cm</span>
              </div>
            )}
            <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.material}</span>
              <span className="font-display font-bold text-navy">{product.material}</span>
            </div>
            <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.origin}</span>
              <span className="font-display font-bold text-navy">{product.origin}</span>
            </div>
            {product.weightKg != null && (
              <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.weight}</span>
                <span className="font-display font-bold text-navy">{product.weightKg} kg</span>
              </div>
            )}
            {product.wheelCount != null && (
              <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.wheel}</span>
                <span className="font-display font-bold text-navy">{product.wheelCount}</span>
              </div>
            )}
            {product.colors && (
              <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4 col-span-2">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.colors}</span>
                <span className="font-display font-bold text-navy">{product.colors}</span>
              </div>
            )}
          </div>

          {extra?.aboutParagraph && (
            <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-5">
              <h3 className="font-mono text-xs font-bold uppercase tracking-wide text-[#5b6b7d] mb-2">{t.about}</h3>
              <p className="text-[14.5px] leading-relaxed text-[#5b6b7d]">{extra.aboutParagraph}</p>
            </div>
          )}

          {product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-[11px] font-bold tracking-wide text-accent-deep bg-accent/10 rounded px-2 py-1">{tag}</span>
              ))}
            </div>
          )}

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={trackWhatsAppContact}
            className="flex items-center justify-center gap-2 bg-accent-deep hover:bg-accent-deepHover text-white font-bold text-sm uppercase tracking-widest rounded-lg px-5 py-4 transition-colors mt-2"
          >
            {t.quote}
          </a>
          <a href={`/kategori-${lang}.html?aile=${family.slug}`} className="text-center text-sm font-semibold text-[#5b6b7d] hover:text-accent-deep transition-colors">
            ← {t.back}
          </a>
        </div>
      </main>

      {related.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
          <h3 className="font-display text-xl font-bold text-navy mb-6">{t.related}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((sibling) => (
              <a
                key={sibling.slug}
                href={`/urun-${lang}.html?slug=${sibling.slug}`}
                className="group bg-white/70 backdrop-blur-md border border-navy/10 hover:border-accent/40 rounded-xl overflow-hidden transition-colors"
              >
                <div className="aspect-square bg-white/60 overflow-hidden">
                  <img src={sibling.image} alt={sibling.alt} className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-3">
                  <h4 className="font-display text-[13px] font-bold text-navy leading-tight">{sibling.name}</h4>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
