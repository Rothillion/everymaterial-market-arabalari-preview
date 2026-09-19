import { beforeEach, describe, expect, it } from "vitest";
import auditManifest from "./productVisualAudit.json";
import { productCatalogContent } from "./productCatalog";
import {
  findCatalogProduct,
  readCatalogSelection,
  rememberCatalogSelection,
} from "./productCatalogLookup";
import { LANGS } from "./types";

const selectionStorageKey = "everymaterial:catalog-selection:v1";

describe("product catalog lookup", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("disambiguates a duplicate slug by permalink, with no visual-key handoff needed", () => {
    const families = productCatalogContent.tr;
    const coffee = families.find((family) => family.slug === "makineler")!;
    const variants = coffee.products.filter((product) => product.slug === "coffee-mill");

    expect(variants).toHaveLength(2);
    expect(variants[0].permalink).toBe("coffee-mill");
    expect(variants[1].permalink).toBe("coffee-mill-2");
    expect(variants[0].visualKey).not.toBe(variants[1].visualKey);
    expect(findCatalogProduct(families, "coffee-mill")?.product.visualKey).toBe(variants[0].visualKey);
    expect(findCatalogProduct(families, "coffee-mill-2")?.product.visualKey).toBe(variants[1].visualKey);
  });

  it("stores one namespaced selection and reads it only for its matching language and slug", () => {
    const selection = {
      lang: "tr" as const,
      slug: "coffee-mill",
      visualKey: "makineler:coffee-mill:02",
    };

    rememberCatalogSelection(selection);

    expect(window.sessionStorage).toHaveLength(1);
    expect(window.sessionStorage.getItem(selectionStorageKey)).toBe(JSON.stringify(selection));
    expect(readCatalogSelection("tr", "coffee-mill")).toBe(selection.visualKey);
    expect(readCatalogSelection("en", "coffee-mill")).toBeNull();
    expect(readCatalogSelection("tr", "another-product")).toBeNull();
  });

  it("rejects invalid stored data and tolerates unavailable session storage", () => {
    window.sessionStorage.setItem(selectionStorageKey, "not-json");
    expect(readCatalogSelection("tr", "coffee-mill")).toBeNull();

    const sessionStorageDescriptor = Object.getOwnPropertyDescriptor(window, "sessionStorage");
    Object.defineProperty(window, "sessionStorage", {
      configurable: true,
      value: {
        getItem: () => {
          throw new Error("Storage unavailable");
        },
        setItem: () => {
          throw new Error("Storage unavailable");
        },
      },
    });

    try {
      expect(readCatalogSelection("tr", "coffee-mill")).toBeNull();
      expect(() =>
        rememberCatalogSelection({
          lang: "tr",
          slug: "coffee-mill",
          visualKey: "makineler:coffee-mill:02",
        }),
      ).not.toThrow();
    } finally {
      Object.defineProperty(window, "sessionStorage", sessionStorageDescriptor!);
    }
  });

  it("assigns manifest visual keys by product index across every language", () => {
    const manifestKeys = auditManifest.items.map((item) => item.visualKey);

    for (const lang of LANGS) {
      const catalogKeys = productCatalogContent[lang].flatMap((family) =>
        family.products.map((product) => product.visualKey),
      );

      expect(catalogKeys).toEqual(manifestKeys);
    }
  });

  it("resolves every accepted replacement through the shared media layer in all languages", () => {
    const acceptedReplacements = auditManifest.items.flatMap((item) =>
      item.media
        .filter((media) => media.qa === "accepted" && media.replacement)
        .map((media) => ({ visualKey: item.visualKey, replacement: media.replacement! })),
    );

    expect(acceptedReplacements).toHaveLength(25);

    for (const lang of LANGS) {
      const products = productCatalogContent[lang].flatMap((family) => family.products);

      for (const accepted of acceptedReplacements) {
        const product = products.find(({ visualKey }) => visualKey === accepted.visualKey);
        expect(product?.media.map(({ src }) => src)).toContain(accepted.replacement);
      }
    }
  });
});
