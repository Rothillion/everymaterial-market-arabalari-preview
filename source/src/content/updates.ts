import type { Localized } from "./types";

export interface UpdatesContent {
  pageTitle: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroLead: string;
  emptyTitle: string;
  emptyBody: string;
  emptyCta: string;
}

/** Real content extracted from .deploy/gelismeler-{tr,en,de,ar}.html (Faz 3i). The source
 * page is a genuine empty state — no updates have been published yet — so there is no
 * listing/detail pattern to build, only this single page. */
export const updatesContent: Localized<UpdatesContent> = {
  tr: {
    pageTitle: "Gelişmeler",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Gelişmeler",
    heroLead: "EveryMaterial'daki üretim kapasitesi artışları, yeni ürün duyuruları ve kurumsal gelişmelerle ilgili güncel paylaşımlar burada yer alacak.",
    emptyTitle: "Şu anda yayınlanmış bir gelişme bulunmuyor",
    emptyBody: "Yeni gelişmeler ve duyurular yayınlandığında burada paylaşılacak. Bu arada güncel içeriklerimize blog sayfamızdan ulaşabilirsiniz.",
    emptyCta: "Blog'a Git",
  },
  en: {
    pageTitle: "Updates",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Updates",
    heroLead: "Announcements about EveryMaterial's production capacity growth, new products, and corporate news will appear here.",
    emptyTitle: "No updates have been published yet",
    emptyBody: "New updates and announcements will be shared here as soon as they're published. In the meantime, check out our blog for current content.",
    emptyCta: "Go to Blog",
  },
  de: {
    pageTitle: "Neuigkeiten",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Neuigkeiten",
    heroLead: "Ankündigungen zum Ausbau der Produktionskapazität von EveryMaterial, neuen Produkten und Unternehmensnachrichten erscheinen hier.",
    emptyTitle: "Es wurden noch keine Neuigkeiten veröffentlicht",
    emptyBody: "Neue Ankündigungen und Nachrichten werden hier geteilt, sobald sie veröffentlicht werden. In der Zwischenzeit finden Sie aktuelle Inhalte in unserem Blog.",
    emptyCta: "Zum Blog",
  },
  ar: {
    pageTitle: "آخر الأخبار",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "آخر الأخبار",
    heroLead: "إعلانات عن نمو الطاقة الإنتاجية لدى EveryMaterial، والمنتجات الجديدة، وأخبار الشركة ستظهر هنا.",
    emptyTitle: "لا توجد أخبار منشورة حاليًا",
    emptyBody: "ستُنشر الأخبار والإعلانات الجديدة هنا فور صدورها. في غضون ذلك، يمكنكم زيارة مدونتنا للاطلاع على المحتوى الحالي.",
    emptyCta: "الانتقال إلى المدونة",
  },
};
