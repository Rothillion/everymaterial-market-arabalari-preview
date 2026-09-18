import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { productCatalogContent } from "./productCatalog";
import manifest from "./productVisualAudit.json";

type VisualRole = "hero" | "dimensions" | "detail" | "usage" | "project";
type VisualDecision =
  | "keep"
  | "presentation-fix"
  | "regenerate"
  | "replace-existing"
  | "remove"
  | "manual-review";
type VisualQa = "pending" | "audited" | "accepted" | "blocked";

type VisualAuditMedia = {
  src: string;
  role: VisualRole;
  decision: VisualDecision;
  reason: string;
  replacement: string | null;
  qa: VisualQa;
};

type VisualAuditItem = {
  visualKey: string;
  familySlug: string;
  slug: string;
  media: VisualAuditMedia[];
};

type VisualAuditManifest = {
  version: number;
  items: VisualAuditItem[];
};

const audit = manifest as VisualAuditManifest;
const pkg = JSON.parse(readFileSync("package.json", "utf8")) as {
  scripts: Record<string, string>;
};
const roles = new Set<VisualRole>(["hero", "dimensions", "detail", "usage", "project"]);
const decisions = new Set<VisualDecision>([
  "keep",
  "presentation-fix",
  "regenerate",
  "replace-existing",
  "remove",
  "manual-review",
]);
const qaStates = new Set<VisualQa>(["pending", "audited", "accepted", "blocked"]);
const approvedRegenerationPaths = new Set([
  "/assets/img/urunler/hazir/stainless-inner-lid-4-kullanim.png",
  "/assets/img/urunler/hazir/natural-striped-pattern-wood-bucket-1-hero.png",
  "/assets/img/urunler/hazir/natural-striped-pattern-wood-bucket-2-olcu.png",
  "/assets/img/urunler/hazir/natural-striped-pattern-wood-bucket-3-detay.png",
  "/assets/img/urunler/hazir/natural-striped-pattern-wood-bucket-4-kullanim.png",
  "/assets/img/urunler/hazir/natural-wood-mid-bowl-1-hero.png",
  "/assets/img/urunler/hazir/natural-wood-mid-bowl-2-olcu.png",
  "/assets/img/urunler/hazir/natural-wood-mid-bowl-3-detay.png",
  "/assets/img/urunler/hazir/natural-wood-mid-bowl-4-kullanim.png",
  "/assets/img/urunler/hazir/25-l-metal-children-s-shopping-cart-2-olcu.png",
  "/assets/img/urunler/hazir/75-l-metal-shopping-cart-2-olcu.png",
  "/assets/img/urunler/hazir/180-l-metal-shopping-cart-2-olcu.png",
  "/assets/img/urunler/hazir/210-l-metal-shopping-cart-a-2-olcu.png",
  "/assets/img/urunler/hazir/210-l-metal-shopping-cart-b-2-olcu.png",
  "/assets/img/urunler/hazir/double-metal-basket-stand-with-wheels-1-hero.png",
  "/assets/img/urunler/hazir/double-metal-basket-stand-with-wheels-2-olcu.png",
  "/assets/img/urunler/hazir/double-metal-basket-stand-with-wheels-4-kullanim.png",
  "/assets/img/urunler/hazir/plastic-demountable-plastic-with-grid-bottom-150-l-shopping-cart-2-olcu.png",
  "/assets/img/urunler/hazir/plastic-shopping-basket-with-wheels-a-2-olcu.png",
  "/assets/img/urunler/hazir/48-l-plastic-shopping-basket-with-wheels-2-olcu.png",
  "/assets/img/urunler/hazir/shopping-cart-with-locking-system-1-hero.png",
  "/assets/img/urunler/hazir/cart-with-basket-and-wheels-1-hero.png",
  "/assets/img/urunler/hazir/label-holder-09-3-detay.png",
  "/assets/img/urunler/hazir/label-holder-14-3-detay.png",
  "/assets/img/urunler/hazir/label-holder-16-3-detay.png",
]);

const suffixes = new Map<string, number>();
const catalogAuditTargets = productCatalogContent.tr.flatMap((family) =>
  family.products.map((product) => {
    const identity = `${family.slug}:${product.slug}`;
    const suffix = (suffixes.get(identity) ?? 0) + 1;
    suffixes.set(identity, suffix);
    return {
      visualKey: `${identity}:${String(suffix).padStart(2, "0")}`,
      familySlug: family.slug,
      slug: product.slug,
      media: [product.heroImage, ...product.galleryImages],
    };
  }),
);

function hasCoherentRegenerateState(media: Pick<VisualAuditMedia, "qa" | "replacement">) {
  return (
    (media.qa === "pending" && media.replacement === null) ||
    (media.qa === "accepted" && typeof media.replacement === "string" && media.replacement.startsWith("/assets/"))
  );
}

