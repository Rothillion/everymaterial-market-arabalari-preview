import { motion } from "framer-motion";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";

export function HowWeWork({
  title,
  paragraphs,
  workImage,
  sloganImage,
  sloganText,
  eyebrow,
}: {
  title: string;
  paragraphs: string[];
  workImage: string;
  sloganImage: string;
  sloganText: string;
  eyebrow?: string;
}) {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="pt-16 pb-32 md:pt-28 md:pb-72 max-w-[1440px] mx-auto px-6 lg:px-10 overflow-visible">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 items-center"
      >
        <motion.div variants={staggerItem} className="md:col-span-5">
          {eyebrow && (
            <span className="block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-deep mb-3">
              {eyebrow}
            </span>
          )}
          <h2 className="font-display text-4xl md:text-5xl font-extrabold uppercase leading-[0.95] text-navy mb-6">
            {title}
          </h2>
          <p className="text-[15.5px] leading-relaxed text-[#5b6b7d] max-w-md">{paragraphs[0]}</p>
        </motion.div>

        <div className="md:col-span-7 relative mt-8 md:mt-0">
          <motion.div
            variants={staggerItem}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="relative z-20 w-4/5 ms-auto aspect-square overflow-hidden rounded-lg shadow-2xl"
          >
            <img src={workImage} alt="EveryMaterial üretim ve showroom" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            variants={staggerItem}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
            className="absolute top-1/2 -start-2 md:-start-10 z-30 w-3/5 aspect-[4/5] overflow-hidden rounded-lg shadow-2xl border-4 border-white"
          >
            <img src={sloganImage} alt="Every Material" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            variants={staggerItem}
            className="absolute -bottom-8 end-4 md:end-10 z-10 w-1/2 md:w-2/5 bg-accent-deep p-5 md:p-6 flex items-end rounded-md shadow-xl"
          >
            <p className="text-white font-display font-bold uppercase leading-tight text-sm md:text-base">
              {sloganText}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
