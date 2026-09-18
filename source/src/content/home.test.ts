import { describe, it, expect } from "vitest";
import { homeContent, sectionChrome } from "./home";
import { LANGS } from "./types";

const expectedFeaturedProductImages = [
  "/assets/img/home/featured-products/mystic-box-portrait.png",
  "/assets/img/home/featured-products/mystic-set-box-portrait.png",
  "/assets/img/home/featured-products/extreme-box-portrait.png",
  "/assets/img/home/featured-products/extreme-set-box-portrait.png",
  "/assets/img/home/featured-products/cylindrical-silo-portrait.png",
  "/assets/img/home/featured-products/rectangular-silo-portrait.png",
  "/assets/img/home/featured-products/bonbon-box-portrait.png",
  "/assets/img/home/featured-products/bonbon-set-box-portrait.png",
];

const featuredProjectImageAllowlist = new Map<string, string[]>([
  ["Ahşap Standlar", ["/assets/img/proje/4e64fdac-1438-4f2d-8f5e-255dde274dbd.jpeg"]],
  ["Wooden Stands", ["/assets/img/proje/4e64fdac-1438-4f2d-8f5e-255dde274dbd.jpeg"]],
  ["Holzständer", ["/assets/img/proje/4e64fdac-1438-4f2d-8f5e-255dde274dbd.jpeg"]],
  ["أرفف خشبية", ["/assets/img/proje/4e64fdac-1438-4f2d-8f5e-255dde274dbd.jpeg"]],
  ["Silolar", ["/assets/img/proje/thumb/silolar.jpg"]],
  ["Silos", ["/assets/img/proje/thumb/silolar.jpg"]],
  ["صوامع", ["/assets/img/proje/thumb/silolar.jpg"]],
]);

describe("homeContent.tr", () => {
  const c = homeContent.tr;

  it("has 8 real hero slides", () => {
    expect(c.heroSlides).toHaveLength(8);
    expect(c.heroSlides[0].src).toBe("/assets/img/slider/Bener1.jpg");
  });

  it("has 9 real categories matching the site nav", () => {
    expect(c.categories).toHaveLength(9);
    expect(c.categories[0].name).toBe("Pleksi Teşhir Ekipmanları");
  });

  it("has 8 real featured products", () => {
    expect(c.featuredProducts).toHaveLength(8);
    expect(c.featuredProducts[0].name).toBe("Mystic Kutu");
  });

  it("has 4 real team members on the homepage teaser", () => {
    expect(c.team).toHaveLength(4);
    expect(c.team[0].name).toBe("Muhammet Bilal Kavras");
  });

  it("has 9 real project teasers", () => {
    expect(c.projects).toHaveLength(9);
  });

  it("has 9 real blog posts with the asymmetric size pattern", () => {
    expect(c.blogPosts).toHaveLength(9);
    expect(c.blogPosts[0].size).toBe("lg");
    expect(c.blogPosts[1].size).toBe("md");
    expect(c.blogPosts[2].size).toBe("sm");
  });
});

describe("homeContent — Faz 2 multilingual coverage", () => {
  it("every language has the same array lengths as tr (index-aligned)", () => {
    for (const lang of LANGS) {
      const c = homeContent[lang];
      expect(c.heroSlides).toHaveLength(8);
      expect(c.categories).toHaveLength(9);
      expect(c.featuredProducts).toHaveLength(8);
      expect(c.team).toHaveLength(4);
      expect(c.projects).toHaveLength(9);
      expect(c.blogPosts).toHaveLength(9);
    }
  });

  it("has real, non-Turkish translated content for en/de/ar", () => {
    expect(homeContent.en.categories[0].name).toBe("Plexiglass Display Equipment");
    expect(homeContent.de.categories[0].name).toBe("Plexiglas-Präsentationsgeräte");
    expect(homeContent.ar.categories[0].name).toBe("معدات عرض بليكسي");
  });

  it("maps each locale's featured products to the accepted distinct portrait scenes", () => {
    for (const lang of LANGS) {
      const products = homeContent[lang].featuredProducts;
      const images = products.map((product) => product.image);

      expect(images).toEqual(expectedFeaturedProductImages);
      expect(new Set(images).size).toBe(products.length);
      expect(products).toEqual(expect.arrayContaining([expect.objectContaining({ imageFit: "cover" })]));
      expect(products.every((product) => product.imageFit === "cover")).toBe(true);
    }
  });

  it("maps the localized wooden-stand and silo titles to authentic project photos", () => {
    for (const lang of LANGS) {
      for (const project of homeContent[lang].projects.slice(0, 2)) {
        const allowedImages = featuredProjectImageAllowlist.get(project.name);

        expect(allowedImages).toBeDefined();
        expect(allowedImages).toContain(project.image);
      }
    }
  });

  it("uses a distinct authentic installation for the final generic project teaser", () => {
    for (const lang of LANGS) {
      expect(homeContent[lang].projects.at(-1)?.image).toBe(
        "/assets/img/proje/generated/project-2-confectionery-installation.png",
      );
      expect(homeContent[lang].projects.at(-1)?.imageFit).toBe("cover");
    }
  });
});

describe("sectionChrome — Faz 2 section titles/CTA/eyebrow", () => {
  it("every language has real, non-empty section chrome", () => {
    for (const lang of LANGS) {
      const chrome = sectionChrome[lang];
      for (const value of Object.values(chrome)) {
        expect(typeof value).toBe("string");
        expect((value as string).length).toBeGreaterThan(0);
      }
    }
  });

  it("en/de/ar section titles are real translations, not Turkish", () => {
    expect(sectionChrome.en.categoriesTitle).toBe("Categories");
    expect(sectionChrome.de.categoriesTitle).toBe("Kategorien");
    expect(sectionChrome.ar.categoriesTitle).toBe("الفئات");
  });
});
