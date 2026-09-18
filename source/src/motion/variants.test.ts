import { describe, it, expect } from "vitest";
import { fadeUp, staggerChildren, heroReveal } from "./variants";

describe("motion variants", () => {
  it("fadeUp defines hidden and visible states", () => {
    expect(fadeUp.hidden).toMatchObject({ opacity: 0 });
    expect(fadeUp.visible).toMatchObject({ opacity: 1 });
  });

  it("staggerChildren orchestrates children on visible", () => {
    const visible = staggerChildren.visible as { transition?: { staggerChildren?: number } };
    expect(visible.transition?.staggerChildren).toBeGreaterThan(0);
  });

  it("heroReveal defines hidden and visible states", () => {
    expect(heroReveal.hidden).toMatchObject({ opacity: 0 });
    expect(heroReveal.visible).toMatchObject({ opacity: 1 });
  });
});
