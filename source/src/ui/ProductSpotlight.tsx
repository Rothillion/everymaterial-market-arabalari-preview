import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";

export interface SpotlightItem {
  name: string;
  image: string;
  imageFit?: "contain" | "cover";
  imagePosition?: string;
}

const SHOW_PRODUCT_LABEL: Record<Lang, string> = { tr: "Ürünü göster", en: "Show product", de: "Produkt anzeigen", ar: "عرض المنتج" };
const PREV_LABEL: Record<Lang, string> = { tr: "Önceki ürün", en: "Previous product", de: "Vorheriges Produkt", ar: "المنتج السابق" };
const NEXT_LABEL: Record<Lang, string> = { tr: "Sonraki ürün", en: "Next product", de: "Nächstes Produkt", ar: "المنتج التالي" };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/** Shortest signed distance from `active` to `index`, wrapping around the ends. */
function wrappedOffset(index: number, active: number, length: number) {
  let diff = index - active;
  const half = length / 2;
  if (diff > half) diff -= length;
  if (diff <= -half) diff += length;
  return diff;
}

const STEP_PX = 140;
const MAX_VISIBLE_OFFSET = 3;
const SPRING = { type: "spring" as const, stiffness: 260, damping: 32, mass: 0.9 };

/**
 * V9: Infinite Coverflow Reel — every item stays mounted in the stack; only its
 * offset-from-active (x/scale/opacity) animates via Motion's `animate` prop. Nothing
 * remounts on next/prev (no AnimatePresence swap), so there's no flash of the container
 * background and no abrupt size jump — the whole stack springs continuously. Offsets
 * wrap circularly (see wrappedOffset) so the reel has no dead end on either side.
 */
export function ProductSpotlight({
  items,
  title,
  ctaLabel,
  ctaHref = "#",
  eyebrow,
  dir = "ltr",
  lang,
}: {
  items: SpotlightItem[];
  title: string;
  ctaLabel: string;
  ctaHref?: string;
  eyebrow?: string;
  dir?: "ltr" | "rtl";
  lang: Lang;
}) {
  const { ref, isInView } = useScrollReveal();
  const [active, setActive] = useState(0);
  // x is a physical CSS transform (translateX), which doesn't auto-mirror under
  // dir="rtl" the way logical Tailwind classes do — flip the sign so "next" still
  // advances toward the reading end instead of always moving visually rightward.
  const directionSign = dir === "rtl" ? -1 : 1;

  function go(delta: number) {
    setActive((prev) => (prev + delta + items.length) % items.length);
  }

  return (
    <section
      ref={ref}
      className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 lg:px-10 text-center overflow-hidden"
    >
      {eyebrow && (
        <span className="block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-deep mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold tracking-tight text-navy mb-10 md:mb-14">
        {title}
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative"
      >
        {/* Stage: sized to exactly one (center) card, centered in the section. Every
            item below is `absolute inset-0` of this stage, so at offset 0 it lands
            perfectly centered with no manual -50% transform math needed. */}
        <div className="relative mx-auto h-[340px] sm:h-[440px] md:h-[540px] lg:h-[600px] aspect-[9/16]">
          {items.map((item, i) => {
            const offset = wrappedOffset(i, active, items.length);
            const abs = Math.abs(offset);
            const isCenter = offset === 0;
            const isHidden = abs > MAX_VISIBLE_OFFSET;
            const scale = Math.max(1 - abs * 0.18, 0.4);
            const opacity = isHidden ? 0 : Math.max(1 - abs * 0.3, 0);
            const imageFit = item.imageFit ?? "contain";
            const imagePosition = item.imagePosition ?? "center";

            return (
              <motion.div
                key={item.name}
                animate={{ x: offset * STEP_PX * directionSign, scale, opacity }}
                transition={SPRING}
                style={{ zIndex: 10 - abs, pointerEvents: isHidden ? "none" : undefined }}
                className="absolute inset-0 overflow-hidden rounded-2xl bg-[#f2f5f8] shadow-[0_20px_60px_-20px_rgba(20,40,65,.5)]"
              >
                <img
                  src={item.image}
                  alt={isCenter ? item.name : ""}
                  aria-hidden={!isCenter}
                  loading={isCenter ? undefined : "lazy"}
                  className={`absolute inset-0 w-full h-full ${imageFit === "cover" ? "object-cover" : "object-contain"}`}
                  style={{ filter: isCenter ? "none" : "brightness(0.5)", objectPosition: imagePosition }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/10 to-transparent"
                  style={{ opacity: isCenter ? 1 : 0.5 }}
                />

                {!isCenter && !isHidden && (
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`${SHOW_PRODUCT_LABEL[lang]}: ${item.name}`}
                    className="absolute inset-0"
                  />
                )}

                {isCenter && (
                  <>
                    <div className="absolute top-4 start-4 end-4 z-10 flex gap-1.5" aria-hidden="true">
                      {items.map((it, idx) => (
                        <span key={it.name} className="h-[3px] flex-1 rounded-full bg-white/25 overflow-hidden">
                          <span
                            className="block h-full bg-white transition-all duration-300"
                            style={{ width: idx <= active ? "100%" : "0%" }}
                          />
                        </span>
                      ))}
                    </div>

                    <div className="absolute start-5 end-5 bottom-5 flex items-end justify-between gap-3">
                      <div className="text-start">
                        <span className="block font-mono text-[11px] text-accent uppercase font-bold tracking-widest mb-1">
                          {pad(active + 1)}/{pad(items.length)}
                        </span>
                        <h3 className="font-display text-xl md:text-2xl font-extrabold text-white leading-tight">
                          {item.name}
                        </h3>
                      </div>
                      <a
                        href={ctaHref}
                        aria-label={ctaLabel}
                        className="shrink-0 w-11 h-11 rounded-full bg-accent-deep hover:bg-accent-deepHover text-white flex items-center justify-center transition-colors"
                      >
                        <span className="rtl:inline-block rtl:rotate-180">→</span>
                      </a>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </div>

        <button
          type="button"
          aria-label={PREV_LABEL[lang]}
          onClick={() => go(-1)}
          className="absolute start-2 md:start-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-navy/10 text-navy flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
        >
          <span className="inline-block rtl:rotate-180">‹</span>
        </button>
        <button
          type="button"
          aria-label={NEXT_LABEL[lang]}
          onClick={() => go(1)}
          className="absolute end-2 md:end-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white shadow-lg border border-navy/10 text-navy flex items-center justify-center hover:bg-accent hover:text-white transition-colors"
        >
          <span className="inline-block rtl:rotate-180">›</span>
        </button>
      </motion.div>
    </section>
  );
}
