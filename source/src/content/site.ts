import type { Localized } from "./types";

export interface SiteContent {
  nav: {
    home: string;
    categoriesLabel: string;
    categories: string[];
    corporateLabel: string;
    about: string;
    updates: string;
    team: string;
    exportConsultancy: string;
    projects: string;
    blog: string;
    contact: string;
    callButton: string;
    menuAria: string;
  };
  footer: {
    description: string;
    catalogLink: string;
    categoriesTitle: string;
    contactTitle: string;
    addressLabel: string;
    address: string;
    phoneLabel: string;
    emailLabel: string;
    copyright: string;
    kvkk: string;
    cookie: string;
  };
  contact: {
    phone: string;
    phoneHref: string;
    email: string;
    whatsappNumber: string;
    whatsappText: string;
  };
  meta: {
    dir: "ltr" | "rtl";
    htmlLang: string;
  };
}

const CATEGORIES_TR = [
  "Pleksi Teşhir Ekipmanları",
  "Kapaklar",
  "Ahşap Teşhir Ekipmanları",
  "Cam Teşhir Ekipmanları",
  "Polikarbon Teşhir Ekipmanları",
  "Market Ekipmanları",
  "Raf Sistemleri",
  "Makineler",
  "Dolaplar ve Depolama Sistemleri",
];

const CATEGORIES_EN = [
  "Plexiglass Display Equipment",
  "Lids",
  "Wooden Display Equipment",
  "Glass Display Equipment",
  "Polycarbonate Display Equipment",
  "Market Equipment",
  "Shelving Systems",
  "Machinery",
  "Cabinets and Storage Systems",
];

const CATEGORIES_DE = [
  "Plexiglas-Präsentationsgeräte",
  "Deckel",
  "Holz-Präsentationsgeräte",
  "Glas-Präsentationsgeräte",
  "Polycarbonat-Präsentationsgeräte",
  "Marktausstattung",
  "Regalsysteme",
  "Maschinen",
  "Schränke und Lagersysteme",
];

const CATEGORIES_AR = [
  "معدات عرض بليكسي",
  "الأغطية",
  "معدات عرض خشبية",
  "معدات عرض زجاجية",
  "معدات عرض بولي كربونات",
  "معدات السوق",
  "أنظمة الرفوف",
  "الآلات",
  "الخزائن وأنظمة التخزين",
];

const ADDRESS =
  "Mahmutbey Mah. 2430. Sok. 12.Ada No: 112 - İstoç Toptancılar Çarşısı - Bağcılar / İstanbul";

