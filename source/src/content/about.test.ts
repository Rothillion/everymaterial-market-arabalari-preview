import { describe, it, expect } from "vitest";
import { aboutContent } from "./about";
import { LANGS } from "./types";

describe("aboutContent", () => {
  it("every language has 3 real, non-empty paragraphs and required fields", () => {
    for (const lang of LANGS) {
      const c = aboutContent[lang];
      expect(c.paragraphs).toHaveLength(3);
      for (const p of c.paragraphs) {
        expect(p.length).toBeGreaterThan(20);
      }
      expect(c.pageTitle.length).toBeGreaterThan(0);
      expect(c.bodyHeading.length).toBeGreaterThan(0);
      expect(c.ctaTitle.length).toBeGreaterThan(0);
      expect(c.ctaButton.length).toBeGreaterThan(0);
    }
  });

  it("has real, distinct translations per language (not fallback Turkish)", () => {
    expect(aboutContent.tr.pageTitle).toBe("Hakkımızda");
    expect(aboutContent.en.pageTitle).toBe("About Us");
    expect(aboutContent.de.pageTitle).toBe("Über uns");
    expect(aboutContent.ar.pageTitle).toBe("من نحن");
  });

  it("hero and CTA images are real shared assets across languages", () => {
    for (const lang of LANGS) {
      expect(aboutContent[lang].heroImage).toBe("/assets/img/sayfa/iStock-828124804.jpg");
      expect(aboutContent[lang].ctaImage).toBe("/assets/images/every-material-slogan.jpeg");
    }
  });
});
