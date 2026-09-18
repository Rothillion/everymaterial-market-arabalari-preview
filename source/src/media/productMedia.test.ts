import { describe, expect, it } from "vitest";
import auditManifest from "../content/productVisualAudit.json";
import { buildProductMedia, getProductImageClass } from "./productMedia";

type ReplacementFixtureItem = {
  visualKey: string;
  familySlug: string;
  slug: string;
  media: Array<{
    src: string;
    role: "usage";
    decision: "replace-existing";
    reason: string;
    replacement: string;
    qa: "accepted";
    fit: "cover";
    position: string;
  }>;
};

const auditItems = auditManifest.items as unknown as ReplacementFixtureItem[];

describe("product media roles", () => {
  it("uses a complete accepted prepared set atomically and preserves role order", () => {
    const item = {
      visualKey: "pleksi-teshir-ekipmanlari:prepared-product:01",
      familySlug: "pleksi-teshir-ekipmanlari",
      slug: "prepared-product",
      media: [],
      preparedMedia: [
        {
          src: "/assets/img/urunler/hazir/corrected/pleksi/prepared-product/prepared-product-01-hero.png",
          role: "hero" as const,
          fit: "contain" as const,
          qa: "accepted" as const,
          referenceSources: ["/assets/img/urunler/prepared-product.jpg"],
          reason: "Accepted prepared hero fixture",
        },
        {
          src: "/assets/img/urunler/hazir/corrected/pleksi/prepared-product/prepared-product-02-dimensions.png",
          role: "dimensions" as const,
          fit: "contain" as const,
          qa: "accepted" as const,
          referenceSources: ["/assets/img/urunteknik/prepared-product-side.jpg"],
          reason: "Accepted prepared dimensions fixture",
        },
        {
          src: "/assets/img/urunler/hazir/corrected/pleksi/prepared-product/prepared-product-03-detail.png",
          role: "detail" as const,
          fit: "contain" as const,
          qa: "accepted" as const,
          referenceSources: ["/assets/img/urunteknik/prepared-product-detail.jpg"],
          reason: "Accepted prepared detail fixture",
        },
        {
          src: "/assets/img/urunler/hazir/corrected/pleksi/prepared-product/prepared-product-04-usage.png",
          role: "usage" as const,
          fit: "cover" as const,
          qa: "accepted" as const,
          referenceSources: ["/assets/img/urundetay/prepared-product-usage.jpg"],
          reason: "Accepted prepared usage fixture",
        },
      ],
    };
    auditItems.push(item as unknown as ReplacementFixtureItem);

    try {
      const media = buildProductMedia({
        visualKey: item.visualKey,
        alt: "Prepared Product",
        heroImage: "/assets/img/urunler/legacy-prepared-product.jpg",
        galleryImages: [],
      });

      expect(media.map(({ src, role, fit }) => [src, role, fit])).toEqual([
        [item.preparedMedia[0].src, "hero", "contain"],
        [item.preparedMedia[1].src, "dimensions", "contain"],
        [item.preparedMedia[2].src, "detail", "contain"],
        [item.preparedMedia[3].src, "usage", "cover"],
      ]);
    } finally {
      auditItems.pop();
    }
  });

  it("falls back to legacy media when a prepared set is incomplete", () => {
    const item = {
      visualKey: "pleksi-teshir-ekipmanlari:incomplete-product:01",
      familySlug: "pleksi-teshir-ekipmanlari",
      slug: "incomplete-product",
      media: [],
      preparedMedia: [
        {
          src: "/assets/img/urunler/hazir/corrected/pleksi/incomplete-product/incomplete-product-01-hero.png",
          role: "hero" as const,
          fit: "contain" as const,
          qa: "accepted" as const,
          referenceSources: ["/assets/img/urunler/incomplete-product.jpg"],
          reason: "Accepted prepared hero fixture",
        },
        {
          src: "/assets/img/urunler/hazir/corrected/pleksi/incomplete-product/incomplete-product-02-dimensions.png",
          role: "dimensions" as const,
          fit: "contain" as const,
          qa: "pending" as const,
          referenceSources: ["/assets/img/urunteknik/incomplete-product-side.jpg"],
          reason: "Pending prepared dimensions fixture",
        },
      ],
    };
    auditItems.push(item as unknown as ReplacementFixtureItem);

    try {
      const media = buildProductMedia({
        visualKey: item.visualKey,
        alt: "Incomplete Product",
        heroImage: "/assets/img/urunler/legacy-incomplete-product.jpg",
        galleryImages: ["/assets/img/urunteknik/legacy-incomplete-product-detail.jpg"],
      });

      expect(media.map(({ src }) => src)).toEqual([
        "/assets/img/urunler/legacy-incomplete-product.jpg",
        "/assets/img/urunteknik/legacy-incomplete-product-detail.jpg",
      ]);
    } finally {
      auditItems.pop();
    }
  });

  it("keeps packshots visible and covers only verified usage scenes", () => {
    const media = buildProductMedia({
      visualKey: "market-ekipmanlari:100-l-metal-shopping-cart:01",
      alt: "100 lt Metal Market Arabası",
      heroImage: "/assets/img/urunler/hazir/100-l-metal-shopping-cart-1-hero.png",
      galleryImages: [
        "/assets/img/urunler/hazir/100-l-metal-shopping-cart-2-olcu.png",
        "/assets/img/urunler/hazir/100-l-metal-shopping-cart-3-detay.png",
        "/assets/img/urunler/hazir/100-l-metal-shopping-cart-4-kullanim.png",
      ],
    });

    expect(media.map((item) => [item.role, item.fit])).toEqual([
      ["hero", "contain"],
      ["dimensions", "contain"],
      ["detail", "contain"],
      ["usage", "cover"],
    ]);
    expect(getProductImageClass(media[0])).toContain("object-contain");
    expect(getProductImageClass(media[3])).toContain("object-cover");
  });

  it("uses an accepted regenerated usage scene with cover fit", () => {
    const media = buildProductMedia({
      visualKey: "kapaklar:stainless-inner-lid:01",
      alt: "Stainless Inner Lid",
      heroImage: "/assets/img/urunler/hazir/stainless-inner-lid-1-hero.png",
      galleryImages: [
        "/assets/img/urunler/hazir/stainless-inner-lid-4-kullanim.png",
      ],
    });

    expect(media).toEqual([
      {
        src: "/assets/img/urunler/hazir/stainless-inner-lid-1-hero.png",
        alt: "Stainless Inner Lid",
        role: "hero",
        fit: "contain",
      },
      {
        src: "/assets/img/urunler/hazir/corrected/kapaklar-stainless-inner-lid-01-usage.png",
        alt: "Stainless Inner Lid",
        role: "usage",
        fit: "cover",
      },
    ]);
  });

  it("covers an audited shelf installation while preserving its project role", () => {
    const media = buildProductMedia({
      visualKey: "raf-sistemleri:bakery-product-shelves:01",
      alt: "Bakery Product Shelves",
      heroImage: "/assets/img/urunler/raf-hero.jpg",
      galleryImages: [
        "/assets/img/urundetay/ستندات-الخبز-والمعجنات-turkeyraf-31.jpg",
      ],
    });

    expect(media[1]).toMatchObject({
      role: "project",
      fit: "cover",
      src: "/assets/img/urundetay/ستندات-الخبز-والمعجنات-turkeyraf-31.jpg",
    });
  });

  it("infers role and contain fit for legacy heroes and unclassified gallery paths", () => {
    const media = buildProductMedia({
      visualKey: "unknown:legacy-product:01",
      alt: "Legacy Product",
      heroImage: "/assets/img/urunler/legacy-product.jpg",
      galleryImages: ["/assets/img/urunteknik/legacy-product-side.jpg"],
    });

    expect(media.map(({ role, fit }) => [role, fit])).toEqual([
      ["hero", "contain"],
      ["detail", "contain"],
    ]);
  });

  it("uses an accepted replacement path and keeps the verified role fit", () => {
    const item = {
      visualKey: "test:replacement-product:01",
      familySlug: "test",
      slug: "replacement-product",
      media: [
        {
          src: "/assets/img/urunler/old-usage.jpg",
          role: "usage" as const,
          decision: "replace-existing" as const,
          reason: "Controlled replacement fixture",
          replacement: "/assets/img/urunler/new-usage.jpg",
          qa: "accepted" as const,
          fit: "cover" as const,
          position: "center top",
        },
      ],
    };
    auditItems.push(item);

    try {
      const media = buildProductMedia({
        visualKey: item.visualKey,
        alt: "Replacement Product",
        heroImage: "/assets/img/urunler/replacement-hero.jpg",
        galleryImages: ["/assets/img/urunler/old-usage.jpg"],
      });

      expect(media[1]).toEqual({
        src: "/assets/img/urunler/new-usage.jpg",
        alt: "Replacement Product",
        role: "usage",
        fit: "cover",
        position: "center top",
      });
    } finally {
      auditItems.pop();
    }
  });

  it("omits media explicitly removed by the visual audit", () => {
    const item = {
      visualKey: "test:duplicate-gallery-product:01",
      familySlug: "test",
      slug: "duplicate-gallery-product",
      media: [
        {
          src: "/assets/img/urunler/duplicate-gallery.jpg",
          role: "detail" as const,
          decision: "remove" as const,
          reason: "Exact duplicate of another product variant.",
          replacement: null,
          qa: "audited" as const,
        },
      ],
    };
    auditItems.push(item as unknown as ReplacementFixtureItem);

    try {
      const media = buildProductMedia({
        visualKey: item.visualKey,
        alt: "Duplicate Gallery Product",
        heroImage: "/assets/img/urunler/product-hero.jpg",
        galleryImages: ["/assets/img/urunler/duplicate-gallery.jpg"],
      });

      expect(media.map(({ src }) => src)).toEqual(["/assets/img/urunler/product-hero.jpg"]);
    } finally {
      auditItems.pop();
    }
  });

  it("omits blocked gallery media but retains a blocked hero as the product fallback", () => {
    const item = {
      visualKey: "test:blocked-gallery-product:01",
      familySlug: "test",
      slug: "blocked-gallery-product",
      media: [
        {
          src: "/assets/img/urunler/blocked-hero.jpg",
          role: "hero" as const,
          decision: "manual-review" as const,
          reason: "No definitive replacement reference is available.",
          replacement: null,
          qa: "blocked" as const,
        },
        {
          src: "/assets/img/urunler/blocked-detail.jpg",
          role: "detail" as const,
          decision: "manual-review" as const,
          reason: "This gallery identity cannot be proven.",
          replacement: null,
          qa: "blocked" as const,
        },
      ],
    };
    auditItems.push(item as unknown as ReplacementFixtureItem);

    try {
      const media = buildProductMedia({
        visualKey: item.visualKey,
        alt: "Blocked Gallery Product",
        heroImage: "/assets/img/urunler/blocked-hero.jpg",
        galleryImages: ["/assets/img/urunler/blocked-detail.jpg"],
      });

      expect(media.map(({ src }) => src)).toEqual(["/assets/img/urunler/blocked-hero.jpg"]);
    } finally {
      auditItems.pop();
    }
  });
});