export const siteContent: Localized<SiteContent> = {
  tr: {
    nav: {
      home: "Ana Sayfa",
      categoriesLabel: "Kategoriler",
      categories: CATEGORIES_TR,
      corporateLabel: "Kurumsal",
      about: "Hakkımızda",
      updates: "Gelişmeler",
      team: "Ekibimiz",
      exportConsultancy: "İhracat Danışmanlığı",
      projects: "Projeler",
      blog: "Blog",
      contact: "İletişim",
      callButton: "Sizi Arayalım",
      menuAria: "Menü",
    },
    footer: {
      description:
        "everymaterial.com, Türkiye merkezli, Almanya ve Filistin çözüm ortaklı bir firma olarak dünya genelindeki müşterilerine kapsamlı hizmet sunmayı hedefleyen bir platformdur.",
      catalogLink: "Kataloğa Göz Atın",
      categoriesTitle: "Kategoriler",
      contactTitle: "İletişim Bilgileri",
      addressLabel: "Adres:",
      address: ADDRESS,
      phoneLabel: "Telefon:",
      emailLabel: "E-posta:",
      copyright: "Copyright 2026 Every Material | Tüm Hakları Saklıdır.",
      kvkk: "Kişisel Verilerin Korunması Kanunu (KVKK)",
      cookie: "Çerez Politikası",
    },
    contact: {
      phone: "+90 545 911 10 02",
      phoneHref: "tel:+905459111002",
      email: "info@everymaterial.com",
      whatsappNumber: "905459111002",
      whatsappText: "Merhaba, ürünleriniz hakkında bilgi almak istiyorum..",
    },
    meta: { dir: "ltr", htmlLang: "tr" },
  },
  en: {
    nav: {
      home: "Home",
      categoriesLabel: "Categories",
      categories: CATEGORIES_EN,
      corporateLabel: "Corporate",
      about: "About Us",
      updates: "Updates",
      team: "Our Team",
      exportConsultancy: "Export Consultancy",
      projects: "Projects",
      blog: "Blog",
      contact: "Contact",
      callButton: "Let Us Call You",
      menuAria: "Menu",
    },
    footer: {
      description:
        "everymaterial.com is a platform based in Turkey with a partnership in Germany and Palestine, aiming to provide comprehensive services to customers around the world.",
      catalogLink: "Browse the Catalog",
      categoriesTitle: "Categories",
      contactTitle: "Contact Information",
      addressLabel: "Address:",
      address: ADDRESS,
      phoneLabel: "Phone:",
      emailLabel: "E-mail:",
      copyright: "Copyright 2026 Every Material | All Rights Reserved.",
      kvkk: "Personal Data Protection Law (PDPL)",
      cookie: "Cookie Policy",
    },
    contact: {
      phone: "+90 545 911 10 02",
      phoneHref: "tel:+905459111002",
      email: "info@everymaterial.com",
      whatsappNumber: "905459111002",
      whatsappText: "Hello, I want to information about your products..",
    },
    meta: { dir: "ltr", htmlLang: "en" },
  },
  de: {
    nav: {
      home: "Startseite",
      categoriesLabel: "Kategorien",
      categories: CATEGORIES_DE,
      corporateLabel: "Unternehmen",
      about: "Über uns",
      updates: "Neuigkeiten",
      team: "Unser Team",
      exportConsultancy: "Exportberatung",
      projects: "Projekte",
      blog: "Blog",
      contact: "Kontakt",
      callButton: "Rückruf anfordern",
      menuAria: "Menü",
    },
    footer: {
      description:
        "everymaterial.com ist eine in der Türkei ansässige Plattform mit Partnerschaften in Deutschland und Palästina, die Kunden weltweit einen umfassenden Service bieten möchte.",
      catalogLink: "Katalog ansehen",
      categoriesTitle: "Kategorien",
      contactTitle: "Kontaktinformationen",
      addressLabel: "Adresse:",
      address: ADDRESS,
      phoneLabel: "Telefon:",
      emailLabel: "E-Mail:",
      copyright: "Copyright 2026 Every Material | Alle Rechte vorbehalten.",
      kvkk: "Gesetz zum Schutz personenbezogener Daten (KVKK)",
      cookie: "Cookie-Richtlinie",
    },
    contact: {
      phone: "+90 545 911 10 02",
      phoneHref: "tel:+905459111002",
      email: "info@everymaterial.com",
      whatsappNumber: "905466382175",
      whatsappText: "Hallo, ich möchte Informationen zu Ihren Produkten..",
    },
    meta: { dir: "ltr", htmlLang: "de" },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      categoriesLabel: "الفئات",
      categories: CATEGORIES_AR,
      corporateLabel: "الشركة",
      about: "من نحن",
      updates: "آخر الأخبار",
      team: "فريقنا",
      exportConsultancy: "استشارات التصدير",
      projects: "المشاريع",
      blog: "المدونة",
      contact: "اتصل بنا",
      callButton: "اطلب اتصالاً",
      menuAria: "القائمة",
    },
    footer: {
      description:
        "everymaterial.com هي منصة مقرها تركيا بشراكة في ألمانيا وفلسطين، تهدف إلى تقديم خدمات شاملة للعملاء حول العالم.",
      catalogLink: "تصفح الكتالوج",
      categoriesTitle: "الفئات",
      contactTitle: "معلومات الاتصال",
      addressLabel: "العنوان:",
      address: ADDRESS,
      phoneLabel: "الهاتف:",
      emailLabel: "البريد الإلكتروني:",
      copyright: "© 2026 Every Material. جميع الحقوق محفوظة.",
      kvkk: "قانون حماية البيانات الشخصية (KVKK)",
      cookie: "سياسة ملفات تعريف الارتباط",
    },
    contact: {
      phone: "+90 545 911 10 02",
      phoneHref: "tel:+905459111002",
      email: "info@everymaterial.com",
      whatsappNumber: "905466382175",
      whatsappText: "مرحبًا، أريد الحصول على معلومات حول منتجاتك..",
    },
    meta: { dir: "rtl", htmlLang: "ar" },
  },
};
