import { motion } from "framer-motion";
import { fadeUp } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { Button } from "./Button";

export interface StripItem {
  name: string;
  image: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Each row reveals on its own scroll trigger (rather than the whole list sharing one
 * useScrollReveal) — with 9 real projects this section runs ~4800px tall, far taller
 * than any viewport, so a single "30% of the whole section visible" check could never
 * be satisfied and the rows would never fade in.
 */
function Strip({
  item,
  index,
  total,
  ctaHref,
}: {
  item: StripItem;
  index: number;
  total: number;
  ctaHref: string;
}) {
  const { ref, isInView } = useScrollReveal<HTMLAnchorElement>();
  const reversed = index % 2 === 1;

  return (
    <motion.a
      ref={ref}
      href={ctaHref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeUp}
      className={`group flex flex-col md:flex-row items-center gap-6 md:gap-10 py-8 md:py-10 ${
        reversed ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="w-full md:w-1/2 aspect-[16/10] overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="w-full md:w-1/2">
        <span className="font-mono text-[11px] text-accent uppercase font-bold tracking-widest">
          Proje {pad(index + 1)}/{pad(total)}
        </span>
        <h3 className="font-display text-2xl md:text-3xl font-extrabold text-navy mt-2 mb-4 group-hover:text-accent-deep transition-colors">
          {item.name}
        </h3>
        <span className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-navy/60 group-hover:text-accent-deep transition-colors">
          İncele <span aria-hidden="true">→</span>
        </span>
      </div>
    </motion.a>
  );
}

/**
 * V5: Alternating Industrial Strips — the Stitch pattern picked specifically for the
 * Projeler section: full-width rows alternating image-left/text-right and
 * text-left/image-right. Kept separate from BentoGrid (Kategoriler's V2 tessellation)
 * and ProductSpotlight (Ürünler's V3 rotating spotlight) so each picked pattern stays
 * visually distinct per section.
 */
export function ProjectStrips({
  items,
  title,
  ctaLabel,
  ctaHref = "#",
  eyebrow,
}: {
  items: StripItem[];
  title: string;
  ctaLabel: string;
  ctaHref?: string;
  eyebrow?: string;
}) {
  return (
    <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
      {eyebrow && (
        <span className="block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-deep mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold tracking-tight text-navy mb-10 md:mb-14">
        {title}
      </h2>

      <div className="flex flex-col divide-y divide-navy/10">
        {items.map((item, i) => (
          <Strip key={item.name} item={item} index={i} total={items.length} ctaHref={ctaHref} />
        ))}
      </div>

      <div className="mt-10 md:mt-14">
        <Button href={ctaHref} variant="outline">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
