import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { heroReveal, staggerChildren, staggerItem } from "../motion/variants";
import { Button } from "../ui/Button";
import type { HeroSlide } from "../content/home";
import type { Lang } from "../content/types";

const SLIDE_LABEL: Record<Lang, string> = { tr: "Slayt", en: "Slide", de: "Folie", ar: "شريحة" };

export function Hero({
  slides,
  seoH1,
  seoDescription,
  catalogLabel,
  catalogHref,
  callLabel,
  callHref,
  lang,
}: {
  slides: HeroSlide[];
  seoH1: string;
  seoDescription: string;
  catalogLabel: string;
  catalogHref: string;
  callLabel: string;
  callHref: string;
  lang: Lang;
}) {
  const [active, setActive] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(id);
  }, [slides.length, shouldReduceMotion]);

  return (
    <>
      <motion.section
        className="relative h-screen min-h-[640px] overflow-hidden bg-navy-deep"
        initial="hidden"
        animate="visible"
        variants={heroReveal}
      >
        {slides.map((slide, i) => (
          <div
            key={slide.src}
            className="absolute inset-0 transition-opacity duration-[1100ms]"
            style={{ opacity: i === active ? 1 : 0 }}
          >
            <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(8,26,43,0.75)_100%)]" />
        <div className="absolute inset-0 bg-navy-deep/25" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative h-full flex flex-col items-center justify-center text-center px-6"
        >
          <motion.p
            variants={staggerItem}
            className="font-display text-[clamp(2.75rem,10vw,7rem)] leading-[0.9] font-extrabold uppercase tracking-tight text-white [text-shadow:0_4px_30px_rgba(8,26,43,0.55)]"
          >
            Every
            <br />
            Material
          </motion.p>
          <motion.div variants={staggerItem} className="mt-6 flex flex-col items-center">
            <p className="text-base md:text-lg text-onNavy-bright font-medium">{seoDescription}</p>
            <span className="mt-4 h-[2px] w-28 bg-accent" aria-hidden="true" />
          </motion.div>
          <motion.div variants={staggerItem} className="mt-10 flex flex-wrap gap-4 justify-center">
            <Button href={catalogHref} variant="solid">
              {catalogLabel}
            </Button>
            <Button href={callHref} variant="outline-light">
              {callLabel}
            </Button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce" aria-hidden="true">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="absolute bottom-8 end-8 flex z-10">
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              aria-label={`${SLIDE_LABEL[lang]} ${i + 1}`}
              onClick={() => setActive(i)}
              className="w-11 h-11 -mx-3.5 flex items-center justify-center"
            >
              <span
                className={`block w-2 h-2 rounded-full transition-colors ${
                  i === active ? "bg-accent" : "bg-white/40"
                }`}
              />
            </button>
          ))}
        </div>
      </motion.section>
      <section className="px-6 lg:px-10 pt-4 pb-1 text-center">
        <h1 className="text-[13px] font-medium text-[#8a97a8]">{seoH1}</h1>
      </section>
    </>
  );
}
