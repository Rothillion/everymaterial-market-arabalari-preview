import { execFileSync } from "node:child_process";
import { mkdtempSync, mkdirSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { tmpdir } from "node:os";
import { afterEach, describe, expect, it } from "vitest";
import { validateVisualAssets } from "./validate-visual-assets.mjs";

const portraitPaths = [
  "/assets/img/home/featured-products/mystic-box-portrait.png",
  "/assets/img/home/featured-products/mystic-set-box-portrait.png",
  "/assets/img/home/featured-products/extreme-box-portrait.png",
  "/assets/img/home/featured-products/extreme-set-box-portrait.png",
  "/assets/img/home/featured-products/cylindrical-silo-portrait.png",
  "/assets/img/home/featured-products/rectangular-silo-portrait.png",
  "/assets/img/home/featured-products/bonbon-box-portrait.png",
  "/assets/img/home/featured-products/bonbon-set-box-portrait.png",
];
const fixtureRoots = [];

function writeAsset(webDirectory, assetPath, contents = assetPath) {
  const filePath = path.join(webDirectory, "public", assetPath.slice(1));
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, contents);
}

function media(overrides = {}) {
  return {
    src: "/assets/img/current.png",
    role: "hero",
    decision: "keep",
    reason: "Fixture media",
    replacement: null,
    qa: "audited",
    ...overrides,
  };
}

function homeSource(localeImages = {}) {
  const sourceForLocale = (locale) =>
    (localeImages[locale] ?? portraitPaths)
      .map((image, index) => `{ name: "Product ${index + 1}", image: "${image}" }`)
      .join(",");

  return `export const homeContent = {
    tr: { featuredProducts: [${sourceForLocale("tr")}] },
    en: { featuredProducts: [${sourceForLocale("en")}] },
    de: { featuredProducts: [${sourceForLocale("de")}] },
    ar: { featuredProducts: [${sourceForLocale("ar")}] },
  };`;
}

function createFixture({ entries = [media()], omittedAssets = [], localeImages, duplicatePortraits = false } = {}) {
  const root = mkdtempSync(path.join(tmpdir(), "visual-assets-"));
  fixtureRoots.push(root);
  const webDirectory = path.join(root, "web");
  const contentDirectory = path.join(webDirectory, "src", "content");
  mkdirSync(contentDirectory, { recursive: true });

  writeFileSync(
    path.join(contentDirectory, "productVisualAudit.json"),
    JSON.stringify({
      version: 1,
      items: [{ visualKey: "fixture:item:01", familySlug: "fixture", slug: "item", media: entries }],
    }),
  );
  writeFileSync(path.join(contentDirectory, "home.ts"), homeSource(localeImages));

  const omitted = new Set(omittedAssets);
  for (const entry of entries) {
    if (!omitted.has(entry.src) && entry.src.startsWith("/assets/") && !entry.src.includes("..")) {
      writeAsset(webDirectory, entry.src);
    }
    if (entry.replacement && !omitted.has(entry.replacement) && !entry.replacement.includes("..")) {
      writeAsset(webDirectory, entry.replacement);
    }
  }

  for (const [index, portraitPath] of portraitPaths.entries()) {
    if (!omitted.has(portraitPath)) {
      writeAsset(webDirectory, portraitPath, duplicatePortraits && index === 1 ? portraitPaths[0] : portraitPath);
    }
  }

  return { root, webDirectory };
}

function categories(result) {
  return result.errors.map((error) => error.category);
}

afterEach(() => {
  while (fixtureRoots.length > 0) {
    rmSync(fixtureRoots.pop(), { recursive: true, force: true });
  }
});

describe("validateVisualAssets", () => {
  it("reports a missing current source", () => {
    const fixture = createFixture({ omittedAssets: ["/assets/img/current.png"] });

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain("MISSING_CURRENT_SOURCE");
  });

  it("reports a missing accepted replacement", () => {
    const replacement = "/assets/img/corrected.png";
    const fixture = createFixture({
      entries: [media({ decision: "replace-existing", qa: "accepted", replacement })],
      omittedAssets: [replacement],
    });

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain("MISSING_ACCEPTED_REPLACEMENT");
  });

  it("rejects corrected assets that are not referenced by an accepted manifest record", () => {
    const fixture = createFixture();
    writeAsset(fixture.webDirectory, "/assets/img/urunler/hazir/corrected/rejected-candidate.png");

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain(
      "UNREFERENCED_CORRECTED_ASSET",
    );
  });

  it("accepts a regenerate record with an existing accepted replacement", () => {
    const fixture = createFixture({
      entries: [media({ decision: "regenerate", qa: "accepted", replacement: "/assets/img/corrected.png" })],
    });

    expect(validateVisualAssets({ webDirectory: fixture.webDirectory }).errors).toEqual([]);
  });

  it("rejects an accepted regenerate record without a replacement", () => {
    const fixture = createFixture({ entries: [media({ decision: "regenerate", qa: "accepted" })] });

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain(
      "ACCEPTED_REGENERATE_WITHOUT_REPLACEMENT",
    );
  });

  it("rejects malformed traversal asset paths", () => {
    const fixture = createFixture({ entries: [media({ src: "/assets/../outside.png" })] });

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain("MALFORMED_ASSET_PATH");
  });

  it.skipIf(process.platform === "win32")("rejects symlinks that escape public", () => {
    const fixture = createFixture({ entries: [media({ src: "/assets/img/escape.png" })] });
    const outsideAsset = path.join(fixture.root, "outside.png");
    writeFileSync(outsideAsset, "outside");
    const symlinkPath = path.join(fixture.webDirectory, "public", "assets", "img", "escape.png");
    rmSync(symlinkPath);
    symlinkSync(outsideAsset, symlinkPath);

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain("ESCAPING_ASSET_PATH");
  });

  it("rejects duplicate homepage portrait bytes", () => {
    const fixture = createFixture({ duplicatePortraits: true });

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain("DUPLICATE_HOMEPAGE_PORTRAIT");
  });

  it("rejects a wrong ordered portrait mapping for one locale", () => {
    const wrongEnglishOrder = [...portraitPaths];
    [wrongEnglishOrder[0], wrongEnglishOrder[1]] = [wrongEnglishOrder[1], wrongEnglishOrder[0]];
    const fixture = createFixture({ localeImages: { en: wrongEnglishOrder } });

    expect(categories(validateVisualAssets({ webDirectory: fixture.webDirectory }))).toContain("HOMEPAGE_PORTRAIT_MAPPING");
  });

  it("returns a nonzero CLI status when fixture errors aggregate", () => {
    const fixture = createFixture({ omittedAssets: ["/assets/img/current.png"] });
    const validatorPath = path.resolve("scripts/validate-visual-assets.mjs");

    try {
      execFileSync(process.execPath, [validatorPath, fixture.webDirectory], { encoding: "utf8", stdio: "pipe" });
      throw new Error("Expected the validator CLI to exit nonzero");
    } catch (error) {
      expect(error.status).toBe(1);
      expect(error.stderr).toContain("MISSING_CURRENT_SOURCE");
      expect(error.stderr).toContain("Visual asset validation failed with 1 error(s).");
    }
  });
});
