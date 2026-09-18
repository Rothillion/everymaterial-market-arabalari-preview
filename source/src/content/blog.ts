import type { Localized } from "./types";

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  image: string;
  excerpt: string | null;
  hasDetail: boolean;
}

export interface BlogListContent {
  pageTitle: string;
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  heroLead: string;
  filters: string[];
  readMoreLabel: string;
  posts: BlogPost[];
}

export interface BlogArticleBlock {
  type: "h2" | "h3" | "p";
  text: string;
}

export interface BlogArticleContent {
  breadcrumbHome: string;
  breadcrumbBlog: string;
  tag: string;
  date: string;
  title: string;
  heroImage: string;
  lead: string;
  blocks: BlogArticleBlock[];
  quoteText: string;
  quoteCite: string;
  relatedTitle: string;
  related: string[];
  sideRecentTitle: string;
  sideCtaTitle: string;
  sideCtaBody: string;
  sideCtaBtn: string;
  sideCatsTitle: string;
}

/** Real content extracted from .deploy/blog-{tr,en,de,ar}.html and
 * blogdetay-pleksi-kutu-nasil-uretilir{,-en,-de,-ar}.html (Faz 3g). Only the one post with
 * a real detail page ("Pleksi Kutu Nasıl Üretilir?") has hasDetail: true / a real slug link;
 * the other 14 real posts are listed but not clickable since no real article content exists. */
