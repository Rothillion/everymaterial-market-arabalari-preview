import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync, realpathSync } from "node:fs";
import path from "node:path";
import ts from "typescript";
import { fileURLToPath } from "node:url";

const scriptPath = fileURLToPath(import.meta.url);
const defaultWebDirectory = path.resolve(path.dirname(scriptPath), "..");
const locales = ["tr", "en", "de", "ar"];
export const expectedHomepagePortraits = [
  "/assets/img/home/featured-products/mystic-box-portrait.png",
  "/assets/img/home/featured-products/mystic-set-box-portrait.png",
  "/assets/img/home/featured-products/extreme-box-portrait.png",
  "/assets/img/home/featured-products/extreme-set-box-portrait.png",
  "/assets/img/home/featured-products/cylindrical-silo-portrait.png",
  "/assets/img/home/featured-products/rectangular-silo-portrait.png",
  "/assets/img/home/featured-products/bonbon-box-portrait.png",
  "/assets/img/home/featured-products/bonbon-set-box-portrait.png",
];

function countBy(entries, key) {
  return entries.reduce((counts, entry) => {
    counts[entry[key]] = (counts[entry[key]] ?? 0) + 1;
    return counts;
  }, {});
}

function isWithin(parent, candidate) {
  const relative = path.relative(parent, candidate);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== "..");
}

function unwrapExpression(expression) {
  let unwrapped = expression;
  while (
    ts.isParenthesizedExpression(unwrapped) ||
    ts.isAsExpression(unwrapped) ||
    ts.isTypeAssertionExpression(unwrapped) ||
    ts.isSatisfiesExpression(unwrapped)
  ) {
    unwrapped = unwrapped.expression;
  }
  return unwrapped;
}

function propertyName(property) {
  if (!property.name) return null;
  if (ts.isIdentifier(property.name) || ts.isStringLiteral(property.name) || ts.isNumericLiteral(property.name)) {
    return property.name.text;
  }
  return null;
}

function propertyInitializer(object, name) {
  const property = object.properties.find(
    (candidate) => ts.isPropertyAssignment(candidate) && propertyName(candidate) === name,
  );
  return property ? unwrapExpression(property.initializer) : null;
}

function getHomeContentObject(homeSource) {
  const sourceFile = ts.createSourceFile("home.ts", homeSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.name.text === "homeContent" && declaration.initializer) {
        const initializer = unwrapExpression(declaration.initializer);
        return ts.isObjectLiteralExpression(initializer) ? initializer : null;
      }
    }
  }
  return null;
}

export function extractHomepageFeaturedProductMappings(homeSource) {
  const homeContent = getHomeContentObject(homeSource);
  if (!homeContent) return { mappings: {}, parseErrors: ["homeContent object literal was not found"] };

  const mappings = {};
  const parseErrors = [];
  for (const locale of locales) {
    const localeValue = propertyInitializer(homeContent, locale);
    if (!localeValue || !ts.isObjectLiteralExpression(localeValue)) {
      parseErrors.push(`${locale}: locale object literal was not found`);
      continue;
    }

    const featuredProducts = propertyInitializer(localeValue, "featuredProducts");
    if (!featuredProducts || !ts.isArrayLiteralExpression(featuredProducts)) {
      parseErrors.push(`${locale}: featuredProducts array literal was not found`);
      continue;
    }

    const images = [];
    for (const [index, entry] of featuredProducts.elements.entries()) {
      const product = unwrapExpression(entry);
      if (!ts.isObjectLiteralExpression(product)) {
        parseErrors.push(`${locale}[${index}]: product object literal was not found`);
        continue;
      }
      const image = propertyInitializer(product, "image");
      if (!image || !ts.isStringLiteral(image)) {
        parseErrors.push(`${locale}[${index}]: image string literal was not found`);
        continue;
      }
      images.push(image.text);
    }
    mappings[locale] = images;
  }

  return { mappings, parseErrors };
}

