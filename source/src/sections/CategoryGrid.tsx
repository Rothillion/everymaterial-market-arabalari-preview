import { BentoGrid } from "../ui/BentoGrid";
import type { CategoryTeaser } from "../content/home";

export function CategoryGrid({
  categories,
  title,
  ctaLabel,
  eyebrow,
  dir,
}: {
  categories: CategoryTeaser[];
  title: string;
  ctaLabel: string;
  eyebrow?: string;
  dir?: "ltr" | "rtl";
}) {
  return <BentoGrid items={categories} title={title} ctaLabel={ctaLabel} eyebrow={eyebrow} dir={dir} />;
}
