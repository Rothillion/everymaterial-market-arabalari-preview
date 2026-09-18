import type { Localized } from "./types";

/**
 * Stable slugs for the 9 real sitewide categories (SiteHeader's "Kategoriler" dropdown /
 * SiteFooter's category list), in the same order as homeContent[lang].categories. Real
 * name + real image per category already live in home.ts; this file only adds routing
 * slugs plus the honest "products coming soon" chrome text for the category landing page —
 * per-category product listings don't exist yet and will be added once real photos/specs
 * are supplied (Faz 3j follow-up).
 */
export const CATEGORY_SLUGS = [
  "pleksi-teshir-ekipmanlari",
  "kapaklar",
  "ahsap-teshir-ekipmanlari",
  "cam-teshir-ekipmanlari",
  "polikarbon-teshir-ekipmanlari",
  "market-ekipmanlari",
  "raf-sistemleri",
  "makineler",
  "dolaplar-depolama-sistemleri",
] as const;

/**
 * 2026-08-26 (user decision, permanent): "Raf Sistemleri", "Makineler" and "Dolaplar ve Depolama
 * Sistemleri" are removed from every on-site navigation/menu/showcase surface (SiteHeader
 * dropdown + mobile menu, SiteFooter category list, homepage CategoryGrid teaser). Their pages
 * stay live and reachable by direct/existing URL — CATEGORY_SLUGS above is intentionally left
 * untouched so ProductCategoryPage/CategoryProductDetailPage index resolution and any existing
 * backlinks/SEO keep working. Consumers that render the category list for navigation should
 * filter this set out; consumers that resolve a specific category page by slug should not.
 */
export const HIDDEN_FROM_NAV_SLUGS: ReadonlySet<string> = new Set([
  "raf-sistemleri",
  "makineler",
  "dolaplar-depolama-sistemleri",
]);

export interface ProductCategoryChrome {
  breadcrumbHome: string;
  breadcrumbCategories: string;
  emptyTitle: string;
  emptyBody: string;
  emptyCta: string;
}

export const productCategoryContent: Localized<ProductCategoryChrome> = {
  tr: {
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCategories: "Kategoriler",
    emptyTitle: "Bu kategorideki ürünler yakında eklenecek",
    emptyBody: "Ürün fotoğrafları ve teknik detayları hazırlandıkça bu sayfada paylaşılacak. Bu arada ihtiyacınızı bize iletebilirsiniz.",
    emptyCta: "Bize Ulaşın",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbCategories: "Categories",
    emptyTitle: "Products in this category are coming soon",
    emptyBody: "Product photos and technical details will be shared here as they're prepared. In the meantime, feel free to reach out with your requirements.",
    emptyCta: "Contact Us",
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbCategories: "Kategorien",
    emptyTitle: "Produkte in dieser Kategorie folgen in Kürze",
    emptyBody: "Produktfotos und technische Details werden hier geteilt, sobald sie vorbereitet sind. Teilen Sie uns in der Zwischenzeit gerne Ihren Bedarf mit.",
    emptyCta: "Kontaktieren Sie uns",
  },
  ar: {
    breadcrumbHome: "الرئيسية",
    breadcrumbCategories: "الفئات",
    emptyTitle: "المنتجات في هذه الفئة قادمة قريبًا",
    emptyBody: "ستُشارَك صور المنتجات والتفاصيل الفنية هنا فور تجهيزها. في هذه الأثناء، يسعدنا استقبال احتياجاتكم.",
    emptyCta: "تواصل معنا",
  },
};
