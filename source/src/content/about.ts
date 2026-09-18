import type { Localized } from "./types";

export interface AboutContent {
  pageTitle: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroImage: string;
  heroImageAlt: string;
  bodyHeading: string;
  paragraphs: string[];
  ctaTitle: string;
  ctaImage: string;
  ctaButton: string;
  /** Real fact from paragraphs[0] ("8 years of experience"), reused as a stat. */
  statYears: string;
  statYearsLabel: string;
  /** Real count of countries named in paragraphs[0] — Turkey, Germany, Palestine. */
  statCountries: string;
  statCountriesLabel: string;
  /** Real sentence excerpted from paragraphs[0] (the mission statement), styled as a pull-quote. */
  pullQuote: string;
  expertiseLabel: string;
  expertiseIntro: string;
}

/** Real content extracted verbatim from .deploy/about-{tr,en,de,ar}.html (Faz 3a pilot). */
export const aboutContent: Localized<AboutContent> = {
  tr: {
    pageTitle: "Hakkımızda",
    breadcrumbHome: "Anasayfa",
    breadcrumbCurrent: "Hakkımızda",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "Hakkımızda — küresel lojistik ve dış ticaret",
    bodyHeading: "everymaterial.com: Çözüm Ortağınız",
    paragraphs: [
      "everymaterial.com, Türkiye merkezli, Almanya ve Filistin çözüm ortaklı bir firma olarak dünya genelindeki müşterilerine kapsamlı hizmet sunmayı hedefleyen bir platformdur. 8 yıllık deneyimimizi sektörde edindiğimiz tecrübeyle birleştirerek, kendi adımızla hizmet vermekten gurur duyuyoruz. Misyonumuz, geniş ürün yelpazemizle müşteri ihtiyaçlarını en iyi şekilde karşılamaktır.",
      "Ürün kategorilerimiz arasında pleksi, ahşap, cam teşhir ekipmanları, etiketlikler, market ekipmanları, raf sistemleri, gıda ve endüstri makineleri bulunmaktadır. Ayrıca, anahtar teslim projelerde de uzmanlığımızla müşterilerimize kapsamlı çözümler sunuyoruz.",
      "Bizimle çalıştığınızda, yalnızca bir ürün tedarikçisi değil, ihtiyaçlarınıza özel çözümler sunan bir iş ortağı kazanırsınız. Müşterilerimizin taleplerine hızlı ve esnek bir şekilde yanıt vererek, iş süreçlerini desteklemeyi ve işlerini kolaylaştırmayı hedefliyoruz. Gıda ürünlerinden endüstriyel malzemelere kadar her türlü ihtiyacınızı karşılamak için buradayız.",
    ],
    ctaTitle: "Tüm Malzeme İhtiyaçlarınızı Bize Bırakın, Her Şeye Çözümümüz Var.",
    ctaImage: "/assets/images/every-material-slogan.jpeg",
    ctaButton: "İletişime Geçin",
    statYears: "8+",
    statYearsLabel: "Yıllık Tecrübe",
    statCountries: "3",
    statCountriesLabel: "Ülkede Çözüm Ortağı",
    pullQuote: "Misyonumuz, geniş ürün yelpazemizle müşteri ihtiyaçlarını en iyi şekilde karşılamaktır.",
    expertiseLabel: "Uzmanlık Alanları",
    expertiseIntro: "Geniş ürün yelpazemiz ve teknik uzmanlığımızla, ihtiyacınıza en uygun malzeme çözümünü sunuyoruz.",
  },
  en: {
    pageTitle: "About Us",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "About Us",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "About Us — global logistics and export",
    bodyHeading: "everymaterial.com: Your Solution Partner",
    paragraphs: [
      "everymaterial.com is a platform based in Turkey, with solution partners in Germany and Palestine, aiming to provide comprehensive service to customers worldwide. Combining our 8 years of industry experience, we take pride in serving under our own name. Our mission is to best meet customer needs with our wide product range.",
      "Our product categories include plexiglass, wooden, and glass display equipment, label holders, market equipment, shelving systems, and food and industrial machinery. We also offer comprehensive solutions to our customers with our expertise in turnkey projects.",
      "When you work with us, you gain not just a product supplier, but a business partner offering solutions tailored to your needs. By responding quickly and flexibly to our customers' requests, we aim to support their business processes and make their work easier. From food products to industrial materials, we are here to meet all your needs.",
    ],
    ctaTitle: "Leave All Your Material Needs to Us — We Have a Solution for Everything.",
    ctaImage: "/assets/images/every-material-slogan.jpeg",
    ctaButton: "Get in Touch",
    statYears: "8+",
    statYearsLabel: "Years of Experience",
    statCountries: "3",
    statCountriesLabel: "Countries, One Partnership",
    pullQuote: "Our mission is to best meet customer needs with our wide product range.",
    expertiseLabel: "Areas of Expertise",
    expertiseIntro: "With our wide product range and technical expertise, we offer the material solution best suited to your needs.",
  },
  de: {
    pageTitle: "Über uns",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Über uns",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "Über uns — globale Logistik und Export",
    bodyHeading: "everymaterial.com: Ihr Lösungspartner",
    paragraphs: [
      "everymaterial.com ist eine in der Türkei ansässige Plattform mit Lösungspartnern in Deutschland und Palästina, die Kunden weltweit einen umfassenden Service bieten möchte. Wir verbinden unsere 8-jährige Branchenerfahrung und sind stolz darauf, unter eigenem Namen zu agieren. Unsere Mission ist es, die Kundenbedürfnisse mit unserem breiten Produktsortiment bestmöglich zu erfüllen.",
      "Zu unseren Produktkategorien gehören Plexiglas-, Holz- und Glas-Ausstellungsausrüstung, Etikettenhalter, Marktausrüstung, Regalsysteme sowie Lebensmittel- und Industriemaschinen. Darüber hinaus bieten wir unseren Kunden mit unserer Expertise bei Schlüsselfertigprojekten umfassende Lösungen.",
      "Wenn Sie mit uns zusammenarbeiten, gewinnen Sie nicht nur einen Produktlieferanten, sondern einen Geschäftspartner, der auf Ihre Bedürfnisse zugeschnittene Lösungen bietet. Durch schnelles und flexibles Reagieren auf die Anfragen unserer Kunden möchten wir deren Geschäftsprozesse unterstützen und ihre Arbeit erleichtern. Von Lebensmittelprodukten bis zu Industriematerialien sind wir hier, um all Ihre Bedürfnisse zu erfüllen.",
    ],
    ctaTitle: "Überlassen Sie uns all Ihre Materialbedürfnisse — wir haben für alles eine Lösung.",
    ctaImage: "/assets/images/every-material-slogan.jpeg",
    ctaButton: "Kontaktieren Sie uns",
    statYears: "8+",
    statYearsLabel: "Jahre Erfahrung",
    statCountries: "3",
    statCountriesLabel: "Länder, eine Partnerschaft",
    pullQuote: "Unsere Mission ist es, die Kundenbedürfnisse mit unserem breiten Produktsortiment bestmöglich zu erfüllen.",
    expertiseLabel: "Expertisebereiche",
    expertiseIntro: "Mit unserem breiten Produktsortiment und unserer technischen Expertise bieten wir Ihnen die passende Materiallösung.",
  },
  ar: {
    pageTitle: "من نحن",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "من نحن",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "من نحن — اللوجستيات العالمية والتصدير",
    bodyHeading: "everymaterial.com: شريكك في الحلول",
    paragraphs: [
      "everymaterial.com هي منصة مقرها تركيا، مع شركاء حلول في ألمانيا وفلسطين، تهدف إلى تقديم خدمة شاملة لعملائها حول العالم. من خلال الجمع بين خبرتنا في هذا المجال على مدى 8 سنوات، نفخر بتقديم خدماتنا باسمنا الخاص. مهمتنا هي تلبية احتياجات العملاء على أفضل وجه من خلال مجموعة منتجاتنا الواسعة.",
      "تشمل فئات منتجاتنا معدات العرض من البلكسيغلاس والخشب والزجاج، وحوامل البطاقات، ومعدات الأسواق، وأنظمة الرفوف، وآلات الأغذية والصناعة. كما نقدم لعملائنا حلولاً شاملة بفضل خبرتنا في المشاريع الجاهزة (تسليم مفتاح).",
      "عندما تعمل معنا، لا تكسب مجرد مورّد منتجات، بل شريك عمل يقدم حلولاً مصممة خصيصاً لاحتياجاتك. من خلال الاستجابة السريعة والمرنة لطلبات عملائنا، نهدف إلى دعم عملياتهم التجارية وتسهيل أعمالهم. من المنتجات الغذائية إلى المواد الصناعية، نحن هنا لتلبية جميع احتياجاتكم.",
    ],
    ctaTitle: "اتركوا لنا جميع احتياجاتكم من المواد، لدينا حل لكل شيء.",
    ctaImage: "/assets/images/every-material-slogan.jpeg",
    ctaButton: "تواصل معنا",
    statYears: "+8",
    statYearsLabel: "سنوات من الخبرة",
    statCountries: "3",
    statCountriesLabel: "دول، شراكة واحدة",
    pullQuote: "مهمتنا هي تلبية احتياجات العملاء على أفضل وجه من خلال مجموعة منتجاتنا الواسعة.",
    expertiseLabel: "مجالات الخبرة",
    expertiseIntro: "بفضل مجموعة منتجاتنا الواسعة وخبرتنا التقنية، نقدم لكم حل المواد الأنسب لاحتياجاتكم.",
  },
};
