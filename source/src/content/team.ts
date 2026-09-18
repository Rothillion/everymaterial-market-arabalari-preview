import type { Localized } from "./types";
import type { TeamMember } from "./home";

export interface TeamPageContent {
  pageTitle: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroLead: string;
  members: TeamMember[];
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
}

/** Real content extracted verbatim from .deploy/team-{tr,en,de,ar}.html (Faz 3b). */
export const teamContent: Localized<TeamPageContent> = {
  tr: {
    pageTitle: "Ekibimiz",
    breadcrumbHome: "Anasayfa",
    breadcrumbCurrent: "Ekibimiz",
    heroLead: "EveryMaterial uzman ekibimizle tanışın. Türkçe, İngilizce, Almanca ve Arapça dil desteğiyle dünya genelinde hizmet veriyoruz.",
    members: [
      { initials: "MB", name: "Muhammet Bilal Kavraş", role: "Dijital Pazarlama", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "bilal@everymaterial.com", langs: ["TR", "EN"] },
      { initials: "HA", name: "Hüseyin Ali", role: "Satış Pazarlama", phone: "+90 546 638 21 75", phoneHref: "tel:+905466382175", email: "hussein@everymaterial.com", langs: ["TR", "DE", "AR"] },
      { initials: "UE", name: "Uğur Enes Ünel", role: "İhracat Uzmanı", phone: "+90 547 771 77 78", phoneHref: "tel:+905477717778", email: "ugur@everymaterial.com", langs: ["EN"] },
      { initials: "AY", name: "Ahmet Yusuf", role: "Satış Pazarlama", phone: "+49 1521 394 25 86", phoneHref: "tel:+4915213942586", email: "sales1@everymaterial.com", langs: ["DE"] },
      { initials: "BK", name: "Bedirhan Kavraş", role: "Satış", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "info@everymaterial.com", langs: ["EN", "DE", "AR"] },
    ],
    ctaTitle: "Sorularınız mı var?",
    ctaBody: "Ekibimizle doğrudan iletişime geçebilir ya da sizi aramamızı isteyebilirsiniz.",
    ctaButton: "Sizi Arayalım",
  },
  en: {
    pageTitle: "Our Team",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Our Team",
    heroLead: "Meet the EveryMaterial team. Multilingual support for worldwide solutions.",
    members: [
      { initials: "MB", name: "Muhammet Bilal Kavras", role: "Digital Marketing", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "bilal@everymaterial.com", langs: ["TR", "EN"] },
      { initials: "HA", name: "Hussein Ali", role: "Sales Marketing", phone: "+90 546 638 21 75", phoneHref: "tel:+905466382175", email: "hussein@everymaterial.com", langs: ["TR", "DE", "AR"] },
      { initials: "UE", name: "Ugur Enes Ünel", role: "Export Specialist", phone: "+90 547 771 77 78", phoneHref: "tel:+905477717778", email: "ugur@everymaterial.com", langs: ["EN"] },
      { initials: "AY", name: "Ahmet Yusuf", role: "Sales Marketing", phone: "+49 1521 394 25 86", phoneHref: "tel:+4915213942586", email: "sales1@everymaterial.com", langs: ["DE"] },
      { initials: "BK", name: "Bedirhan Kavras", role: "Sales", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "info@everymaterial.com", langs: ["EN", "DE", "AR"] },
    ],
    ctaTitle: "Have a question?",
    ctaBody: "Get in touch with our team directly, or request a callback.",
    ctaButton: "Let Us Call You",
  },
  de: {
    pageTitle: "Unser Team",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Unser Team",
    heroLead: "Das EveryMaterial-Team. Mehrsprachiger Support weltweit.",
    members: [
      { initials: "MB", name: "Muhammet Bilal Kavras", role: "Digitales Marketing", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "bilal@everymaterial.com", langs: ["TR", "EN"] },
      { initials: "HA", name: "Hussein Ali", role: "Vertriebsmarketing", phone: "+90 546 638 21 75", phoneHref: "tel:+905466382175", email: "hussein@everymaterial.com", langs: ["TR", "DE", "AR"] },
      { initials: "UE", name: "Ugur Enes Ünel", role: "Exportspezialist", phone: "+90 547 771 77 78", phoneHref: "tel:+905477717778", email: "ugur@everymaterial.com", langs: ["EN"] },
      { initials: "AY", name: "Ahmet Yusuf", role: "Vertriebsmarketing", phone: "+49 1521 394 25 86", phoneHref: "tel:+4915213942586", email: "sales1@everymaterial.com", langs: ["DE"] },
      { initials: "BK", name: "Bedirhan Kavras", role: "Verkäufe", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "info@everymaterial.com", langs: ["EN", "DE", "AR"] },
    ],
    ctaTitle: "Haben Sie Fragen?",
    ctaBody: "Nehmen Sie direkt Kontakt mit unserem Team auf oder fordern Sie einen Rückruf an.",
    ctaButton: "Rückruf anfordern",
  },
  ar: {
    pageTitle: "فريقنا",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "فريقنا",
    heroLead: "فريق EveryMaterial. دعم متعدد اللغات حول العالم.",
    members: [
      { initials: "MB", name: "محمد بلال كافراش", role: "التسويق الرقمي", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "bilal@everymaterial.com", langs: ["TR", "EN"] },
      { initials: "HA", name: "حُسين علي", role: "مندوب المبيعات", phone: "+90 546 638 21 75", phoneHref: "tel:+905466382175", email: "hussein@everymaterial.com", langs: ["TR", "DE", "AR"] },
      { initials: "UE", name: "Ugur Enes Ünel", role: "أخصائي التصدير", phone: "+90 547 771 77 78", phoneHref: "tel:+905477717778", email: "ugur@everymaterial.com", langs: ["EN"] },
      { initials: "AY", name: "Ahmet Yusuf", role: "مندوب المبيعات", phone: "+49 1521 394 25 86", phoneHref: "tel:+4915213942586", email: "sales1@everymaterial.com", langs: ["DE"] },
      { initials: "BK", name: "بدر هان كافراش", role: "مندوب المبيعات", phone: "+90 545 911 10 02", phoneHref: "tel:+905459111002", email: "info@everymaterial.com", langs: ["EN", "DE", "AR"] },
    ],
    ctaTitle: "هل لديك سؤال؟",
    ctaBody: "تواصل مع فريقنا مباشرة أو اطلب أن نتصل بك.",
    ctaButton: "اطلب اتصالاً",
  },
};
