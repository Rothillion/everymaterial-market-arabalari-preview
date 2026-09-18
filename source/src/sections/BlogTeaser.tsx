import { useRef, useState, type UIEvent } from "react";
import { motion } from "framer-motion";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { BlogPost } from "../content/home";
import type { Lang } from "../content/types";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * V6: Magazine Strip — the Stitch pattern picked for Son Yazılar: a single horizontal
 * row of equal-width cards (native scroll/drag, no fake carousel JS), a numbered index
 * above each card (echoes ProjectStrips' "01/09" convention), and a scroll-linked
 * progress line beneath the row instead of dot pagination.
 */
export function BlogTeaser({
  posts,
  title,
  ctaLabel,
  ctaHref,
  eyebrow,
  readMoreLabel,
  lang,
}: {
  posts: BlogPost[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
  readMoreLabel: string;
  lang: Lang;
}) {
  const { ref, isInView } = useScrollReveal();
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  function handleScroll(e: UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const max = el.scrollWidth - el.clientWidth;
    // In RTL, current browsers report scrollLeft as 0 at rest and negative as the
    // user scrolls toward the reading end, so Math.abs() keeps the 0→1 progression
    // matching DOM order (same meaning as LTR) instead of going negative.
    setScrollProgress(max > 0 ? Math.abs(el.scrollLeft) / max : 0);
  }

  return (
    <section className="py-16 md:py-24 max-w-[1440px] mx-auto">
      <div className="px-6 lg:px-10 flex items-end justify-between gap-6 mb-10 md:mb-14">
        <div>
          {eyebrow && (
            <span className="block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-deep mb-3">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-3xl md:text-[2.5rem] font-extrabold tracking-tight text-navy">
            {title}
          </h2>
        </div>
        <a
          href={ctaHref}
          className="shrink-0 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest text-navy/60 hover:text-accent-deep transition-colors pb-1"
        >
          {ctaLabel} <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
        </a>
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerChildren}
      >
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-2 px-6 lg:px-10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posts.map((post, i) => (
            <motion.a
              key={post.title}
              href={post.slug ? `/blogdetay-${post.slug}-${lang}.html` : ctaHref}
              variants={staggerItem}
              className="group flex-none w-[85%] sm:w-[320px] md:w-[360px] snap-start"
            >
              <span className="font-mono text-[11px] text-accent uppercase font-bold tracking-widest">
                {pad(i + 1)}
              </span>
              <div className="aspect-[16/10] overflow-hidden rounded-lg mt-2">
                <img
                  src={post.image}
                  alt={post.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="pt-4 flex flex-col gap-2">
                <span className="text-[11.5px] font-mono font-semibold text-[#8a97a8]">{post.date}</span>
                <h3 className="font-display text-[15px] font-bold text-navy leading-snug group-hover:text-accent-deep transition-colors">
                  {post.title}
                </h3>
                <span className="text-xs font-bold text-accent-deep">
                  {readMoreLabel} <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
                </span>
              </div>
            </motion.a>
          ))}
        </div>

        <div className="mx-6 lg:mx-10 mt-6 h-[2px] bg-navy/10 rounded-full overflow-hidden" aria-hidden="true">
          <div
            className="h-full bg-accent-deep transition-[width] duration-100"
            style={{ width: `${Math.max(scrollProgress * 100, 6)}%` }}
          />
        </div>
      </motion.div>
    </section>
  );
}
