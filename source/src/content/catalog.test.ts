import { describe, it, expect } from "vitest";
import { catalogContent } from "./catalog";
import { LANGS } from "./types";

describe("catalogContent", () => {
  it("every language has 5 real families totaling 62 real products", () => {
    for (const lang of LANGS) {
      const c = catalogContent[lang];
      expect(c.families).toHaveLength(5);
      const total = c.families.reduce((sum, f) => sum + f.products.length, 0);
      expect(total).toBe(62);
      expect(c.certificates.length).toBeGreaterThan(0);
    }
  });

  it("has the real 'market arabaları' families with correct real product counts", () => {
    const tr = catalogContent.tr;
    const shopping = tr.families.find((f) => f.slug === "alisveris-arabalari");
    const metal = tr.families.find((f) => f.slug === "metal-yuk-tasima");
    expect(shopping?.products).toHaveLength(9);
    expect(metal?.products).toHaveLength(15);
  });

  it("has real, verified spec data for the first real product across languages", () => {
    const trProduct = catalogContent.tr.families[0].products[0];
    expect(trProduct.name).toBe("25 Lt Bayraklı Çocuk Alışveriş Arabası");
    expect(trProduct.widthCm).toBe(41);
    expect(trProduct.lengthCm).toBe(72);
    expect(trProduct.heightCm).toBe(61);
    expect(trProduct.material).toBe("P.P.");

    const enProduct = catalogContent.en.families[0].products[0];
    expect(enProduct.widthCm).toBe(41);
    expect(enProduct.material).toBe("PP");
  });

  it("has real CE/ISO certificate numbers, not fabricated ones", () => {
    const cert = catalogContent.tr.certificates.find((c) => c.title === "ISO 45001:2018");
    expect(cert?.certNo).toBe("A1536760");
  });
});
