import type { Localized } from "./types";

export interface ExportService {
  icon: string;
  title: string;
  body: string;
}

export interface ExportConsultancyContent {
  pageTitle: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroLead: string;
  heroImage: string;
  heroImageAlt: string;
  introTitle1: string;
  introBody1: string;
  introTitle2: string;
  introBody2: string;
  servicesTitle: string;
  services: ExportService[];
  ctaTitle: string;
  ctaBody: string;
}

/** Real content extracted verbatim from .deploy/ihracat-danismanligi-{tr,en,de,ar}.html (Faz 3e). */
export const exportConsultancyContent: Localized<ExportConsultancyContent> = {
  tr: {
    pageTitle: "İhracat Danışmanlığı",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "İhracat Danışmanlığı",
    heroLead: "Uluslararası pazarlara açılma sürecinde profesyonel rehberlik ve destek.",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "İhracat Danışmanlığı — küresel lojistik ve dış ticaret",
    introTitle1: "İhracat Danışmanlığı Nedir?",
    introBody1: "İhracat danışmanlığı, firmaların uluslararası pazarlara açılma süreçlerinde ihtiyaç duydukları rehberlik ve destek hizmetlerini sunan profesyonel bir hizmettir. Bu hizmet, ürünlerin ve hizmetlerin yabancı pazarlarda doğru şekilde konumlandırılmasından, ihracat süreçlerinin yönetimine kadar geniş bir yelpazeyi kapsar. İhracat danışmanları, pazar araştırması, uygun ihracat stratejilerinin geliştirilmesi, yasal ve lojistik süreçlerin yönetimi gibi konularda firmalara yol gösterir.",
    introTitle2: "EveryMaterial İhracat Danışmanlığı",
    introBody2: "EveryMaterial olarak, müşterilerimizin uluslararası pazarlarda başarılı olmalarını sağlamak amacıyla kapsamlı ihracat danışmanlığı hizmetleri sunuyoruz. Türkiye'nin zengin ürün yelpazesini dünya ile buluşturmak için uzman ekibimizle birlikte çalışıyoruz. Müşterilerimizin ihtiyaçlarına göre özelleştirilmiş çözümler sunarak, ihracat süreçlerini sorunsuz ve verimli bir şekilde yönetmelerine yardımcı oluyoruz.",
    servicesTitle: "Alt Hizmet Alanlarımız",
    services: [
      { icon: "market", title: "Pazar Araştırması ve Analizi", body: "Müşterilerimize hedef pazarlar hakkında detaylı bilgi ve analizler sunarak, en uygun pazarlara ulaşmalarını sağlıyoruz." },
      { icon: "target", title: "Ürün Konumlandırma ve Pazarlama Stratejileri", body: "Ürünlerinizin uluslararası pazarlarda doğru bir şekilde konumlandırılması için stratejik tavsiyeler veriyoruz." },
      { icon: "legal", title: "Yasal ve Gümrük Mevzuat Danışmanlığı", body: "İhracat süreçlerinde karşılaşılabilecek yasal ve gümrük engellerini aşmanıza yardımcı oluyoruz." },
      { icon: "logistics", title: "Lojistik ve Nakliye", body: "Ürünlerinizin en hızlı ve güvenli şekilde hedef pazarlara ulaştırılması için lojistik çözümler sunuyoruz." },
      { icon: "docs", title: "Dökümantasyon ve Sertifikasyon", body: "İhracat işlemlerinizde gerekli olan tüm dökümantasyon ve sertifikasyon işlemlerinde size rehberlik ediyoruz." },
      { icon: "handshake", title: "Müşteri İlişkileri", body: "Uluslararası müşterilerle etkili iletişim kurmanız ve sağlam ilişkiler geliştirmeniz için destek sağlıyoruz." },
    ],
    ctaTitle: "İhracat Sürecinizi Birlikte Planlayalım",
    ctaBody: "Ekibimizle doğrudan iletişime geçebilir ya da sizi aramamızı isteyebilirsiniz.",
  },
  en: {
    pageTitle: "Export Consultancy",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Export Consultancy",
    heroLead: "Professional guidance and support for companies expanding into international markets.",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "Export Consultancy — global logistics and foreign trade",
    introTitle1: "What is Export Consultancy?",
    introBody1: "Export consultancy is a professional service that provides the guidance and support companies need when expanding into international markets. It covers a wide range of activities — from correctly positioning products and services in foreign markets to managing the entire export process. Export consultants guide companies on market research, developing suitable export strategies, and managing legal and logistics processes.",
    introTitle2: "EveryMaterial Export Consultancy",
    introBody2: "At EveryMaterial, we offer comprehensive export consultancy services to help our clients succeed in international markets. Working together with our expert team, we bring Turkey's rich product range to the world. By offering solutions tailored to our clients' needs, we help them manage their export processes smoothly and efficiently.",
    servicesTitle: "Our Service Areas",
    services: [
      { icon: "market", title: "Market Research and Analysis", body: "We provide our clients with detailed information and analysis on target markets, helping them reach the most suitable markets." },
      { icon: "target", title: "Product Positioning and Marketing Strategies", body: "We give strategic advice on correctly positioning your products in international markets." },
      { icon: "legal", title: "Legal and Customs Consultancy", body: "We help you overcome the legal and customs obstacles that can arise during export processes." },
      { icon: "logistics", title: "Logistics and Transportation", body: "We offer logistics solutions to get your products to target markets as quickly and safely as possible." },
      { icon: "docs", title: "Documentation and Certification", body: "We guide you through all the documentation and certification procedures required for your export operations." },
      { icon: "handshake", title: "Customer Relations", body: "We support you in building effective communication and strong relationships with international customers." },
    ],
    ctaTitle: "Let's Plan Your Export Journey Together",
    ctaBody: "Get in touch with our team directly, or request a callback.",
  },
  de: {
    pageTitle: "Exportberatung",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Exportberatung",
    heroLead: "Professionelle Beratung und Unterstützung für Unternehmen beim Eintritt in internationale Märkte.",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "Exportberatung — globale Logistik und Außenhandel",
    introTitle1: "Was ist Exportberatung?",
    introBody1: "Exportberatung ist eine professionelle Dienstleistung, die Unternehmen bei der Erschließung internationaler Märkte die notwendige Beratung und Unterstützung bietet. Sie umfasst ein breites Spektrum – von der richtigen Positionierung von Produkten und Dienstleistungen auf ausländischen Märkten bis zur Steuerung des gesamten Exportprozesses. Exportberater unterstützen Unternehmen bei der Marktforschung, der Entwicklung geeigneter Exportstrategien sowie bei rechtlichen und logistischen Prozessen.",
    introTitle2: "Exportberatung von EveryMaterial",
    introBody2: "Als EveryMaterial bieten wir umfassende Exportberatungsdienstleistungen an, damit unsere Kunden auf internationalen Märkten erfolgreich sind. Gemeinsam mit unserem erfahrenen Team bringen wir die vielfältige türkische Produktpalette in die Welt. Mit maßgeschneiderten Lösungen für die Bedürfnisse unserer Kunden helfen wir ihnen, ihre Exportprozesse reibungslos und effizient zu gestalten.",
    servicesTitle: "Unsere Leistungsbereiche",
    services: [
      { icon: "market", title: "Marktforschung und Analyse", body: "Wir bieten unseren Kunden detaillierte Informationen und Analysen zu Zielmärkten, damit sie die am besten geeigneten Märkte erreichen." },
      { icon: "target", title: "Produktpositionierung und Marketingstrategien", body: "Wir geben strategische Empfehlungen zur richtigen Positionierung Ihrer Produkte auf internationalen Märkten." },
      { icon: "legal", title: "Rechts- und Zollberatung", body: "Wir helfen Ihnen, rechtliche und zollrechtliche Hürden zu überwinden, die während des Exportprozesses auftreten können." },
      { icon: "logistics", title: "Logistik und Transport", body: "Wir bieten logistische Lösungen, damit Ihre Produkte so schnell und sicher wie möglich die Zielmärkte erreichen." },
      { icon: "docs", title: "Dokumentation und Zertifizierung", body: "Wir begleiten Sie durch alle Dokumentations- und Zertifizierungsprozesse, die für Ihre Exportgeschäfte erforderlich sind." },
      { icon: "handshake", title: "Kundenbeziehungen", body: "Wir unterstützen Sie beim Aufbau einer effektiven Kommunikation und starker Beziehungen zu internationalen Kunden." },
    ],
    ctaTitle: "Lassen Sie uns gemeinsam Ihren Exportweg planen",
    ctaBody: "Nehmen Sie direkt Kontakt mit unserem Team auf oder fordern Sie einen Rückruf an.",
  },
  ar: {
    pageTitle: "استشارات التصدير",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "استشارات التصدير",
    heroLead: "إرشاد ودعم احترافي للشركات التي تتوسع في الأسواق الدولية.",
    heroImage: "/assets/img/sayfa/iStock-828124804.jpg",
    heroImageAlt: "استشارات التصدير — اللوجستيات العالمية والتجارة الخارجية",
    introTitle1: "ما هي استشارات التصدير؟",
    introBody1: "استشارات التصدير هي خدمة احترافية تقدم التوجيه والدعم الذي تحتاجه الشركات في عملية انفتاحها على الأسواق الدولية. تغطي هذه الخدمة نطاقًا واسعًا، من التموضع الصحيح للمنتجات والخدمات في الأسواق الخارجية وحتى إدارة عمليات التصدير بأكملها. يقوم مستشارو التصدير بتوجيه الشركات في أبحاث السوق، وتطوير استراتيجيات التصدير المناسبة، وإدارة العمليات القانونية واللوجستية.",
    introTitle2: "استشارات التصدير من EveryMaterial",
    introBody2: "في EveryMaterial، نقدم خدمات استشارية شاملة للتصدير لمساعدة عملائنا على النجاح في الأسواق الدولية. نعمل مع فريقنا من الخبراء لتقديم مجموعة المنتجات التركية الغنية إلى العالم. من خلال تقديم حلول مخصصة وفق احتياجات عملائنا، نساعدهم على إدارة عمليات التصدير بسلاسة وكفاءة.",
    servicesTitle: "مجالات خدماتنا",
    services: [
      { icon: "market", title: "أبحاث وتحليلات السوق", body: "نزوّد عملاءنا بمعلومات وتحليلات مفصّلة حول الأسواق المستهدفة، لمساعدتهم في الوصول إلى الأسواق الأنسب." },
      { icon: "target", title: "تحديد موضع المنتج واستراتيجيات التسويق", body: "نقدّم نصائح استراتيجية لتحديد موضع منتجاتك بشكل صحيح في الأسواق الدولية." },
      { icon: "legal", title: "استشارات التشريعات القانونية والجمركية", body: "نساعدك على تجاوز العقبات القانونية والجمركية التي قد تواجهها أثناء عمليات التصدير." },
      { icon: "logistics", title: "الخدمات اللوجستية والنقل", body: "نقدّم حلولاً لوجستية لإيصال منتجاتك إلى الأسواق المستهدفة بأسرع وأكثر الطرق أمانًا." },
      { icon: "docs", title: "التوثيق والاعتماد", body: "نرشدك خلال جميع إجراءات التوثيق والاعتماد اللازمة لعمليات التصدير الخاصة بك." },
      { icon: "handshake", title: "علاقات العملاء", body: "ندعمك في بناء تواصل فعّال وعلاقات قوية مع العملاء الدوليين." },
    ],
    ctaTitle: "لنخطط لرحلة التصدير الخاصة بك معًا",
    ctaBody: "تواصل مع فريقنا مباشرة أو اطلب أن نتصل بك.",
  },
};
