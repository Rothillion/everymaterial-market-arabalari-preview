import { useState } from "react";
import { motion } from "framer-motion";
import { useScrollReveal } from "../motion/useScrollReveal";
import { Button } from "./Button";

export interface OrbitItem {
  name: string;
  image: string;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * V7: Vertical Accordion Stack — the Stitch pattern picked to replace the circular
 * orbit: real project photos as vertical bars in a row, one expanded at a time (click,
 * hover, or focus) to reveal the full photo + name, the rest collapse to a narrow strip
 * with the name running sideways. Only real data (name + photo) is shown.
 */
export function ProjectOrbit({
  items,
  title,
  ctaLabel,
  ctaHref = "#",
  eyebrow,
}: {
  items: OrbitItem[];
  title: string;
  ctaLabel: string;
  ctaHref?: string;
  eyebrow?: string;
}) {
  const { ref, isInView } = useScrollReveal();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-6 lg:px-10">
      {eyebrow && (
        <span className="block text-center font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-deep mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="text-center font-display text-3xl md:text-[2.5rem] font-extrabold tracking-tight text-navy mb-10 md:mb-14">
        {title}
      </h2>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex gap-2 md:gap-3 h-[420px] md:h-[480px] overflow-x-auto md:overflow-visible rounded-xl"
      >
        {items.map((item, i) => {
          const isActive = activeIndex === i;
          return (
            <motion.button
              key={item.name}
              type="button"
              onMouseEnter={() => setActiveIndex(i)}
              onFocus={() => setActiveIndex(i)}
              onClick={() => setActiveIndex(i)}
              aria-label={item.name}
              aria-current={isActive}
              animate={{ flexGrow: isActive ? 8 : 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative shrink-0 basis-16 min-w-16 md:min-w-20 h-full overflow-hidden rounded-lg text-start focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <img
                src={item.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                  isActive ? "brightness-100" : "brightness-[0.55] grayscale"
                }`}
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t transition-opacity duration-300 ${
                  isActive ? "from-navy-deep/90 via-navy-deep/10 to-transparent opacity-100" : "opacity-0"
                }`}
              />

              <span className="absolute top-3 start-3 md:top-4 md:start-4 font-mono text-[11px] font-bold uppercase tracking-widest text-white/90">
                {pad(i + 1)}
              </span>

              {isActive ? (
                <span className="absolute start-4 end-4 bottom-4 md:start-6 md:end-6 md:bottom-6">
                  <span className="block font-mono text-[11px] font-bold uppercase tracking-widest text-accent mb-1">
                    Proje {pad(i + 1)}
                  </span>
                  <span className="block font-display text-xl md:text-2xl font-extrabold text-white leading-tight">
                    {item.name}
                  </span>
                </span>
              ) : (
                <span className="absolute inset-0 top-9 md:top-10 flex items-end justify-center pb-4 md:pb-5">
                  <span
                    className="font-display text-xs md:text-sm font-bold uppercase tracking-wide text-white/90 rotate-180"
                    style={{ writingMode: "vertical-rl" }}
                  >
                    {item.name}
                  </span>
                </span>
              )}
            </motion.button>
          );
        })}
      </motion.div>

      <div className="mt-10 md:mt-14 text-center">
        <Button href={ctaHref} variant="outline">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