export const blogContent: Localized<BlogListContent> = {
  tr: {
    pageTitle: "Blog",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbCurrent: "Blog",
    heroLead: "Pleksi kutu üretimi, kullanımı ve teşhir ekipmanları hakkında ürün odaklı rehberler.",
    filters: ["Tüm Yazılar", "Ürün Rehberleri", "Mağaza Dekorasyonu", "Evcil Hayvan Ürünleri"],
    readMoreLabel: "Devamını Oku",
    posts: [
      { slug: "ozel-olcu-pleksi-kutu-siparis-rehberi", title: "Özel Ölçü Pleksi Kutu Sipariş Rehberi", date: "10 Mayıs 2026", image: "/assets/img/blog/thumb/ozel-olcu-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pastane-ve-sekercilerde-pleksi-kutu-kullanimi", title: "Pastane ve Şekercilerde Pleksi Kutu Kullanımı", date: "9 Mayıs 2026", image: "/assets/img/blog/thumb/sekerleme-pastane-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-fiyatlarini-etkileyen-7-faktor", title: "Pleksi Kutu Fiyatlarını Etkileyen 7 Faktör", date: "9 Mayıs 2026", image: "/assets/img/blog/thumb/pleksi-kutu-price.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-nasil-uretilir", title: "Pleksi Kutu Nasıl Üretilir?", date: "9 Mayıs 2026", image: "/assets/img/blog/thumb/pleksi-kutu-nasil-uretilir.jpeg", excerpt: null, hasDetail: true },
      { slug: "kopek-mama-kabi", title: "Köpek Mama Kabı", date: "25 Nisan 2026", image: "/assets/img/blog/thumb/pleksi-kopek-mama-kabi.jpeg", excerpt: "Köpek mama kabı seçerken paslanmaz çelik, seramik ve plastik farkları; yavaş yediren tasarımlar, kaydırmaz taban, doğru yükseklik ve temizlik ipuçları.", hasDetail: false },
      { slug: "kedi-mama-kabi", title: "Kedi Mama Kabı", date: "25 Nisan 2026", image: "/assets/img/blog/thumb/pleksi-kedi-mama-kabi_1.jpeg", excerpt: "Kedi mama kabı seçerken malzeme (çelik/seramik/pleksi), bıyık konforu, kaymaz taban ve temizlik kriterlerini öğrenin.", hasDetail: false },
      { slug: "pleksi-boru", title: "Pleksi Boru", date: "25 Nisan 2026", image: "/assets/img/blog/thumb/pleksi-boru.jpeg", excerpt: "Pleksi boru nedir, avantajları nelerdir? Kuruyemiş, market ve şarküteride pleksi boru ve borulardan oluşan pleksi silo çözümleri.", hasDetail: false },
      { slug: "pleksi-bombe-akvaryum", title: "Pleksi Bombe Akvaryum", date: "25 Nisan 2026", image: "/assets/img/blog/thumb/pleksi-akvaryum.jpeg", excerpt: "Pleksi bombe akvaryum nedir? Optik şeffaflık, üretim detayları, mağaza/şarküteri kullanım senaryoları ve pleksi yüzey bakımı.", hasDetail: false },
      { slug: "pleksi-bombe", title: "Pleksi Bombe", date: "25 Nisan 2026", image: "/assets/img/blog/thumb/8dae8629-a47d-403d-b994-c6243f3ce930.png", excerpt: "Pleksi bombe çözümlerle kuruyemiş, market ve şarküteri reyonlarında premium teşhir, hijyen ve düzen sağlayın.", hasDetail: false },
      { slug: "kure-kutu", title: "Küre Kutu", date: "25 Nisan 2026", image: "/assets/img/blog/thumb/kure-kutu.jpg", excerpt: "Küre kutu ile jelibon ve şekerleme reyonunda 360° görünürlük, hijyenik sunum ve premium vitrin etkisi yakalayın.", hasDetail: false },
      { slug: "bombe-kapak", title: "Bombe Kapak", date: "25 Nisan 2026", image: "/assets/img/blog/thumb/bombe-kapak_1.jpg", excerpt: "Bombe kapak nedir? Kuruyemiş dükkanında pleksi kutu ve ahşap kova sunumunu yükselten bombe kapak avantajları, ölçülendirme ve kullanım ipuçları.", hasDetail: false },
      { slug: "toplu-gida-teshir-ekipmanlari", title: "Toplu Gıda Teşhir Ekipmanları", date: "28 Mart 2026", image: "/assets/img/blog/thumb/20260328_165213_c5abce562c34b0c1.png", excerpt: "Kuruyemiş, market ve şarküteri için pleksi kutu ve ahşap kova odaklı toplu gıda teşhir ekipmanları: hijyen, modülerlik, etiketleme ve satış artıran reyon kurgusu.", hasDetail: false },
      { slug: "parfum-dukkani-dekorasyonu", title: "Parfüm Dükkanı Dekorasyonu", date: "22 Mart 2026", image: "/assets/img/blog/thumb/20260322_183134_379ba035cb095ba1.png", excerpt: "Parfüm dükkanı dekorasyonu için vitrin, raf düzeni, aydınlatma ve tester alanı ipuçları. Pleksi kutu ve pleksi standlarla premium mağaza kurgusu.", hasDetail: false },
      { slug: "sarkuteri-dekorasyonu", title: "Şarküteri Dekorasyonu", date: "22 Mart 2026", image: "/assets/img/blog/thumb/20260322_180857_113272a9edf6e215.png", excerpt: "Şarküteri dekorasyonu için konsept, reyon yerleşimi, ışık ve etiketleme ipuçları. Pleksi kutu ve ahşap kova ile hijyenik, premium sunum.", hasDetail: false },
      { slug: "istocta-teshir-ekipmanlari-kuruyemis-ve-sarkuteri-icin-pleksi-kutu-ve-ahsap-kova-rehberi", title: "İstoç'ta Teşhir Ekipmanları: Kuruyemiş ve Şarküteri için Pleksi Kutu ve Ahşap Kova Rehberi", date: "15 Şubat 2026", image: "/assets/img/blog/thumb/20260215_230019_2c23c6fb8412aa7f.png", excerpt: "İstoç'ta kuruyemiş marketi ve şarküteri açacaklar için pleksi kutu ve ahşap kova odaklı profesyonel teşhir ekipmanları rehberi.", hasDetail: false },
    ],
  },
  en: {
    pageTitle: "Blog",
    breadcrumbHome: "Home",
    breadcrumbCurrent: "Blog",
    heroLead: "Product-focused guides on plexiglass box manufacturing, use, and display equipment.",
    filters: ["All Posts", "Product Guides", "Store Decoration", "Pet Products"],
    readMoreLabel: "Read Article",
    posts: [
      { slug: "ozel-olcu-pleksi-kutu-siparis-rehberi", title: "Custom-Sized Plexiglass Box Order Guide", date: "May 10, 2026", image: "/assets/img/blog/thumb/ozel-olcu-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pastane-ve-sekercilerde-pleksi-kutu-kullanimi", title: "Use of Plexiglass Boxes in Patisseries and Confectioneries", date: "May 9, 2026", image: "/assets/img/blog/thumb/sekerleme-pastane-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-fiyatlarini-etkileyen-7-faktor", title: "7 Factors Affecting Plexiglass Box Prices", date: "May 9, 2026", image: "/assets/img/blog/thumb/pleksi-kutu-price.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-nasil-uretilir", title: "How Are Plexiglass Boxes Manufactured", date: "May 9, 2026", image: "/assets/img/blog/thumb/pleksi-kutu-nasil-uretilir.jpeg", excerpt: null, hasDetail: true },
      { slug: "kopek-mama-kabi", title: "Dog Food Bowl", date: "Apr 25, 2026", image: "/assets/img/blog/thumb/pleksi-kopek-mama-kabi.jpeg", excerpt: "Stainless steel, ceramic, and plastic differences when choosing a dog food bowl; slow-feed designs, non-slip base, correct height, and cleaning tips.", hasDetail: false },
      { slug: "kedi-mama-kabi", title: "Cat Food Bowl", date: "Apr 25, 2026", image: "/assets/img/blog/thumb/pleksi-kedi-mama-kabi_1.jpeg", excerpt: "What to check when choosing a cat food bowl: material (steel/ceramic/plexi), whisker comfort, non-slip base, and cleaning criteria.", hasDetail: false },
      { slug: "pleksi-boru", title: "Plexiglass Tube", date: "Apr 25, 2026", image: "/assets/img/blog/thumb/pleksi-boru.jpeg", excerpt: "What is a plexiglass tube and what are its advantages? Plexiglass tube and tube-based silo solutions for nut shops, markets, and delis.", hasDetail: false },
      { slug: "pleksi-bombe-akvaryum", title: "Plexi Dome Aquarium", date: "Apr 25, 2026", image: "/assets/img/blog/thumb/pleksi-akvaryum.jpeg", excerpt: "What is a plexi dome aquarium? Optical clarity, manufacturing details, store/deli use cases, and plexiglass surface care.", hasDetail: false },
      { slug: "pleksi-bombe", title: "Plexi Bombe", date: "Apr 25, 2026", image: "/assets/img/blog/thumb/8dae8629-a47d-403d-b994-c6243f3ce930.png", excerpt: "Achieve premium display, hygiene, and order in nut, market, and deli sections with plexi bombe solutions.", hasDetail: false },
      { slug: "kure-kutu", title: "Sphere Box", date: "Apr 25, 2026", image: "/assets/img/blog/thumb/kure-kutu.jpg", excerpt: "Achieve 360° visibility, hygienic presentation, and a premium showcase effect in the candy section with the sphere box.", hasDetail: false },
      { slug: "bombe-kapak", title: "Domed Lid", date: "Apr 25, 2026", image: "/assets/img/blog/thumb/bombe-kapak_1.jpg", excerpt: "What is a domed lid? Advantages, sizing, and usage tips for domed lids that elevate plexiglass box and wooden bucket presentation in nut shops.", hasDetail: false },
      { slug: "toplu-gida-teshir-ekipmanlari", title: "Bulk Food Display Equipment", date: "Mar 28, 2026", image: "/assets/img/blog/thumb/20260328_165213_c5abce562c34b0c1.png", excerpt: "Plexiglass box and wooden bucket bulk food display equipment for nut shops, markets, and delis: hygiene, modularity, labeling, and sales-boosting layout.", hasDetail: false },
      { slug: "parfum-dukkani-dekorasyonu", title: "Perfume Shop Decoration", date: "Mar 22, 2026", image: "/assets/img/blog/thumb/20260322_183134_379ba035cb095ba1.png", excerpt: "Display, shelf layout, lighting, and tester-area tips for perfume shop decoration. A premium, hygienic store setup with plexiglass boxes and stands.", hasDetail: false },
      { slug: "sarkuteri-dekorasyonu", title: "Delicatessen Decoration", date: "Mar 22, 2026", image: "/assets/img/blog/thumb/20260322_180857_113272a9edf6e215.png", excerpt: "Concept, section layout, lighting, and labeling tips for delicatessen decoration. Hygienic, premium presentation with plexiglass boxes and wooden buckets.", hasDetail: false },
      { slug: "istocta-teshir-ekipmanlari-kuruyemis-ve-sarkuteri-icin-pleksi-kutu-ve-ahsap-kova-rehberi", title: "Display Equipment in İstoç: Plexiglass Bins and Wooden Barrels for Nuts & Delis", date: "Feb 15, 2026", image: "/assets/img/blog/thumb/20260215_230019_2c23c6fb8412aa7f.png", excerpt: "A professional display-equipment guide for those opening a nut shop or deli in İstoç, focused on plexiglass boxes and wooden buckets.", hasDetail: false },
    ],
  },
  de: {
    pageTitle: "Blog",
    breadcrumbHome: "Startseite",
    breadcrumbCurrent: "Blog",
    heroLead: "Produktorientierte Ratgeber zur Herstellung, Verwendung und Präsentation von Plexiglasboxen.",
    filters: ["Alle Beiträge", "Produktratgeber", "Ladendekoration", "Haustierprodukte"],
    readMoreLabel: "Artikel lesen",
    posts: [
      { slug: "ozel-olcu-pleksi-kutu-siparis-rehberi", title: "Bestellratgeber für Plexiglas-Boxen nach Maß", date: "10. Mai 2026", image: "/assets/img/blog/thumb/ozel-olcu-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pastane-ve-sekercilerde-pleksi-kutu-kullanimi", title: "Verwendung von Plexiglasboxen in Konditoreien und Süßwarengeschäften", date: "9. Mai 2026", image: "/assets/img/blog/thumb/sekerleme-pastane-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-fiyatlarini-etkileyen-7-faktor", title: "7 Faktoren, die die Preise von Plexiglasboxen beeinflussen", date: "9. Mai 2026", image: "/assets/img/blog/thumb/pleksi-kutu-price.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-nasil-uretilir", title: "Wie werden Plexiglasboxen hergestellt", date: "9. Mai 2026", image: "/assets/img/blog/thumb/pleksi-kutu-nasil-uretilir.jpeg", excerpt: null, hasDetail: true },
      { slug: "kopek-mama-kabi", title: "Hundenapf", date: "25. Apr 2026", image: "/assets/img/blog/thumb/pleksi-kopek-mama-kabi.jpeg", excerpt: "Unterschiede zwischen Edelstahl, Keramik und Kunststoff bei der Wahl eines Hundenapfs; langsam fütternde Designs, rutschfester Boden, richtige Höhe und Reinigungstipps.", hasDetail: false },
      { slug: "kedi-mama-kabi", title: "Katzennapf", date: "25. Apr 2026", image: "/assets/img/blog/thumb/pleksi-kedi-mama-kabi_1.jpeg", excerpt: "Worauf bei der Wahl eines Katzennapfs zu achten ist: Material (Stahl/Keramik/Plexiglas), Schnurrhaarkomfort, rutschfester Boden und Reinigungskriterien.", hasDetail: false },
      { slug: "pleksi-boru", title: "Plexiglasrohr", date: "25. Apr 2026", image: "/assets/img/blog/thumb/pleksi-boru.jpeg", excerpt: "Was ist ein Plexiglasrohr und welche Vorteile hat es? Rohrbasierte Silo-Lösungen für Nussgeschäfte, Märkte und Feinkostläden.", hasDetail: false },
      { slug: "pleksi-bombe-akvaryum", title: "Plexi-Kuppel-Aquarium", date: "25. Apr 2026", image: "/assets/img/blog/thumb/pleksi-akvaryum.jpeg", excerpt: "Was ist ein Plexi-Kuppel-Aquarium? Optische Klarheit, Herstellungsdetails, Anwendungsfälle für Geschäfte/Feinkostläden und Pflege der Plexiglasoberfläche.", hasDetail: false },
      { slug: "pleksi-bombe", title: "Plexi Bombe", date: "25. Apr 2026", image: "/assets/img/blog/thumb/8dae8629-a47d-403d-b994-c6243f3ce930.png", excerpt: "Erzielen Sie mit Plexi-Bombe-Lösungen eine hochwertige Präsentation, Hygiene und Ordnung in Nuss-, Markt- und Feinkostabteilungen.", hasDetail: false },
      { slug: "kure-kutu", title: "Kugelbox", date: "25. Apr 2026", image: "/assets/img/blog/thumb/kure-kutu.jpg", excerpt: "Erzielen Sie mit der Kugelbox 360°-Sichtbarkeit, hygienische Präsentation und einen hochwertigen Vitrineneffekt in der Süßwarenabteilung.", hasDetail: false },
      { slug: "bombe-kapak", title: "Gewölbter Deckel", date: "25. Apr 2026", image: "/assets/img/blog/thumb/bombe-kapak_1.jpg", excerpt: "Was ist ein gewölbter Deckel? Vorteile, Maße und Anwendungstipps für gewölbte Deckel, die die Präsentation von Plexiglasboxen aufwerten.", hasDetail: false },
      { slug: "toplu-gida-teshir-ekipmanlari", title: "Lebensmittel-Präsentationsausstattung für Großgebinde", date: "28. März 2026", image: "/assets/img/blog/thumb/20260328_165213_c5abce562c34b0c1.png", excerpt: "Plexiglasbox- und Holzeimer-basierte Präsentationsausstattung für Nussgeschäfte, Märkte und Feinkostläden: Hygiene, Modularität, Etikettierung und verkaufsförderndes Layout.", hasDetail: false },
      { slug: "parfum-dukkani-dekorasyonu", title: "Parfümerie-Dekoration", date: "22. März 2026", image: "/assets/img/blog/thumb/20260322_183134_379ba035cb095ba1.png", excerpt: "Vitrinen-, Regallayout-, Beleuchtungs- und Testbereich-Tipps. Ein hochwertiger, hygienischer Ladenaufbau mit Plexiglasboxen und -ständern.", hasDetail: false },
      { slug: "sarkuteri-dekorasyonu", title: "Feinkost-Dekoration", date: "22. März 2026", image: "/assets/img/blog/thumb/20260322_180857_113272a9edf6e215.png", excerpt: "Konzept, Abteilungslayout, Beleuchtung und Etikettierungstipps. Hygienische, hochwertige Präsentation mit Plexiglasboxen und Holzeimern.", hasDetail: false },
      { slug: "istocta-teshir-ekipmanlari-kuruyemis-ve-sarkuteri-icin-pleksi-kutu-ve-ahsap-kova-rehberi", title: "Präsentationsausstattung in İstoç: Plexiglasbehälter und Holzfässer für Nüsse & Feinkost", date: "15. Februar 2026", image: "/assets/img/blog/thumb/20260215_230019_2c23c6fb8412aa7f.png", excerpt: "Ein professioneller Ratgeber für alle, die in İstoç ein Nussgeschäft oder einen Feinkostladen eröffnen, mit Fokus auf Plexiglasboxen und Holzeimer.", hasDetail: false },
    ],
  },
  ar: {
    pageTitle: "المدونة",
    breadcrumbHome: "الرئيسية",
    breadcrumbCurrent: "المدونة",
    heroLead: "أدلة عملية حول تصنيع صناديق بليكسي واستخدامها ومعدات العرض.",
    filters: ["جميع المقالات", "أدلة المنتجات", "ديكور المتاجر", "منتجات الحيوانات الأليفة"],
    readMoreLabel: "متابعة القراءة",
    posts: [
      { slug: "ozel-olcu-pleksi-kutu-siparis-rehberi", title: "دليل طلب صندوق بليكسي بمقاس مخصص", date: "10 مايو 2026", image: "/assets/img/blog/thumb/ozel-olcu-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pastane-ve-sekercilerde-pleksi-kutu-kullanimi", title: "استخدام صناديق بليكسي في المخابز والحلويات", date: "9 مايو 2026", image: "/assets/img/blog/thumb/sekerleme-pastane-pleksi-kutu.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-fiyatlarini-etkileyen-7-faktor", title: "7 عوامل تؤثر على أسعار صناديق بليكسي", date: "9 مايو 2026", image: "/assets/img/blog/thumb/pleksi-kutu-price.jpg", excerpt: null, hasDetail: false },
      { slug: "pleksi-kutu-nasil-uretilir", title: "كيف تُصنع صناديق بليكسي؟", date: "9 مايو 2026", image: "/assets/img/blog/thumb/pleksi-kutu-nasil-uretilir.jpeg", excerpt: null, hasDetail: true },
      { slug: "kopek-mama-kabi", title: "وعاء طعام الكلاب", date: "25 أبريل 2026", image: "/assets/img/blog/thumb/pleksi-kopek-mama-kabi.jpeg", excerpt: "عند اختيار وعاء طعام الكلاب: الفروق بين الفولاذ المقاوم للصدأ والسيراميك والبلاستيك؛ تصاميم التغذية البطيئة، القاعدة المانعة للانزلاق، الارتفاع الصحيح ونصائح التنظيف.", hasDetail: false },
      { slug: "kedi-mama-kabi", title: "وعاء طعام القطط", date: "25 أبريل 2026", image: "/assets/img/blog/thumb/pleksi-kedi-mama-kabi_1.jpeg", excerpt: "ما يجب مراعاته عند اختيار وعاء طعام القطط: المادة (فولاذ/سيراميك/بليكسي)، راحة الشوارب، القاعدة المانعة للانزلاق ومعايير التنظيف.", hasDetail: false },
      { slug: "pleksi-boru", title: "أنبوب بليكسي", date: "25 أبريل 2026", image: "/assets/img/blog/thumb/pleksi-boru.jpeg", excerpt: "ما هو أنبوب بليكسي وما فوائده؟ حلول أنبوب وسيلو بليكسي لمحلات المكسرات والأسواق ومحلات الأطعمة الجاهزة.", hasDetail: false },
      { slug: "pleksi-bombe-akvaryum", title: "حوض سمك بليكسي قبة", date: "25 أبريل 2026", image: "/assets/img/blog/thumb/pleksi-akvaryum.jpeg", excerpt: "ما هو حوض السمك البليكسي القبة؟ الشفافية البصرية، تفاصيل التصنيع، حالات الاستخدام في المتاجر، والعناية بسطح البليكسي.", hasDetail: false },
      { slug: "pleksi-bombe", title: "بليكسي بومبيه", date: "25 أبريل 2026", image: "/assets/img/blog/thumb/8dae8629-a47d-403d-b994-c6243f3ce930.png", excerpt: "احصل على عرض متميز ونظافة وترتيب في أقسام المكسرات والأسواق والأطعمة الجاهزة مع حلول بليكسي بومبيه.", hasDetail: false },
      { slug: "kure-kutu", title: "صندوق كروي", date: "25 أبريل 2026", image: "/assets/img/blog/thumb/kure-kutu.jpg", excerpt: "احصل على رؤية 360 درجة وعرض صحي وتأثير فاخر في قسم الحلويات مع الصندوق الكروي.", hasDetail: false },
      { slug: "bombe-kapak", title: "غطاء مقبب", date: "25 أبريل 2026", image: "/assets/img/blog/thumb/bombe-kapak_1.jpg", excerpt: "ما هو الغطاء المقبب؟ الفوائد والمقاسات ونصائح الاستخدام للأغطية المقببة التي ترفع مستوى عرض صناديق البليكسي في محلات المكسرات.", hasDetail: false },
      { slug: "toplu-gida-teshir-ekipmanlari", title: "معدات عرض الأغذية بالجملة", date: "28 مارس 2026", image: "/assets/img/blog/thumb/20260328_165213_c5abce562c34b0c1.png", excerpt: "معدات عرض أغذية بالجملة قائمة على صناديق البليكسي والبراميل الخشبية لمحلات المكسرات والأسواق: النظافة، القابلية للتجميع، وضع الملصقات، وتخطيط يعزز المبيعات.", hasDetail: false },
      { slug: "parfum-dukkani-dekorasyonu", title: "ديكور محل العطور", date: "22 مارس 2026", image: "/assets/img/blog/thumb/20260322_183134_379ba035cb095ba1.png", excerpt: "نصائح الواجهات وتخطيط الرفوف والإضاءة ومنطقة الاختبار. تجهيز متجر فاخر وصحي بصناديق ومنصات بليكسي.", hasDetail: false },
      { slug: "sarkuteri-dekorasyonu", title: "ديكور محل الأطعمة الجاهزة", date: "22 مارس 2026", image: "/assets/img/blog/thumb/20260322_180857_113272a9edf6e215.png", excerpt: "المفهوم وتخطيط الأقسام والإضاءة ونصائح وضع الملصقات. عرض صحي وفاخر بصناديق البليكسي والبراميل الخشبية.", hasDetail: false },
      { slug: "istocta-teshir-ekipmanlari-kuruyemis-ve-sarkuteri-icin-pleksi-kutu-ve-ahsap-kova-rehberi", title: "معدات العرض في إستوچ: صناديق بليكسي وبراميل خشبية للمكسرات والأطعمة الجاهزة", date: "15 فبراير 2026", image: "/assets/img/blog/thumb/20260215_230019_2c23c6fb8412aa7f.png", excerpt: "دليل احترافي لمعدات العرض لمن يفتتحون محل مكسرات أو أطعمة جاهزة في إستوچ، يركز على صناديق البليكسي والبراميل الخشبية.", hasDetail: false },
    ],
  },
};

