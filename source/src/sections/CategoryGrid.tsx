import { BentoGrid } from "../ui/BentoGrid";
import type { CategoryTeaser } from "../content/home";

export function CategoryGrid({
  categories,
  title,
  ctaLabel,
  ctaHref,
  eyebrow,
  dir,
}: {
  categories: (CategoryTeaser & { href: string })[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
  dir?: "ltr" | "rtl";
}) {
  return <BentoGrid items={categories} title={title} ctaLabel={ctaLabel} ctaHref={ctaHref} eyebrow={eyebrow} dir={dir} />;
}
