import type { Localized } from "./types";

export interface ContactContent {
  pageTitle: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroLead: string;
  formTitle: string;
  labelName: string;
  labelEmail: string;
  labelPhone: string;
  labelMessage: string;
  placeholderName: string;
  placeholderEmail: string;
  placeholderPhone: string;
  placeholderMessage: string;
  recaptchaText: string;
  submitLabel: string;
  successTitle: string;
  successBody: string;
  infoTitle: string;
  phoneLabel: string;
  emailLabel: string;
  addressLabel: string;
}

/** Real content extracted from .deploy/iletisim-{tr,en,de,ar}.html (Faz 3h). Actual contact
 * values (phone/email/address) are not duplicated here — they already live in site.ts and are
 * reused from there; this file only holds page-specific chrome text. */
export const contactContent: Localized<ContactContent> = {
  tr: {
    pageTitle: "İletişim",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "İletişim",
    heroLead: "Sorularınız için bize ulaşın, ekibimiz size dönüş yapsın.",
    formTitle: "İletişim Formu",
    labelName: "Adınız Soyadınız",
    labelEmail: "E-posta Adresiniz",
    labelPhone: "Telefon Numaranız",
    labelMessage: "Mesajınız",
    placeholderName: "Adınız Soyadınız",
    placeholderEmail: "ornek@sirket.com",
    placeholderPhone: "+90 5XX XXX XX XX",
    placeholderMessage: "Mesajınız",
    recaptchaText: "Gönder'e bastığınızda mesajınız WhatsApp üzerinden iletilir.",
    submitLabel: "Gönder",
    successTitle: "WhatsApp'ta Açıldı",
    successBody: "Mesajınız WhatsApp'ta hazır şekilde açıldı — bize ulaşması için orada göndermeyi unutmayın.",
    infoTitle: "İletişim Bilgileri",
    phoneLabel: "Telefon",
    emailLabel: "E-posta",
    addressLabel: "Adres",
  },
  en: {
    pageTitle: "Contact",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Contact",
    heroLead: "Get in touch with us, and our team will get back to you.",
    formTitle: "Contact Form",
    labelName: "Your Name and Surname",
    labelEmail: "Your E-mail Address",
    labelPhone: "Your Phone Number",
    labelMessage: "Your Message",
    placeholderName: "Your Name and Surname",
    placeholderEmail: "email@example.com",
    placeholderPhone: "+90 5XX XXX XX XX",
    placeholderMessage: "Your Message",
    recaptchaText: "Submitting sends your message to us via WhatsApp.",
    submitLabel: "Submit",
    successTitle: "Opened in WhatsApp",
    successBody: "Your message is ready in WhatsApp — please send it there so it reaches us.",
    infoTitle: "Contact Information",
    phoneLabel: "Phone",
    emailLabel: "E-mail",
    addressLabel: "Address",
  },
  de: {
    pageTitle: "Kontakt",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Kontakt",
    heroLead: "Nehmen Sie Kontakt mit uns auf – unser Team meldet sich bei Ihnen.",
    formTitle: "Kontaktformular",
    labelName: "Vorname - Nachname",
    labelEmail: "Ihre E-Mail Adresse",
    labelPhone: "Ihre Telefonnummer",
    labelMessage: "Ihre Nachricht",
    placeholderName: "Vorname - Nachname",
    placeholderEmail: "email@beispiel.com",
    placeholderPhone: "+90 5XX XXX XX XX",
    placeholderMessage: "Ihre Nachricht",
    recaptchaText: "Beim Absenden wird Ihre Nachricht über WhatsApp gesendet.",
    submitLabel: "Senden",
    successTitle: "In WhatsApp geöffnet",
    successBody: "Ihre Nachricht ist in WhatsApp vorbereitet — bitte senden Sie sie dort ab, damit sie uns erreicht.",
    infoTitle: "Kontaktinformationen",
    phoneLabel: "Telefon",
    emailLabel: "E-Mail",
    addressLabel: "Adresse",
  },
  ar: {
    pageTitle: "اتصل بنا",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "اتصل بنا",
    heroLead: "تواصل معنا وسيقوم فريقنا بالرد عليك.",
    formTitle: "نموذج الاتصال",
    labelName: "الأسم و الكنية",
    labelEmail: "عنوان بريدكم الإلكتروني",
    labelPhone: "رقم هاتفكم",
    labelMessage: "رسائلكم",
    placeholderName: "الأسم و الكنية",
    placeholderEmail: "email@example.com",
    placeholderPhone: "+90 5XX XXX XX XX",
    placeholderMessage: "رسائلكم",
    recaptchaText: "عند الإرسال، تصلنا رسالتك عبر واتساب.",
    submitLabel: "أرسل",
    successTitle: "تم الفتح في واتساب",
    successBody: "رسالتك جاهزة الآن في واتساب — يُرجى إرسالها من هناك لتصلنا.",
    infoTitle: "معلومات الاتصال",
    phoneLabel: "الهاتف",
    emailLabel: "البريد الإلكتروني",
    addressLabel: "العنوان",
  },
};
