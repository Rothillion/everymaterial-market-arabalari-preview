import { describe, it, expect } from "vitest";
import { siteContent } from "./site";

const LANGS = ["tr", "en", "de", "ar"] as const;

describe("siteContent", () => {
  it("has all four languages with non-empty nav and footer strings", () => {
    for (const lang of LANGS) {
      const c = siteContent[lang];
      expect(c).toBeDefined();
      expect(c.nav.categories.length).toBe(9);
      expect(c.contact.phone).toBe("+90 545 911 10 02");
      expect(c.footer.address).toContain("Bağcılar");
    }
  });

  it("marks Arabic as RTL and the others as LTR", () => {
    expect(siteContent.ar.meta.dir).toBe("rtl");
    expect(siteContent.tr.meta.dir).toBe("ltr");
    expect(siteContent.en.meta.dir).toBe("ltr");
    expect(siteContent.de.meta.dir).toBe("ltr");
  });
});