describe("product visual audit manifest", () => {
  it("exposes the production visual validation script", () => {
    expect(pkg.scripts["validate:visuals"]).toBe("node scripts/validate-visual-assets.mjs");
  });

  it("matches the complete Turkish catalog in order and preserves every current media path", () => {
    expect(audit.version).toBe(1);
    expect(catalogAuditTargets).toHaveLength(175);
    expect(audit.items).toHaveLength(175);
    expect(audit.items.map((item) => item.visualKey)).toEqual(
      catalogAuditTargets.map((target) => target.visualKey),
    );

    for (const [index, target] of catalogAuditTargets.entries()) {
      const item = audit.items[index];
      expect(item.familySlug).toBe(target.familySlug);
      expect(item.slug).toBe(target.slug);
      expect(item.visualKey).toBe(`${item.familySlug}:${item.slug}:${item.visualKey.slice(-2)}`);
      expect(item.media.map((media) => media.src)).toEqual(target.media);
    }
  });

  it("has an explicit valid role and coherent decision, replacement, and QA state for every media item", () => {
    const keys = audit.items.map((item) => item.visualKey);
    expect(new Set(keys).size).toBe(keys.length);

    for (const item of audit.items) {
      expect(item.visualKey).toMatch(/^[a-z0-9-]+:[a-z0-9-]+:\d{2}$/);
      expect(item.media.length).toBeGreaterThan(0);

      for (const media of item.media) {
        expect(roles.has(media.role)).toBe(true);
        expect(decisions.has(media.decision)).toBe(true);
        expect(qaStates.has(media.qa)).toBe(true);
        expect(media.reason.trim().length).toBeGreaterThan(0);
        expect(media.replacement === null || media.replacement.startsWith("/assets/")).toBe(true);

        if (media.decision === "manual-review") {
          expect(media.qa).toBe("blocked");
          expect(media.replacement).toBeNull();
        }
        if (media.decision === "regenerate") {
          expect(hasCoherentRegenerateState(media)).toBe(true);
        }
        if (media.decision === "keep" || media.decision === "presentation-fix") {
          expect(media.qa).toBe("audited");
          expect(media.replacement).toBeNull();
        }
        if (media.decision === "replace-existing") {
          expect(media.replacement).not.toBeNull();
          expect(["pending", "accepted"]).toContain(media.qa);
        }
        if (media.decision === "remove") {
          expect(media.replacement).toBeNull();
          expect(["audited", "accepted"]).toContain(media.qa);
        }
      }
    }
  });

  it("contains exactly the approved initial regeneration queue", () => {
    const actualRegenerationPaths = new Set(
      audit.items.flatMap((item) =>
        item.media.filter((media) => media.decision === "regenerate").map((media) => media.src),
      ),
    );

    expect(actualRegenerationPaths).toEqual(approvedRegenerationPaths);
  });

  it("blocks wooden shop shelves until an exact product identity is provable", () => {
    const item = audit.items.find(
      ({ visualKey }) => visualKey === "raf-sistemleri:wooden-shop-shelves:01",
    );
    const hero = item?.media.find(({ role }) => role === "hero");

    expect(hero).toMatchObject({
      decision: "manual-review",
      qa: "blocked",
      replacement: null,
    });
    expect(hero?.reason).toContain("do not prove one coherent wooden-shop-shelf model");
  });

  it("blocks the produce display hero instead of accepting a hybrid of reference variants", () => {
    const item = audit.items.find(
      ({ visualKey }) => visualKey === "raf-sistemleri:vegetable-fruit-display-stands:01",
    );
    const hero = item?.media.find(({ role }) => role === "hero");

    expect(hero).toMatchObject({
      decision: "manual-review",
      qa: "blocked",
      replacement: null,
    });
    expect(hero?.reason).toContain("distinct product variants");
  });

  it("records the completed acrylic audit without inventing unsupported product identities", () => {
    const media = audit.items
      .filter(({ familySlug }) => familySlug === "pleksi-teshir-ekipmanlari")
      .flatMap((item) => item.media);
    const totals = media.reduce<Record<VisualDecision, number>>(
      (result, item) => ({ ...result, [item.decision]: result[item.decision] + 1 }),
      {
        keep: 0,
        "presentation-fix": 0,
        regenerate: 0,
        "replace-existing": 0,
        remove: 0,
        "manual-review": 0,
      },
    );

    expect(media).toHaveLength(90);
    expect(totals).toMatchObject({ keep: 78, remove: 4, "manual-review": 8 });
    expect(totals.regenerate).toBe(0);
    expect(totals["replace-existing"]).toBe(0);
  });

  it("accepts coherent shelf and cabinet photography while blocking the two duplicate cabinet records", () => {
    const acceptedShelfKeys = new Set([
      "raf-sistemleri:bakery-product-shelves:01",
      "raf-sistemleri:cosmetic-shelving-systems:01",
      "raf-sistemleri:heavy-duty-shelving-systems:01",
      "raf-sistemleri:hypermarket-shelving-systems:01",
      "raf-sistemleri:light-duty-shelving-system:01",
      "raf-sistemleri:medium-load-racking-system:01",
      "raf-sistemleri:pharmacy-shelf-systems:01",
      "raf-sistemleri:safe-novo:01",
      "raf-sistemleri:shelf-systems-without-bolts:01",
      "raf-sistemleri:supermarket-shelf-systems:01",
    ]);

    for (const item of audit.items.filter(({ visualKey }) => acceptedShelfKeys.has(visualKey))) {
      expect(item.media.every(({ decision, qa }) => decision === "keep" && qa === "audited")).toBe(true);
    }

    const cabinetItems = audit.items.filter(
      ({ familySlug }) => familySlug === "dolaplar-depolama-sistemleri",
    );
    const blockedKeys = new Set([
      "dolaplar-depolama-sistemleri:refrigerated-cabinets:17",
      "dolaplar-depolama-sistemleri:refrigerated-cabinets:18",
    ]);

    expect(cabinetItems).toHaveLength(36);
    for (const item of cabinetItems) {
      const expected = blockedKeys.has(item.visualKey)
        ? { decision: "manual-review", qa: "blocked" }
        : { decision: "keep", qa: "audited" };
      expect(item.media[0]).toMatchObject(expected);
    }
  });

  it("permits accepted regeneration records only when they have a safe replacement path", () => {
    expect(hasCoherentRegenerateState({ qa: "pending", replacement: null })).toBe(true);
    expect(hasCoherentRegenerateState({ qa: "accepted", replacement: "/assets/img/corrected.png" })).toBe(true);
    expect(hasCoherentRegenerateState({ qa: "accepted", replacement: null })).toBe(false);
  });
});
