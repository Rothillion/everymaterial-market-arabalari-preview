import { useEffect, useState } from "react";
import { animate, motion, useReducedMotion } from "framer-motion";
import { fadeUp } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";

export interface StatementStat {
  value: string;
  label: string;
}

/** Counts up from 0 to the stat's real numeric value once it scrolls into view. */
function CountUpStat({ value, isInView }: { value: string; isInView: boolean }) {
  const target = parseInt(value, 10);
  const suffix = value.replace(/^-?[0-9]+/, "");
  const shouldReduceMotion = useReducedMotion();
  const [display, setDisplay] = useState(shouldReduceMotion || Number.isNaN(target) ? target : 0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion || Number.isNaN(target)) return;
    const controls = animate(0, target, {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, shouldReduceMotion]);

  if (Number.isNaN(target)) return <>{value}</>;
  return (
    <>
      {display}
      {suffix}
    </>
  );
}

/** Full-bleed accent-orange rhythm-break band with a brand statement and real, data-derived stats. */
export function StatementBand({ text, stats }: { text: string; stats: StatementStat[] }) {
  const { ref, isInView } = useScrollReveal();

  return (
    <section
      className="relative bg-accent-deep py-20 md:py-32 overflow-hidden"
      style={{ clipPath: "polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%)" }}
    >
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="max-w-[1440px] mx-auto px-6 lg:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
      >
        <p className="font-display text-2xl md:text-4xl font-extrabold uppercase tracking-tight text-white leading-[1.05]">
          {text}
        </p>
        <div className="grid grid-cols-2 gap-8">
          {stats.map((stat) => (
            <div key={stat.label}>
              <span className="block font-display text-4xl font-extrabold text-white mb-1">
                <CountUpStat value={stat.value} isInView={isInView} />
              </span>
              <span className="text-xs uppercase tracking-widest text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
