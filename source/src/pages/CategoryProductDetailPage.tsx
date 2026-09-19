import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../content/site";
import { homeContent } from "../content/home";
import { CATEGORY_SLUGS } from "../content/productCategoryContent";
import { productCatalogContent } from "../content/productCatalog";
import {
  findCatalogProduct,
  readCatalogSelection,
  rememberCatalogSelection,
} from "../content/productCatalogLookup";
import type { Lang } from "../content/types";
import { getProductImageClass, type ProductImageRole } from "../media/productMedia";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

const CHROME = {
  tr: { about: "Ürün Hakkında", specs: "Teknik Özellikler", capacity: "Kapasite", dimensions: "Ölçüler", material: "Malzeme", related: "Diğer Ürünler", quote: "Teklif İste", back: "Kategoriye Dön", breadcrumbHome: "Ana Sayfa", breadcrumbCategories: "Kategoriler", mediaRoles: { hero: "Ana görsel", dimensions: "Ölçü", detail: "Detay", usage: "Kullanım", project: "Proje" } },
  en: { about: "About This Product", specs: "Specifications", capacity: "Capacity", dimensions: "Dimensions", material: "Material", related: "Other Products", quote: "Request a Quote", back: "Back to Category", breadcrumbHome: "Home", breadcrumbCategories: "Categories", mediaRoles: { hero: "Main image", dimensions: "Dimensions", detail: "Detail", usage: "Usage", project: "Project" } },
  de: { about: "Über dieses Produkt", specs: "Technische Daten", capacity: "Kapazität", dimensions: "Abmessungen", material: "Material", related: "Weitere Produkte", quote: "Angebot anfordern", back: "Zurück zur Kategorie", breadcrumbHome: "Startseite", breadcrumbCategories: "Kategorien", mediaRoles: { hero: "Hauptbild", dimensions: "Maße", detail: "Detail", usage: "Anwendung", project: "Projekt" } },
  ar: { about: "عن هذا المنتج", specs: "المواصفات الفنية", capacity: "السعة", dimensions: "الأبعاد", material: "الخامة", related: "منتجات أخرى", quote: "اطلب عرض سعر", back: "العودة إلى الفئة", breadcrumbHome: "الرئيسية", breadcrumbCategories: "الفئات", mediaRoles: { hero: "الصورة الرئيسية", dimensions: "الأبعاد", detail: "التفاصيل", usage: "الاستخدام", project: "المشروع" } },
} as const;

function getMediaRoleLabel(
  mediaRoles: Record<ProductImageRole, string>,
  role: ProductImageRole,
): string {
  return mediaRoles[role];
}

function useQuerySlug() {
  const [slug] = useState<string | null>(() => new URLSearchParams(window.location.search).get("slug"));
  return slug;
}

export function prepareCategoryProductLanguageNavigation(
  targetLang: Lang,
  product: { permalink: string; visualKey: string },
): string {
  rememberCatalogSelection({
    lang: targetLang,
    slug: product.permalink,
    visualKey: product.visualKey,
  });
  return `/kategori-urun-${targetLang}.html?slug=${product.permalink}`;
}

/**
 * Faz 3j: product detail page for the 175-product real sitewide catalog (productCatalog.ts),
 * mirroring ProductDetailPage.tsx's exact visual pattern per the user's instruction. Unlike the
 * market-arabaları catalog, every product here has a real "Ürün Hakkında" description (100%
 * coverage from the source archive), so that block always renders.
 */
