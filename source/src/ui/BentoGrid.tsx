import { motion } from "framer-motion";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { Button } from "./Button";

export interface BentoItem {
  name: string;
  image: string;
  href?: string;
}

const ROW_SIZE = 4;

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = [];
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size));
  return out;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function Tile({
  item,
  index,
  total,
  ctaHref,
  isFirstInRow,
  isRTL,
}: {
  item: BentoItem;
  index: number;
  total: number;
  ctaHref: string;
  isFirstInRow: boolean;
  isRTL: boolean;
}) {
  // clip-path polygons are physical (no logical/mirroring keyword exists), so the
  // diagonal cut is mirrored explicitly for RTL to keep facing the adjoining tile.
  const clipPath = isRTL
    ? isFirstInRow
      ? "polygon(100% 0%, 0% 0%, 15% 100%, 100% 100%)"
      : "polygon(85% 0%, 0% 0%, 15% 100%, 100% 100%)"
    : isFirstInRow
      ? "polygon(0% 0%, 100% 0%, 85% 100%, 0% 100%)"
      : "polygon(15% 0%, 100% 0%, 85% 100%, 0% 100%)";

  return (
    <motion.a
      href={item.href ?? ctaHref}
      variants={staggerItem}
      style={{
        clipPath,
        marginInlineStart: isFirstInRow ? undefined : "-7.5%",
      }}
      className="group relative block transition-all duration-300 hover:z-10 hover:scale-[1.02] border bg-white/70 border-navy/10 hover:border-accent"
    >
      <div className="h-[220px] md:h-[260px] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="w-full h-full object-cover grayscale contrast-125 opacity-80 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100 group-hover:opacity-100"
        />
      </div>
      <div className="px-6 md:px-8 pt-4 pb-6">
        <h3 className="font-display text-base md:text-lg font-black uppercase tracking-tight mb-2 text-navy">
          <span className="text-accent">{pad(index + 1)}.</span> <span>{item.name}</span>
        </h3>
        <div className="flex items-center gap-2">
          <span className="w-4 h-[2px] bg-accent" />
          <span className="font-mono text-[10px] text-accent uppercase font-bold tracking-widest">
            {pad(index + 1)}/{pad(total)}
          </span>
        </div>
      </div>
    </motion.a>
  );
}

/**
 * Diagonal parallelogram "tessellation" grid (V2: Diagonal Blueprint Tessellation,
 * the Stitch pattern picked specifically for the Kategoriler section): equal-size
 * overlapping diagonal-cut tiles in rows of four, grayscale-to-color on hover.
 * Kept single-purpose — FeaturedProducts uses ProductSpotlight (V3) and
 * ProjectsTeaser uses ProjectStrips (V5) instead of sharing this component, so
 * each picked Stitch pattern stays visually distinct per section.
 */
export function BentoGrid({
  items,
  title,
  ctaLabel,
  ctaHref = "#",
  eyebrow,
  dir = "ltr",
}: {
  items: BentoItem[];
  title: string;
  ctaLabel: string;
  ctaHref?: string;
  eyebrow?: string;
  dir?: "ltr" | "rtl";
}) {
  const { ref, isInView } = useScrollReveal();
  const rows = chunk(items, ROW_SIZE);
  const isRTL = dir === "rtl";

  return (
    <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 lg:px-10 overflow-hidden">
      {eyebrow && (
        <span className="block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-deep mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold tracking-tight text-navy mb-10 md:mb-14">
        {title}
      </h2>
      <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerChildren}>
        {rows.map((row, ri) => (
          <div key={row[0].name} className="grid grid-cols-2 md:grid-cols-4 py-6 md:py-10 px-4 md:px-6 rounded-lg">
            {row.map((item, ci) => (
              <Tile
                key={item.name}
                item={item}
                index={ri * ROW_SIZE + ci}
                total={items.length}
                ctaHref={ctaHref}
                isFirstInRow={ci === 0}
                isRTL={isRTL}
              />
            ))}
          </div>
        ))}
      </motion.div>
      <div className="mt-10 md:mt-14">
        <Button href={ctaHref} variant="outline">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
