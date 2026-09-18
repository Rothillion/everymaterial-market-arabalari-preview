import auditManifest from "../content/productVisualAudit.json";

export type ProductImageRole = "hero" | "dimensions" | "detail" | "usage" | "project";
export type ProductImageFit = "contain" | "cover";

export interface ProductImage {
  src: string;
  alt: string;
  role: ProductImageRole;
  fit: ProductImageFit;
  position?: string;
}

export interface PreparedProductMedia {
  src: string;
  role: Exclude<ProductImageRole, "project">;
  fit: ProductImageFit;
  qa: "accepted" | "pending" | "blocked";
  referenceSources: string[];
  reason: string;
  position?: string;
}

type AuditMedia = {
  src: string;
  role: ProductImageRole;
  decision: string;
  replacement: string | null;
  qa: string;
  fit?: ProductImageFit;
  position?: string;
};

type AuditItem = {
  visualKey: string;
  media: AuditMedia[];
  preparedMedia?: PreparedProductMedia[];
};

const auditItems = auditManifest.items as AuditItem[];

function inferRole(src: string, isHero: boolean): ProductImageRole {
  if (isHero) return "hero";

  const filename = src.split("/").pop()?.replace(/\.[^./]+$/, "") ?? "";
  if (/(?:^|-)2-olcu$/.test(filename)) return "dimensions";
  if (/(?:^|-)3-detay$/.test(filename)) return "detail";
  if (/(?:^|-)4-kullanim$/.test(filename)) return "usage";
  return "detail";
}

function isVerified(media: AuditMedia): boolean {
  if (media.qa === "accepted") {
    return !["manual-review", "remove"].includes(media.decision);
  }

  return media.qa === "audited" && !["regenerate", "manual-review", "remove"].includes(media.decision);
}

function resolveFit(role: ProductImageRole, auditMedia?: AuditMedia): ProductImageFit {
  if (role === "hero" || role === "dimensions" || role === "detail") return "contain";
  if (!auditMedia || !isVerified(auditMedia)) return "contain";
  return auditMedia.fit ?? "cover";
}

function findAuditMedia(visualKey: string, src: string): AuditMedia | undefined {
  const item = auditItems.find((candidate) => candidate.visualKey === visualKey);
  return item?.media.find((media) => media.src === src);
}

function findAuditItem(visualKey: string): AuditItem | undefined {
  return auditItems.find((candidate) => candidate.visualKey === visualKey);
}

function hasCompletePreparedMedia(
  preparedMedia: PreparedProductMedia[] | undefined,
): preparedMedia is PreparedProductMedia[] {
  if (!preparedMedia || preparedMedia.length !== 4 || preparedMedia.some((media) => media.qa !== "accepted")) {
    return false;
  }

  return ["hero", "dimensions", "detail", "usage"].every(
    (role, index) => preparedMedia[index]?.role === role,
  );
}

function createProductImage(
  visualKey: string,
  alt: string,
  src: string,
  isHero: boolean,
): ProductImage | null {
  const auditMedia = findAuditMedia(visualKey, src);
  if (auditMedia?.decision === "remove" || (!isHero && auditMedia?.decision === "manual-review")) {
    return null;
  }

  const role = auditMedia?.role ?? inferRole(src, isHero);
  const productImage: ProductImage = {
    src: auditMedia?.qa === "accepted" && auditMedia.replacement ? auditMedia.replacement : src,
    alt,
    role,
    fit: resolveFit(role, auditMedia),
  };

  if (auditMedia?.position) productImage.position = auditMedia.position;
  return productImage;
}

export function buildProductMedia(input: {
  visualKey: string;
  alt: string;
  heroImage: string;
  galleryImages: string[];
}): ProductImage[] {
  const preparedMedia = findAuditItem(input.visualKey)?.preparedMedia;
  if (hasCompletePreparedMedia(preparedMedia)) {
    return preparedMedia.map((image) => ({
      src: image.src,
      alt: input.alt,
      role: image.role,
      fit: image.fit,
      ...(image.position ? { position: image.position } : {}),
    }));
  }

  return [
    createProductImage(input.visualKey, input.alt, input.heroImage, true),
    ...input.galleryImages.map((src) => createProductImage(input.visualKey, input.alt, src, false)),
  ].filter((image): image is ProductImage => image !== null);
}

export function getProductImageClass(image: ProductImage): string {
  return image.fit === "cover" ? "object-cover" : "object-contain p-2.5";
}
