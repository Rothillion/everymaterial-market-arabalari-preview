import { ProductSpotlight } from "../ui/ProductSpotlight";
import type { ProductTeaser } from "../content/home";
import type { Lang } from "../content/types";

export function FeaturedProducts({
  products,
  title,
  ctaLabel,
  ctaHref,
  eyebrow,
  dir,
  lang,
}: {
  products: ProductTeaser[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
  dir?: "ltr" | "rtl";
  lang: Lang;
}) {
  return <ProductSpotlight items={products} title={title} ctaLabel={ctaLabel} ctaHref={ctaHref} eyebrow={eyebrow} dir={dir} lang={lang} />;
}
