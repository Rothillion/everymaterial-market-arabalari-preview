import { ProductSpotlight } from "../ui/ProductSpotlight";
import type { ProductTeaser } from "../content/home";

export function FeaturedProducts({
  products,
  title,
  ctaLabel,
  eyebrow,
  dir,
}: {
  products: ProductTeaser[];
  title: string;
  ctaLabel: string;
  eyebrow?: string;
  dir?: "ltr" | "rtl";
}) {
  return <ProductSpotlight items={products} title={title} ctaLabel={ctaLabel} eyebrow={eyebrow} dir={dir} />;
}
