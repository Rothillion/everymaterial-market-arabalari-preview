import { describe, it, expect } from "vitest";
import { teamContent } from "./team";
import { LANGS } from "./types";

describe("teamContent", () => {
  it("every language has all 5 real team members with contact info", () => {
    for (const lang of LANGS) {
      const c = teamContent[lang];
      expect(c.members).toHaveLength(5);
      for (const m of c.members) {
        expect(m.phone.length).toBeGreaterThan(0);
        expect(m.email).toContain("@everymaterial.com");
        expect(m.langs.length).toBeGreaterThan(0);
      }
    }
  });

  it("includes the real 5th member (Bedirhan Kavraş) not shown on the homepage teaser", () => {
    expect(teamContent.tr.members.some((m) => m.initials === "BK")).toBe(true);
    expect(teamContent.en.members.find((m) => m.initials === "BK")?.name).toBe("Bedirhan Kavras");
  });

  it("has real, distinct translations per language (not fallback Turkish)", () => {
    expect(teamContent.tr.pageTitle).toBe("Ekibimiz");
    expect(teamContent.en.pageTitle).toBe("Our Team");
    expect(teamContent.de.pageTitle).toBe("Unser Team");
    expect(teamContent.ar.pageTitle).toBe("فريقنا");
  });
});
