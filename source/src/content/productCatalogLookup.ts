import type { ProductCategoryEntry, ProductCategoryFamily } from "./productCatalog";
import type { Lang } from "./types";

const catalogSelectionStorageKey = "everymaterial:catalog-selection:v1";

export interface CatalogSelection {
  lang: Lang;
  slug: string;
  visualKey: string;
}

type CatalogMatch = {
  categoryIndex: number;
  family: ProductCategoryFamily;
  product: ProductCategoryEntry;
};

function getSessionStorage(): Storage | null {
  if (typeof window === "undefined") return null;

  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

export function rememberCatalogSelection(selection: CatalogSelection): void {
  const storage = getSessionStorage();
  if (!storage) return;

  try {
    storage.setItem(
      catalogSelectionStorageKey,
      JSON.stringify({
        lang: selection.lang,
        slug: selection.slug,
        visualKey: selection.visualKey,
      }),
    );
  } catch {
    // Private browsing or storage restrictions should not block navigation.
  }
}

export function readCatalogSelection(lang: Lang, slug: string): string | null {
  const storage = getSessionStorage();
  if (!storage) return null;

  try {
    const stored = storage.getItem(catalogSelectionStorageKey);
    if (!stored) return null;

    const selection: unknown = JSON.parse(stored);
    if (
      !selection ||
      typeof selection !== "object" ||
      (selection as CatalogSelection).lang !== lang ||
      (selection as CatalogSelection).slug !== slug ||
      typeof (selection as CatalogSelection).visualKey !== "string"
    ) {
      return null;
    }

    return (selection as CatalogSelection).visualKey;
  } catch {
    return null;
  }
}

export function findCatalogProduct(
  families: ProductCategoryFamily[],
  slug: string,
  preferredVisualKey?: string | null,
): CatalogMatch | null {
  let firstMatch: CatalogMatch | null = null;

  for (const [categoryIndex, family] of families.entries()) {
    for (const product of family.products) {
      if (product.slug !== slug) continue;

      const match = { categoryIndex, family, product };
      if (product.visualKey === preferredVisualKey) return match;
      if (!firstMatch) firstMatch = match;
    }
  }

  return firstMatch;
}
