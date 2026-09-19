import { ProductSpotlight } from "../ui/ProductSpotlight";
import type { ProductTeaser } from "../content/home";

export function FeaturedProducts({
  products,
  title,
  ctaLabel,
  ctaHref,
  eyebrow,
  dir,
}: {
  products: ProductTeaser[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
  dir?: "ltr" | "rtl";
}) {
  return <ProductSpotlight items={products} title={title} ctaLabel={ctaLabel} ctaHref={ctaHref} eyebrow={eyebrow} dir={dir} />;
}