/** Real full article content for the one real Blog detail page: "Pleksi Kutu Nasıl Üretilir?" */
export const blogArticleContent: Localized<BlogArticleContent> = {
  tr: {
    breadcrumbHome: "Ana Sayfa",
    breadcrumbBlog: "Blog",
    tag: "Ürün Rehberi",
    date: "9 Mayıs 2026",
    title: "Pleksi Kutu Nasıl Üretilir?",
    heroImage: "/assets/img/blog/pleksi-kutu-nasil-uretilir.jpeg",
    lead: "Modern perakende sektörünün vazgeçilmez sergileme çözümü olan pleksi kutular, şeffaflığı, dayanıklılığı ve hijyenik yapısı sayesinde kuruyemiş tezgâhlarından şarküteri vitrinlerine kadar her noktada tercih ediliyor. Peki bu zarif görünümlü kutular hangi aşamalardan geçerek üretiliyor? EveryMaterial olarak yıllardır sürdürdüğümüz üretim deneyimimizden yola çıkarak hazırladığımız bu rehberde, pleksi kutu üretiminin tüm teknik detaylarını sektör profesyonellerinin diliyle anlatıyoruz.",
    blocks: [
      { type: "h2", text: "1. Pleksi Kutu Üretiminde Hammadde Seçimi" },
      { type: "p", text: "Pleksi kutu üretiminin temeli, doğru hammadde seçimine dayanır. Endüstride akrilik ya da pleksiglas olarak da bilinen polimetilmetakrilat (PMMA), termoplastik özelliği sayesinde ısıyla şekillendirilebilen, yüksek şeffaflığa ve darbe dayanımına sahip bir malzemedir. Sektörde iki temel pleksi türü kullanılır: iki cam kalıp arasına dökülerek elde edilen döküm (cast) pleksi ve sürekli ekstrüzyonla üretilen çekme (extruded) pleksi. Büküm gerektiren, yüksek estetikli kuruyemiş ve şarküteri kutuları için döküm pleksi tercih edilir; çünkü ısıl işlemde deformasyona uğramaz ve cam berraklığını korur. Plaka kalınlıkları 1 mm ile 30 mm arasında değişirken standart ebatlar 105x160 cm, 125x200 cm ve 205x305 cm olarak sunulur. Gıda ile temas eden uygulamalarda mutlaka gıdaya uygun sertifikalı pleksi levha kullanılır; bu malzeme camdan yaklaşık 10 kat daha dayanıklı, %50 daha hafif ve %92 ışık geçirgenliğine sahiptir." },
      { type: "h2", text: "2. Tasarım, Ölçülendirme ve CAD Çizimi Aşaması" },
      { type: "p", text: "Hammadde seçiminden sonraki kritik aşama, kutunun teknik tasarımıdır. Müşterinin tezgâh ölçüleri, ürün kapasitesi ve görsel beklentileri değerlendirilerek CAD ortamında 2D ve 3D çizimler hazırlanır. Bu aşamada kutunun taban, yan yüzey ve kapak parçaları ayrı ayrı çizilir; köşelerde yapışacak yüzey paylarının milimetrik hesabı yapılır. Kuruyemiş ve şarküteri sektörü için sıklıkla talep edilen kayar kapaklı kutular, kademeli teşhir kutuları, eğimli ön yüzeyli ürün haznelerinde özellikle açı hesabı, çekme payı ve büküm radius değeri büyük önem taşır. Tasarım aşamasındaki en küçük hata, sonraki kesim ve birleştirme süreçlerinde katlanarak büyüyerek hem zaman kaybına hem de pleksi malzeme firesine yol açar. EveryMaterial mühendislik ekibi, üretime geçmeden önce her tasarımı dijital prototip olarak değerlendirir, kerf payı (lazer kesim hattı kalınlığı) ve minimum duvar kalınlığı standartlarına uygunluğunu kontrol eder. Böylece atölyeye sadece kusursuz şekilde optimize edilmiş tasarımlar ulaşır." },
      { type: "h2", text: "3. Lazer Kesim ve CNC Kesim Süreçleri" },
      { type: "p", text: "Tasarımı tamamlanan parçalar, dijital dosyalar üzerinden CO2 lazer kesim veya CNC router makinelerine aktarılır. Lazer kesim, yüksek yoğunluklu ışık huzmesinin pleksiyi süblimleştirerek kesmesi prensibine dayanır; bu sayede kesim hattında çapak, pürüz veya talaş kalmaz, kenarlar adeta alevle parlatılmışçasına cam berraklığında çıkar. Endüstriyel lazer makineleri 0-50 mm arası kalınlıklarda 205x305 cm ebatına kadar pleksi işleyebilir. CNC kesimde ise 18.000-24.000 RPM devir hızı ve dakikada 2-3 metre ilerleme hızı ideal kabul edilir; tungsten karbür uçlar ve hava üfleme soğutma sistemi pleksinin erimesini engeller." },
      { type: "h3", text: "Hangi Kesim Yöntemi Ne Zaman Kullanılır?" },
      { type: "p", text: "İnce duvarlı, yüksek estetik gerektiren kuruyemiş teşhir kutularında lazer kesim tercih edilirken, kalın cidarlı şarküteri kutularında ve büyük ebatlı market sergileme ünitelerinde CNC kesim öne çıkar. Her iki yöntemde de pleksinin koruyucu kağıdı kesim tamamlanana kadar yüzeyde bırakılır; bu, üretim sırasında oluşabilecek çizilmeleri önler ve son ürünün kristal berraklığını garanti altına alır." },
      { type: "h2", text: "4. Pleksi Büküm ve Termoform İşlemi" },
      { type: "p", text: "Tek parça şeklinde tasarlanmış kuruyemiş hazneleri, eğimli ön yüzlü baharat kutuları ve yuvarlak köşeli teşhir ünitelerinde pleksi büküm aşaması devreye girer. Pleksiglas, polimetilmetakrilat bazlı termoplastik bir malzeme olduğundan belirli bir sıcaklığa (yaklaşık 150-160°C) ulaştığında yumuşar ve kalıba alınarak istenilen forma kavuşur. Profesyonel atölyelerde kullanılan tel rezistanslı büküm makineleri ya da ısı odaları sayesinde 45°, 60°, 90°, 140° ve 160° derecelik açılarda hassas bükümler yapılabilir. Büküm aşamasında malzemenin homojen ısıtılması büyük önem taşır; aşırı ısı malzemenin köpürmesine, yetersiz ısı ise çatlamaya neden olur. Bu nedenle kuruyemiş ve şarküteri sektörünün talep ettiği yüksek estetikli, gergin köşeli pleksi kutularda mutlaka döküm pleksi kullanılmalı ve büküm sonrası kontrollü soğutma uygulanarak iç gerilim minimize edilmelidir. EveryMaterial kutularının dikişsiz görünümünün sırrı tam olarak burada gizlidir." },
      { type: "h2", text: "5. Yapıştırma ve Birleştirme Aşaması" },
      { type: "p", text: "Kesilen ve gerektiğinde bükülen pleksi parçalar, son aşamada birleştirilir. Pleksi kutu üretiminde standart yapıştırıcılar yerine kloroform bazlı çözücü yapıştırıcılar ya da akrilik kaynak yapıştırıcıları kullanılır. Bu özel kimyasallar, pleksi yüzeyini molekül seviyesinde eriterek iki parçayı birbirine kaynatır; sonuç, neredeyse görünmez ve son derece dayanıklı bir bağ olur. Yapıştırma sürecinde parçalar bant ya da fikstür yardımıyla sabitlenir; çünkü kloroform uçucu yapısı nedeniyle 30 saniye içinde tepkimeye girer ve 3 dakika içinde tutunma sağlar. Tam dayanım için yaklaşık 3 saat bekleme süresi gerekir. Kuruyemiş kutuları gibi sıklıkla yıkanan ürünlerde köşelerin sızdırmazlığı kritik öneme sahip olduğundan, EveryMaterial üretim hattında her birleşim noktası ışığa tutularak kılcal çatlak ve hava boşluğu kontrolü yapılır; gıda hijyeni açısından kusursuz, su geçirmez bir bütünlük sağlanır." },
      { type: "h2", text: "6. Yüzey İşleme, Kalite Kontrol ve Son Dokunuşlar" },
      { type: "p", text: "Birleştirme tamamlandıktan sonra pleksi kutunun kenarları alev parlatma ya da kimyasal parlatma tekniğiyle cilalanır. Alev parlatmada kontrollü bir hidrojen alevi kenarlardan geçirilerek kesim sırasında oluşan mat dokunun şeffaflaşması sağlanır; bu işlem ustalık gerektirir, aşırı ısı deformasyona yol açabilir. Sonrasında kutu, kuruyemiş, baharat ya da şarküteri ürünleri için talep edilen marka logosu, ürün etiketi veya bilgilendirici görseller UV baskı veya lazer kazıma ile uygulanır. Son aşamada her ürün, milimetrik hassasiyetle kalite kontrolden geçirilir: ışık altında kılcal çatlak, hava kabarcığı, yüzey çiziği kontrolü yapılır; ölçü tutarlılığı dijital kumpaslarla doğrulanır. EveryMaterial olarak teslim öncesi her kutuya hijyenik temizlik uygulayıp özel poşet ya da koruyucu film ile ambalajlayarak sevkiyata hazırlıyoruz; böylece son kullanıcıya kusursuz, ilk gün etkisi koruyan bir ürün sunmuş oluyoruz." },
    ],
    quoteText: "\"EveryMaterial, kuruyemiş, market ve şarküteri sektörüne özel pleksi kutu ve ahşap kova üretiminde Türkiye'nin önde gelen markalarından biridir. Yıllara dayanan üretim deneyimimiz, gıdaya uygun sertifikalı hammaddelerimiz, hassas lazer kesim altyapımız ve sektörün ihtiyaçlarına özel tasarım ekibimizle işletmenizin teşhir kalitesini bir üst seviyeye taşıyoruz. İster küçük bir butik şarküteri ister zincir market kategorisinde olun, sipariş adetine göre esnek üretim, hızlı teslimat ve uzun ömürlü ürün garantisi sunuyoruz.\"",
    quoteCite: "— everymaterial.com, Neden EveryMaterial?",
    relatedTitle: "İlgili Ürünler",
    related: ["Eğimli Kare Kutu", "Dolaplı Bonbon Kutu Stand", "Radyüs Kapaklı Kutu", "Menteşeli Yuvarlak Kutu", "Yuvarlak Kutu", "Dikdörtgen Eğimli Kutu", "Mystic Kutu", "Mystic Set Kutu"],
    sideRecentTitle: "Son Yazılar",
    sideCtaTitle: "Projeniz için Özel Çözümler",
    sideCtaBody: "Mühendislik ekibimiz tasarım aşamasından üretime kadar yanınızda. Kutunuzun ölçüsünü, adedini ve kullanım amacını bize iletin, size özel teklif hazırlayalım.",
    sideCtaBtn: "Sizi Arayalım",
    sideCatsTitle: "Kategoriler",
  },
  en: {
    breadcrumbHome: "Home",
    breadcrumbBlog: "Blog",
    tag: "Product Guide",
    date: "May 9, 2026",
    title: "How Are Plexiglass Boxes Manufactured?",
    heroImage: "/assets/img/blog/pleksi-kutu-nasil-uretilir.jpeg",
    lead: "Being the go-to display solution of the modern retail sector, plexiglass boxes are preferred everywhere from nut shop counters to delicatessen windows thanks to their transparency, durability and hygienic structure. So what stages do these elegant-looking boxes go through to be manufactured? In this guide, drawn from EveryMaterial's years of manufacturing experience, we walk through every technical detail of plexiglass box production in the language of industry professionals.",
    blocks: [
      { type: "h2", text: "1. Raw Material Selection in Plexiglass Box Manufacturing" },
      { type: "p", text: "The foundation of plexiglass box manufacturing lies in choosing the right raw material. Also known in the industry as acrylic or plexiglas, polymethyl methacrylate (PMMA) is a thermoplastic material that can be shaped with heat, offering high transparency and impact resistance. Two main types of plexiglass are used in the sector: cast plexiglass, produced by pouring between two glass molds, and extruded plexiglass, produced through continuous extrusion. Cast plexiglass is preferred for nut and delicatessen boxes that require bending and a highly aesthetic finish, since it does not deform under heat treatment and retains its glass-like clarity. Sheet thicknesses range from 1 mm to 30 mm, with standard sizes offered at 105x160 cm, 125x200 cm and 205x305 cm. For food-contact applications, food-grade certified plexiglass sheet is always used; this material is roughly 10 times more durable than glass, 50% lighter, and has 92% light transmittance." },
      { type: "h2", text: "2. Design, Sizing and CAD Drawing Stage" },
      { type: "p", text: "The critical stage following raw material selection is the box's technical design. The customer's counter dimensions, product capacity and visual expectations are evaluated to prepare 2D and 3D drawings in a CAD environment. At this stage the box's base, side panels and lid pieces are drawn separately; the millimetric allowance for the bonding surfaces at the corners is calculated. For the sliding-lid boxes, tiered display boxes and angled-front product compartments frequently requested by the nut and delicatessen sector, angle calculation, draw allowance and bend radius value carry particular importance. The smallest error at the design stage compounds through the subsequent cutting and assembly processes, causing both time loss and plexiglass material waste. Before moving to production, EveryMaterial's engineering team evaluates every design as a digital prototype, checking compliance with kerf allowance (laser cutting line thickness) and minimum wall thickness standards. This way, only flawlessly optimized designs reach the workshop." },
      { type: "h2", text: "3. Laser Cutting and CNC Cutting Processes" },
      { type: "p", text: "Once the design is finalized, the pieces are transferred via digital files to CO2 laser cutting or CNC router machines. Laser cutting relies on the principle of a high-intensity light beam sublimating the plexiglass as it cuts; this leaves no burrs, roughness or shavings along the cut line, and the edges come out with glass-like clarity as if flame-polished. Industrial laser machines can process plexiglass up to 205x305 cm in size at thicknesses of 0-50 mm. For CNC cutting, a spindle speed of 18,000-24,000 RPM and a feed rate of 2-3 meters per minute are considered ideal; tungsten carbide bits and an air-cooling system prevent the plexiglass from melting." },
      { type: "h3", text: "Which Cutting Method Is Used When?" },
      { type: "p", text: "Laser cutting is preferred for thin-walled, high-aesthetic nut display boxes, while CNC cutting stands out for thick-walled delicatessen boxes and large-sized market display units. In both methods, the plexiglass's protective paper is left on the surface until cutting is complete; this prevents scratches that could occur during production and guarantees the crystal clarity of the finished product." },
      { type: "h2", text: "4. Plexiglass Bending and Thermoforming Process" },
      { type: "p", text: "The plexiglass bending stage comes into play for single-piece nut compartments, angled-front spice boxes, and rounded-corner display units. Since plexiglas is a thermoplastic material based on polymethyl methacrylate, it softens once it reaches a certain temperature (approximately 150-160°C) and is placed into a mold to take on the desired shape. Precise bends at 45°, 60°, 90°, 140° and 160° angles can be achieved using wire-resistance bending machines or heat chambers used in professional workshops. Homogeneous heating of the material is of great importance during bending; excessive heat causes the material to bubble, while insufficient heat causes cracking. For this reason, cast plexiglass must always be used in the high-aesthetic, tight-cornered plexiglass boxes demanded by the nut and delicatessen sector, and controlled cooling must be applied after bending to minimize internal stress. This is precisely where the secret of EveryMaterial boxes' seamless look lies." },
      { type: "h2", text: "5. Bonding and Assembly Stage" },
      { type: "p", text: "The cut and, where necessary, bent plexiglass pieces are joined together at the final stage. Instead of standard adhesives, chloroform-based solvent adhesives or acrylic weld adhesives are used in plexiglass box manufacturing. These special chemicals melt the plexiglass surface at the molecular level and weld the two pieces together; the result is an almost invisible and extremely durable bond. During bonding, the pieces are held in place with tape or fixtures, since chloroform's volatile nature means it reacts within 30 seconds and achieves adhesion within 3 minutes. Full strength requires a wait of approximately 3 hours. Because corner sealing is critical for frequently washed products such as nut boxes, every joint on the EveryMaterial production line is held up to light to check for hairline cracks and air gaps; a flawless, watertight integrity is ensured in terms of food hygiene." },
      { type: "h2", text: "6. Surface Finishing, Quality Control and Final Touches" },
      { type: "p", text: "Once assembly is complete, the edges of the plexiglass box are polished using flame polishing or chemical polishing techniques. In flame polishing, a controlled hydrogen flame is passed along the edges to clear the matte texture left by cutting; this process requires skill, as excessive heat can cause deformation. Afterward, the brand logo, product label or informational graphics requested for nut, spice or delicatessen products are applied via UV printing or laser engraving. In the final stage, every product undergoes quality control with millimetric precision: hairline cracks, air bubbles and surface scratches are checked under light, and dimensional consistency is verified with digital calipers. At EveryMaterial, we apply hygienic cleaning to every box before delivery and prepare it for shipment by packaging it in a special bag or protective film, so that the end user receives a flawless product that retains its first-day impression." },
    ],
    quoteText: "\"EveryMaterial is one of Turkey's leading brands in plexiglass box and wooden crate manufacturing for the nut, market and delicatessen sectors. With years of manufacturing experience, food-grade certified raw materials, precise laser-cutting infrastructure and a design team dedicated to the sector's needs, we take your display quality to the next level. Whether you're a small boutique delicatessen or in the chain-market category, we offer flexible production according to order volume, fast delivery and a long-lasting product guarantee.\"",
    quoteCite: "— everymaterial.com, Why EveryMaterial?",
    relatedTitle: "Related Products",
    related: ["Angled Square Box", "Cabinet Candy Box Stand", "Radius-Lid Box", "Hinged Round Box", "Round Box", "Angled Rectangular Box", "Mystic Box", "Mystic Set Box"],
    sideRecentTitle: "Recent Posts",
    sideCtaTitle: "Custom Solutions for Your Project",
    sideCtaBody: "Our engineering team is with you from design to production. Tell us your box's dimensions, quantity and intended use, and we'll prepare a tailored quote.",
    sideCtaBtn: "Let Us Call You",
    sideCatsTitle: "Categories",
  },
  de: {
    breadcrumbHome: "Startseite",
    breadcrumbBlog: "Blog",
    tag: "Produktratgeber",
    date: "9. Mai 2026",
    title: "Wie werden Plexiglasboxen hergestellt?",
    heroImage: "/assets/img/blog/pleksi-kutu-nasil-uretilir.jpeg",
    lead: "Als unverzichtbare Präsentationslösung des modernen Einzelhandels werden Plexiglasboxen dank ihrer Transparenz, Widerstandsfähigkeit und hygienischen Struktur überall bevorzugt – von Nusstheken bis zu Feinkostvitrinen. Doch welche Stationen durchlaufen diese elegant wirkenden Boxen bei der Herstellung? In diesem Ratgeber, der auf der langjährigen Fertigungserfahrung von EveryMaterial beruht, erläutern wir alle technischen Details der Plexiglasbox-Fertigung in der Sprache von Branchenprofis.",
    blocks: [
      { type: "h2", text: "1. Rohstoffauswahl bei der Plexiglasbox-Fertigung" },
      { type: "p", text: "Die Grundlage der Plexiglasbox-Fertigung liegt in der richtigen Rohstoffauswahl. Polymethylmethacrylat (PMMA), in der Industrie auch als Acryl oder Plexiglas bekannt, ist ein thermoplastisches Material, das sich durch Wärme formen lässt und eine hohe Transparenz sowie Schlagfestigkeit besitzt. In der Branche werden zwei grundlegende Plexiglasarten verwendet: Gussplexiglas (cast), das zwischen zwei Glasformen gegossen wird, und Strangplexiglas (extruded), das im kontinuierlichen Extrusionsverfahren hergestellt wird. Für biegungsbedürftige, hochästhetische Nuss- und Feinkostboxen wird Gussplexiglas bevorzugt, da es bei Wärmebehandlung nicht verformt und seine Glasklarheit bewahrt. Die Plattenstärken variieren zwischen 1 mm und 30 mm, während die Standardformate 105×160 cm, 125×200 cm und 205×305 cm betragen. Bei Anwendungen mit Lebensmittelkontakt wird stets lebensmittelechtes, zertifiziertes Plexiglas verwendet; dieses Material ist rund 10-mal widerstandsfähiger als Glas, 50 % leichter und weist eine Lichtdurchlässigkeit von 92 % auf." },
      { type: "h2", text: "2. Design-, Bemaßungs- und CAD-Zeichnungsphase" },
      { type: "p", text: "Die entscheidende Phase nach der Rohstoffauswahl ist die technische Gestaltung der Box. Anhand der Thekenmaße, der Produktkapazität und der visuellen Erwartungen des Kunden werden 2D- und 3D-Zeichnungen in der CAD-Umgebung erstellt. In dieser Phase werden Boden-, Seiten- und Deckelteile der Box separat gezeichnet; die millimetergenaue Berechnung der Klebeflächenzugaben an den Ecken erfolgt hier. Bei den in der Nuss- und Feinkostbranche häufig nachgefragten Schiebedeckelboxen, gestuften Präsentationsboxen und geneigten Produktfächern kommt insbesondere der Winkelberechnung, der Ziehzugabe und dem Biegeradius große Bedeutung zu. Der kleinste Fehler in der Designphase vergrößert sich in den nachfolgenden Schneid- und Montageprozessen und führt sowohl zu Zeitverlust als auch zu Plexiglas-Materialverschnitt. Das Konstruktionsteam von EveryMaterial bewertet vor Produktionsbeginn jedes Design als digitalen Prototyp und prüft die Einhaltung der Standards für Schnittfugenzugabe (Dicke der Laserschnittlinie) und Mindestwandstärke. So erreichen die Werkstatt ausschließlich fehlerfrei optimierte Designs." },
      { type: "h2", text: "3. Laserschneid- und CNC-Schneidverfahren" },
      { type: "p", text: "Die fertig gestalteten Teile werden über digitale Dateien an CO2-Laserschneid- oder CNC-Fräsmaschinen übergeben. Das Laserschneiden beruht auf dem Prinzip, dass ein hochintensiver Lichtstrahl das Plexiglas beim Schneiden sublimiert; dadurch bleiben am Schnittrand weder Grat, Rauigkeit noch Späne zurück, und die Kanten wirken wie flammpoliert in Glasklarheit. Industrielle Lasermaschinen können Plexiglas in Stärken von 0–50 mm bis zu einem Format von 205×305 cm bearbeiten. Beim CNC-Schneiden gelten eine Drehzahl von 18.000–24.000 U/min und eine Vorschubgeschwindigkeit von 2–3 Metern pro Minute als ideal; Hartmetallfräser und ein Luftkühlungssystem verhindern ein Schmelzen des Plexiglases." },
      { type: "h3", text: "Wann welches Schneidverfahren verwendet wird" },
      { type: "p", text: "Bei dünnwandigen, hochästhetischen Nuss-Präsentationsboxen wird das Laserschneiden bevorzugt, während sich bei dickwandigen Feinkostboxen und großformatigen Markt-Präsentationseinheiten das CNC-Schneiden durchsetzt. Bei beiden Verfahren bleibt die Schutzfolie des Plexiglases bis zum Abschluss des Schnitts auf der Oberfläche; dies verhindert mögliche Kratzer während der Fertigung und garantiert die kristallklare Beschaffenheit des Endprodukts." },
      { type: "h2", text: "4. Plexiglas-Biege- und Thermoformverfahren" },
      { type: "p", text: "Bei einteilig gestalteten Nussfächern, geneigten Gewürzboxen und abgerundeten Präsentationseinheiten kommt die Plexiglas-Biegephase zum Einsatz. Da Plexiglas ein thermoplastisches Material auf Basis von Polymethylmethacrylat ist, erweicht es bei einer bestimmten Temperatur (etwa 150–160 °C) und wird in eine Form gebracht, um die gewünschte Gestalt anzunehmen. Dank drahtwiderstandsbeheizter Biegemaschinen oder Wärmekammern, die in professionellen Werkstätten eingesetzt werden, lassen sich präzise Biegungen in Winkeln von 45°, 60°, 90°, 140° und 160° ausführen. Bei der Biegung ist die gleichmäßige Erwärmung des Materials von großer Bedeutung; übermäßige Hitze führt zum Aufschäumen des Materials, unzureichende Hitze zu Rissbildung. Aus diesem Grund muss bei den von der Nuss- und Feinkostbranche geforderten hochästhetischen, spannungsfrei-eckigen Plexiglasboxen stets Gussplexiglas verwendet und nach der Biegung eine kontrollierte Abkühlung angewendet werden, um innere Spannungen zu minimieren. Genau darin liegt das Geheimnis des nahtlosen Erscheinungsbilds der EveryMaterial-Boxen." },
      { type: "h2", text: "5. Verklebungs- und Montagephase" },
      { type: "p", text: "Die geschnittenen und, sofern erforderlich, gebogenen Plexiglasteile werden in der letzten Phase zusammengefügt. Anstelle von Standardklebstoffen werden bei der Plexiglasbox-Fertigung chloroformbasierte Lösungsmittelkleber oder Acryl-Schweißklebstoffe eingesetzt. Diese speziellen Chemikalien schmelzen die Plexiglasoberfläche auf molekularer Ebene und verschweißen die beiden Teile miteinander; das Ergebnis ist eine nahezu unsichtbare und äußerst widerstandsfähige Verbindung. Während des Klebevorgangs werden die Teile mit Klebeband oder Vorrichtungen fixiert, da Chloroform aufgrund seiner Flüchtigkeit innerhalb von 30 Sekunden reagiert und innerhalb von 3 Minuten Haftung erzielt. Für die volle Festigkeit ist eine Wartezeit von etwa 3 Stunden erforderlich. Da bei häufig gewaschenen Produkten wie Nussboxen die Dichtheit der Ecken von entscheidender Bedeutung ist, wird bei EveryMaterial jede Verbindungsstelle in der Produktionslinie gegen das Licht gehalten und auf Haarrisse und Lufteinschlüsse geprüft; so wird eine hinsichtlich Lebensmittelhygiene einwandfreie, wasserdichte Einheit gewährleistet." },
      { type: "h2", text: "6. Oberflächenbehandlung, Qualitätskontrolle und letzte Handgriffe" },
      { type: "p", text: "Nach Abschluss der Montage werden die Kanten der Plexiglasbox durch Flammpolitur oder chemische Politur veredelt. Bei der Flammpolitur wird eine kontrollierte Wasserstoffflamme über die Kanten geführt, um die beim Schneiden entstandene matte Struktur zu klären; dieser Vorgang erfordert Geschick, da übermäßige Hitze zu Verformungen führen kann. Anschließend werden das für Nuss-, Gewürz- oder Feinkostprodukte gewünschte Markenlogo, Produktetikett oder informative Grafiken per UV-Druck oder Lasergravur aufgebracht. In der letzten Phase durchläuft jedes Produkt eine millimetergenaue Qualitätskontrolle: Unter Licht werden Haarrisse, Lufteinschlüsse und Oberflächenkratzer geprüft; die Maßhaltigkeit wird mit digitalen Messschiebern verifiziert. Bei EveryMaterial reinigen wir jede Box vor der Lieferung hygienisch und verpacken sie für den Versand in einem speziellen Beutel oder einer Schutzfolie – so übergeben wir dem Endkunden ein einwandfreies Produkt, das den Eindruck des ersten Tages bewahrt." },
    ],
    quoteText: "„EveryMaterial ist eine der führenden Marken der Türkei in der Fertigung von Plexiglasboxen und Holzkisten für die Nuss-, Markt- und Feinkostbranche. Mit langjähriger Fertigungserfahrung, lebensmittelechten zertifizierten Rohstoffen, präziser Laserschneid-Infrastruktur und einem auf die Bedürfnisse der Branche spezialisierten Designteam heben wir die Präsentationsqualität Ihres Unternehmens auf die nächste Stufe. Ob kleine Boutique-Feinkosterei oder Handelskette – wir bieten flexible Fertigung nach Bestellmenge, schnelle Lieferung und eine langlebige Produktgarantie.\"",
    quoteCite: "— everymaterial.com, Warum EveryMaterial?",
    relatedTitle: "Ähnliche Produkte",
    related: ["Geneigte quadratische Box", "Bonbonbox-Ständer mit Schrank", "Box mit Radiusdeckel", "Runde Box mit Scharnier", "Runde Box", "Geneigte Rechteckbox", "Mystic-Box", "Mystic-Set-Box"],
    sideRecentTitle: "Neueste Beiträge",
    sideCtaTitle: "Individuelle Lösungen für Ihr Projekt",
    sideCtaBody: "Unser Konstruktionsteam begleitet Sie vom Design bis zur Fertigung. Teilen Sie uns Maße, Stückzahl und Verwendungszweck Ihrer Box mit – wir erstellen Ihnen ein individuelles Angebot.",
    sideCtaBtn: "Rückruf anfordern",
    sideCatsTitle: "Kategorien",
  },
  ar: {
    breadcrumbHome: "الرئيسية",
    breadcrumbBlog: "المدونة",
    tag: "دليل المنتج",
    date: "9 مايو 2026",
    title: "كيف تُصنع صناديق بليكسي؟",
    heroImage: "/assets/img/blog/pleksi-kutu-nasil-uretilir.jpeg",
    lead: "بفضل شفافيتها ومتانتها وبنيتها الصحية، تُعد صناديق بليكسي حل العرض الذي لا غنى عنه في قطاع التجزئة الحديث، إذ يُفضَّل استخدامها في كل مكان بدءًا من أرفف محلات المكسرات وصولًا إلى واجهات محلات المأكولات الجاهزة. فما هي المراحل التي تمر بها هذه الصناديق الأنيقة المظهر حتى تصل إلى شكلها النهائي؟ في هذا الدليل، المستمد من سنوات خبرة EveryMaterial في التصنيع، نشرح جميع التفاصيل الفنية لتصنيع صناديق بليكسي بلغة محترفي القطاع.",
    blocks: [
      { type: "h2", text: "1. اختيار المواد الخام في تصنيع صناديق بليكسي" },
      { type: "p", text: "يعتمد أساس تصنيع صناديق بليكسي على الاختيار الصحيح للمادة الخام. يُعرف البولي ميثيل ميثاكريلات (PMMA) في الصناعة أيضًا باسم الأكريليك أو البليكسيغلاس، وهو مادة حرارية يمكن تشكيلها بالحرارة، وتتميز بشفافية عالية ومقاومة للصدمات. يُستخدم في القطاع نوعان أساسيان من البليكسي: البليكسي المصبوب (cast)، الذي يُنتَج بالصب بين قالبين زجاجيين، والبليكسي المسحوب (extruded)، الذي يُنتَج عبر البثق المستمر. يُفضَّل البليكسي المصبوب لصناديق المكسرات والمأكولات الجاهزة عالية الجمالية التي تتطلب انحناءً، لأنه لا يتشوه عند المعالجة الحرارية ويحافظ على صفاء يشبه الزجاج. تتراوح سماكات الألواح بين 1 مم و30 مم، بينما تُقدَّم المقاسات القياسية بأبعاد 105×160 سم و125×200 سم و205×305 سم. في التطبيقات التي تتلامس مع الأغذية، يُستخدم دائمًا لوح بليكسي معتمد وآمن غذائيًا؛ وهذه المادة أكثر متانة من الزجاج بنحو 10 مرات، وأخف وزنًا بنسبة 50%، وتتمتع بنفاذية ضوئية تبلغ 92%." },
      { type: "h2", text: "2. مرحلة التصميم والقياس ورسم CAD" },
      { type: "p", text: "المرحلة الحاسمة التالية بعد اختيار المادة الخام هي التصميم الفني للصندوق. يتم تقييم أبعاد طاولة العرض لدى العميل وسعة المنتج والتوقعات البصرية لإعداد رسومات ثنائية وثلاثية الأبعاد في بيئة CAD. في هذه المرحلة تُرسَم قاعدة الصندوق والأسطح الجانبية وأجزاء الغطاء كل على حدة؛ ويُحسَب بدقة الملليمتر هامش أسطح اللصق عند الزوايا. في الصناديق ذات الغطاء المنزلق، وصناديق العرض المتدرجة، وحجيرات المنتجات ذات الواجهة المائلة التي كثيرًا ما يطلبها قطاع المكسرات والمأكولات الجاهزة، يكتسب حساب الزاوية وهامش السحب وقيمة نصف قطر الانحناء أهمية خاصة. يتضاعف أصغر خطأ في مرحلة التصميم عبر عمليات القطع والتجميع اللاحقة، مما يؤدي إلى إهدار الوقت وهدر مادة البليكسي. يقوم فريق الهندسة في EveryMaterial بتقييم كل تصميم كنموذج أولي رقمي قبل الانتقال إلى الإنتاج، ويتحقق من التوافق مع معايير هامش شق القطع (سماكة خط القطع بالليزر) والحد الأدنى لسماكة الجدار. وهكذا لا تصل إلى الورشة سوى تصاميم مُحسَّنة بشكل مثالي." },
      { type: "h2", text: "3. عمليات القطع بالليزر وبالـ CNC" },
      { type: "p", text: "تُنقَل الأجزاء المكتملة التصميم عبر ملفات رقمية إلى أجهزة القطع بالليزر CO2 أو أجهزة الروتر CNC. يعتمد القطع بالليزر على مبدأ تسامي البليكسي بواسطة حزمة ضوء عالية الكثافة أثناء القطع؛ وبذلك لا يتبقى أي نتوءات أو خشونة أو نشارة على خط القطع، وتخرج الحواف بصفاء زجاجي وكأنها لُمِّعت باللهب. يمكن لأجهزة الليزر الصناعية معالجة البليكسي بسماكات تتراوح بين 0 و50 مم وحتى مقاس 205×305 سم. أما في القطع بالـ CNC، فتُعتبر سرعة دوران تتراوح بين 18,000 و24,000 دورة في الدقيقة وسرعة تقدم من 2 إلى 3 أمتار في الدقيقة مثالية؛ وتمنع رؤوس كربيد التنغستن ونظام التبريد الهوائي ذوبان البليكسي." },
      { type: "h3", text: "متى تُستخدم كل طريقة قطع؟" },
      { type: "p", text: "يُفضَّل القطع بالليزر في صناديق عرض المكسرات رقيقة الجدران وعالية الجمالية، بينما يبرز القطع بالـ CNC في صناديق المأكولات الجاهزة سميكة الجدران ووحدات عرض الأسواق كبيرة الحجم. في كلتا الطريقتين، تُترَك الورقة الواقية للبليكسي على السطح حتى اكتمال القطع؛ مما يمنع أي خدوش قد تحدث أثناء التصنيع ويضمن الصفاء البلوري للمنتج النهائي." },
      { type: "h2", text: "4. عملية ثني وتشكيل البليكسي بالحرارة" },
      { type: "p", text: "تدخل مرحلة ثني البليكسي في حجيرات المكسرات المصممة كقطعة واحدة، وصناديق التوابل ذات الواجهة المائلة، ووحدات العرض ذات الزوايا الدائرية. وبما أن البليكسيغلاس مادة حرارية قائمة على البولي ميثيل ميثاكريلات، فإنه يلين عند بلوغ درجة حرارة معينة (نحو 150-160 درجة مئوية) ويُوضَع في قالب ليأخذ الشكل المطلوب. وبفضل ماكينات الثني بالمقاومة السلكية أو غرف التسخين المستخدمة في الورش المتخصصة، يمكن تنفيذ عمليات ثني دقيقة بزوايا 45 و60 و90 و140 و160 درجة. يكتسب التسخين المتجانس للمادة أهمية كبيرة أثناء الثني؛ فالحرارة الزائدة تؤدي إلى انتفاخ المادة، بينما تؤدي الحرارة غير الكافية إلى التشقق. لهذا السبب، يجب دائمًا استخدام البليكسي المصبوب في صناديق البليكسي عالية الجمالية ذات الزوايا الحادة التي يطلبها قطاع المكسرات والمأكولات الجاهزة، وتطبيق تبريد مُتحكَّم به بعد الثني لتقليل الإجهاد الداخلي إلى الحد الأدنى. وهنا بالتحديد يكمن سر المظهر السلس لصناديق EveryMaterial." },
      { type: "h2", text: "5. مرحلة اللصق والتجميع" },
      { type: "p", text: "تُجمَّع أجزاء البليكسي المقطوعة، والمثنية عند الحاجة، في المرحلة الأخيرة. بدلًا من الغراء القياسي، تُستخدم في تصنيع صناديق بليكسي مواد لاصقة مذيبة قائمة على الكلوروفورم أو مواد لحام أكريليكية. تُذيب هذه المواد الكيميائية الخاصة سطح البليكسي على المستوى الجزيئي وتلحم القطعتين معًا؛ والنتيجة رابطة شبه غير مرئية وشديدة المتانة. أثناء عملية اللصق، تُثبَّت القطع بواسطة شريط لاصق أو تجهيزات تثبيت، لأن الكلوروفورم متطاير ويتفاعل خلال 30 ثانية ويحقق التماسك خلال 3 دقائق. تتطلب المتانة الكاملة انتظار نحو 3 ساعات. وبما أن إحكام إغلاق الزوايا أمر بالغ الأهمية في المنتجات التي تُغسَل بشكل متكرر مثل صناديق المكسرات، يُفحَص كل موضع لحام في خط إنتاج EveryMaterial تحت الضوء للتحقق من عدم وجود تشققات شعرية أو فراغات هوائية؛ مما يضمن تكاملًا مثاليًا ومقاومًا للماء من الناحية الصحية الغذائية." },
      { type: "h2", text: "6. المعالجة السطحية ومراقبة الجودة واللمسات الأخيرة" },
      { type: "p", text: "بعد اكتمال التجميع، تُصقَل حواف صندوق البليكسي بتقنية التلميع باللهب أو التلميع الكيميائي. في التلميع باللهب، يُمرَّر لهب هيدروجيني مُتحكَّم به على طول الحواف لإزالة الملمس غير اللامع الناتج عن القطع؛ وتتطلب هذه العملية مهارة، إذ يمكن أن تؤدي الحرارة الزائدة إلى التشوه. بعد ذلك، تُطبَّق شعارات العلامة التجارية أو ملصقات المنتج أو الرسومات التعريفية المطلوبة للمكسرات أو التوابل أو منتجات المأكولات الجاهزة عبر الطباعة بالأشعة فوق البنفسجية أو الحفر بالليزر. في المرحلة الأخيرة، يخضع كل منتج لمراقبة جودة بدقة الملليمتر: يُفحص وجود تشققات شعرية أو فقاعات هوائية أو خدوش سطحية تحت الضوء، ويُتحقَّق من اتساق القياسات باستخدام أدوات قياس رقمية. في EveryMaterial، نُطبِّق تنظيفًا صحيًا على كل صندوق قبل التسليم، ونُعِدُّه للشحن بتغليفه في كيس خاص أو غشاء واقٍ؛ وهكذا نقدّم للمستخدم النهائي منتجًا خاليًا من العيوب يحافظ على أثر اليوم الأول." },
    ],
    quoteText: "\"تُعد EveryMaterial واحدة من العلامات التجارية الرائدة في تركيا في تصنيع صناديق بليكسي وصناديق الخشب المخصصة لقطاع المكسرات والأسواق والمأكولات الجاهزة. بفضل سنوات خبرتنا في التصنيع، وموادنا الخام المعتمدة الآمنة غذائيًا، وبنيتنا التحتية الدقيقة للقطع بالليزر، وفريق التصميم المتخصص باحتياجات القطاع، نرتقي بجودة العرض في منشأتكم إلى مستوى أعلى. سواء كنتم محل مأكولات جاهزة بوتيك صغيرًا أو ضمن فئة الأسواق المتسلسلة، فإننا نقدم إنتاجًا مرنًا حسب كمية الطلب، وتسليمًا سريعًا، وضمان منتج طويل الأمد.\"",
    quoteCite: "— everymaterial.com، لماذا EveryMaterial؟",
    relatedTitle: "منتجات ذات صلة",
    related: ["صندوق مربع مائل", "حامل صندوق حلوى بخزانة", "صندوق بغطاء نصف قطري", "صندوق دائري بمفصلة", "صندوق دائري", "صندوق مستطيل مائل", "صندوق ميستيك", "طقم صندوق ميستيك"],
    sideRecentTitle: "أحدث المقالات",
    sideCtaTitle: "حلول مخصصة لمشروعك",
    sideCtaBody: "فريق الهندسة لدينا معكم من مرحلة التصميم وحتى الإنتاج. أخبرونا بمقاس الصندوق والكمية والغرض من الاستخدام، ونُعِدُّ لكم عرض سعر مخصصًا.",
    sideCtaBtn: "اطلب اتصالاً",
    sideCatsTitle: "الفئات",
  },
};