export function validateVisualAssets({ webDirectory = defaultWebDirectory } = {}) {
  const publicDirectory = path.join(webDirectory, "public");
  const manifestPath = path.join(webDirectory, "src/content/productVisualAudit.json");
  const homeContentPath = path.join(webDirectory, "src/content/home.ts");
  const errors = [];
  const addError = (category, message) => errors.push({ category, message });

  function resolveAsset(assetPath, context) {
    if (typeof assetPath !== "string" || !assetPath.startsWith("/assets/")) {
      addError("MALFORMED_ASSET_PATH", `${context}: expected an /assets/... path, received ${JSON.stringify(assetPath)}`);
      return null;
    }

    const relativePath = assetPath.slice(1);
    if (
      relativePath.includes("\\") ||
      relativePath.includes("?") ||
      relativePath.includes("#") ||
      relativePath.split("/").some((segment) => segment === "" || segment === "." || segment === "..")
    ) {
      addError("MALFORMED_ASSET_PATH", `${context}: unsafe asset path ${assetPath}`);
      return null;
    }

    const resolvedPath = path.resolve(publicDirectory, relativePath);
    if (!isWithin(publicDirectory, resolvedPath)) {
      addError("ESCAPING_ASSET_PATH", `${context}: asset path escapes public/: ${assetPath}`);
      return null;
    }

    return resolvedPath;
  }

  function validateExistingAsset(assetPath, context, missingCategory) {
    const resolvedPath = resolveAsset(assetPath, context);
    if (!resolvedPath) return null;

    if (!existsSync(resolvedPath)) {
      addError(missingCategory, `${context}: missing ${assetPath}`);
      return null;
    }

    const realPublicDirectory = realpathSync(publicDirectory);
    const realAssetPath = realpathSync(resolvedPath);
    if (!isWithin(realPublicDirectory, realAssetPath)) {
      addError("ESCAPING_ASSET_PATH", `${context}: symlink resolves outside public/: ${assetPath}`);
      return null;
    }

    return realAssetPath;
  }

  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const media = manifest.items.flatMap((item) =>
    item.media.map((entry) => ({ ...entry, visualKey: item.visualKey })),
  );
  const decisionTotals = countBy(media, "decision");
  const qaTotals = countBy(media, "qa");

  for (const entry of media) {
    const context = `${entry.visualKey} ${entry.role}`;
    validateExistingAsset(entry.src, context, "MISSING_CURRENT_SOURCE");

    if (entry.qa === "accepted" && entry.replacement) {
      validateExistingAsset(entry.replacement, context, "MISSING_ACCEPTED_REPLACEMENT");
    }

    if (entry.decision === "replace-existing" && entry.qa === "accepted" && !entry.replacement) {
      addError("ACCEPTED_REPLACEMENT_MISSING", `${context}: accepted replacement needs a replacement path`);
    }

    if (entry.decision === "regenerate" && entry.qa === "accepted" && !entry.replacement) {
      addError("ACCEPTED_REGENERATE_WITHOUT_REPLACEMENT", `${context}: accepted regenerate entry needs a replacement path`);
    }

    if (entry.decision === "regenerate" && entry.qa === "pending" && !entry.replacement) {
      addError("PENDING_TASK_7_REPLACEMENT", `${context}: Task 7 replacement is pending for ${entry.src}`);
    }
  }

  const acceptedReplacementPaths = new Set(
    media
      .filter((entry) => entry.qa === "accepted" && entry.replacement)
      .map((entry) => entry.replacement),
  );
  const correctedDirectory = path.join(publicDirectory, "assets/img/urunler/hazir/corrected");
  if (existsSync(correctedDirectory)) {
    for (const entry of readdirSync(correctedDirectory, { withFileTypes: true })) {
      if (!entry.isFile()) continue;
      const assetPath = `/assets/img/urunler/hazir/corrected/${entry.name}`;
      if (!acceptedReplacementPaths.has(assetPath)) {
        addError(
          "UNREFERENCED_CORRECTED_ASSET",
          `${assetPath} is not referenced by an accepted manifest record`,
        );
      }
    }
  }

  const { mappings, parseErrors } = extractHomepageFeaturedProductMappings(readFileSync(homeContentPath, "utf8"));
  for (const parseError of parseErrors) {
    addError("HOMEPAGE_PORTRAIT_MAPPING", parseError);
  }
  for (const locale of locales) {
    const images = mappings[locale];
    if (!images) continue;
    if (
      images.length !== expectedHomepagePortraits.length ||
      images.some((image, index) => image !== expectedHomepagePortraits[index])
    ) {
      addError("HOMEPAGE_PORTRAIT_MAPPING", `${locale}: featuredProducts images must match the ordered Task 8 portrait paths`);
    }
  }

  const portraitHashes = new Map();
  for (const assetPath of expectedHomepagePortraits) {
    const assetFile = validateExistingAsset(assetPath, "homepage featured product", "PENDING_TASK_8_PORTRAIT");
    if (!assetFile) continue;

    const hash = createHash("sha256").update(readFileSync(assetFile)).digest("hex");
    const firstPath = portraitHashes.get(hash);
    if (firstPath) {
      addError("DUPLICATE_HOMEPAGE_PORTRAIT", `${assetPath} matches ${firstPath} (SHA-256 ${hash})`);
    } else {
      portraitHashes.set(hash, assetPath);
    }
  }

  return {
    errors,
    decisionTotals,
    qaTotals,
    homepagePortraitPathCount: expectedHomepagePortraits.length,
    homepagePortraitHashCount: portraitHashes.size,
  };
}

export function runVisualAssetValidationCli({ webDirectory = defaultWebDirectory } = {}) {
  const result = validateVisualAssets({ webDirectory });
  console.log(`Visual decision totals: ${JSON.stringify(result.decisionTotals)}`);
  console.log(`Visual QA totals: ${JSON.stringify(result.qaTotals)}`);
  console.log(
    `Homepage portrait paths: ${result.homepagePortraitPathCount}; hashes computed: ${result.homepagePortraitHashCount}`,
  );

  for (const error of result.errors) {
    console.error(`${error.category}: ${error.message}`);
  }

  if (result.errors.length > 0) {
    console.error(`Visual asset validation failed with ${result.errors.length} error(s).`);
    return 1;
  }

  console.log("Visual asset validation passed.");
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === scriptPath) {
  process.exitCode = runVisualAssetValidationCli({
    webDirectory: process.argv[2] ? path.resolve(process.argv[2]) : defaultWebDirectory,
  });
}