export function CategoryProductDetailPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const t = CHROME[lang];
  const slug = useQuerySlug();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  const found = useMemo(() => {
    if (!slug) return null;
    return findCatalogProduct(
      productCatalogContent[lang],
      slug,
      readCatalogSelection(lang, slug),
    );
  }, [lang, slug]);

  if (slug === null) return null;

  if (!found) {
    return (
      <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen overflow-x-hidden">
        <SiteHeader lang={lang} activePage="catalog" onLangChange={(l) => (window.location.href = `/kategoriler-${l}.html`)} />
        <main className="max-w-[900px] mx-auto px-6 py-32 text-center">
          <p className="text-navy">404</p>
        </main>
        <SiteFooter lang={lang} />
      </div>
    );
  }

  const { categoryIndex, product, family } = found;
  const categoryName = homeContent[lang].categories[categoryIndex]?.name ?? "";
  const categorySlug = CATEGORY_SLUGS[categoryIndex];
  const images = product.media;
  const hasDims = product.widthCm != null && product.lengthCm != null && product.heightCm != null;
  const related = family.products.filter((p) => p.visualKey !== product.visualKey).slice(0, 4);
  const whatsappMessage = `${site.contact.whatsappText} (${product.name})`;
  const whatsappHref = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <SiteHeader
        lang={lang}
        activePage="catalog"
        onLangChange={(targetLang) => {
          window.location.href = prepareCategoryProductLanguageNavigation(targetLang, product);
        }}
      />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-10 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[500px] h-[500px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted flex-wrap">
            <a href="/" className="hover:text-white transition-colors">{t.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <a href={`/kategoriler-${lang}.html?slug=${categorySlug}`} className="hover:text-white transition-colors">{categoryName}</a>
          </nav>
          <h1 className="font-display text-2xl md:text-4xl font-extrabold text-white max-w-2xl">{product.name}</h1>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="aspect-[4/3] bg-white/60 border border-navy/10 rounded-xl overflow-hidden">
            <img
              data-testid="product-main-image"
              src={images[activeImage].src}
              alt={images[activeImage].alt}
              className={`w-full h-full ${getProductImageClass(images[activeImage])}`}
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {images.map((image, i) => (
                <button
                  key={image.src}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  aria-label={getMediaRoleLabel(t.mediaRoles, image.role)}
                  className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${i === activeImage ? "border-accent-deep" : "border-transparent hover:border-accent/50"}`}
                >
                  <img src={image.src} alt="" aria-hidden="true" className={`w-full h-full ${getProductImageClass(image)}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          <h2 className="font-mono text-xs font-bold uppercase tracking-wide text-[#5b6b7d]">{t.specs}</h2>
          <div className="grid grid-cols-2 gap-3">
            {product.volumeLabel && (
              <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.capacity}</span>
                <span className="font-display font-bold text-navy">{product.volumeLabel}</span>
              </div>
            )}
            {hasDims && (
              <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.dimensions}</span>
                <span className="font-display font-bold text-navy">{product.widthCm}×{product.lengthCm}×{product.heightCm} cm</span>
              </div>
            )}
            {product.material && (
              <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-4">
                <span className="block font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-1">{t.material}</span>
                <span className="font-display font-bold text-navy">{product.material}</span>
              </div>
            )}
          </div>

          <div className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-lg p-5">
            <h3 className="font-mono text-xs font-bold uppercase tracking-wide text-[#5b6b7d] mb-2">{t.about}</h3>
            <p className="text-[14.5px] leading-relaxed text-[#5b6b7d]">{product.description}</p>
          </div>

          <a
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            onClick={trackWhatsAppContact}
            className="flex items-center justify-center gap-2 bg-accent-deep hover:bg-accent-deepHover text-white font-bold text-sm uppercase tracking-widest rounded-lg px-5 py-4 transition-colors mt-2"
          >
            {t.quote}
          </a>
          <a href={`/kategoriler-${lang}.html?slug=${categorySlug}`} className="text-center text-sm font-semibold text-[#5b6b7d] hover:text-accent-deep transition-colors">
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
                key={sibling.visualKey}
                href={`/kategori-urun-${lang}.html?slug=${sibling.permalink}`}
                onClick={() => rememberCatalogSelection({ lang, slug: sibling.permalink, visualKey: sibling.visualKey })}
                className="group bg-white/70 backdrop-blur-md border border-navy/10 hover:border-accent/40 rounded-xl overflow-hidden transition-colors"
              >
                <div className="aspect-[4/3] bg-white/60 overflow-hidden">
                  <img src={sibling.media[0].src} alt={sibling.media[0].alt} className={`w-full h-full ${getProductImageClass(sibling.media[0])} group-hover:scale-105 transition-transform duration-500`} />
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
