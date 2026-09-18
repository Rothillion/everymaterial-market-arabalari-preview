import { motion } from "framer-motion";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { ProjectTeaser } from "../content/home";

export function FeaturedProjectSpotlight({
  title,
  eyebrow,
  heroProject,
  detailProject,
  promoTitle,
  promoBody,
  promoBullet,
}: {
  title: string;
  eyebrow?: string;
  heroProject: ProjectTeaser;
  detailProject: ProjectTeaser;
  promoTitle: string;
  promoBody: string;
  promoBullet: { label: string; text: string };
}) {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-16 md:py-28 max-w-[1440px] mx-auto px-6 lg:px-10 relative overflow-hidden">
      {eyebrow && (
        <span className="block font-mono text-xs font-semibold uppercase tracking-[0.3em] text-accent-deep mb-3">
          {eyebrow}
        </span>
      )}
      <h2 className="font-display text-4xl md:text-6xl font-extrabold uppercase leading-[0.95] text-navy mb-14">
        {title}
      </h2>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 relative"
      >
        <motion.div variants={staggerItem} className="md:col-span-8 relative z-10">
          <div className="group relative aspect-[16/9] overflow-hidden rounded-lg bg-[#f2f5f8]">
            <img
              src={heroProject.image}
              alt={heroProject.name}
              className={`w-full h-full ${heroProject.imageFit === "cover" ? "object-cover" : "object-contain"} transition-transform duration-1000 group-hover:scale-105`}
              style={{ objectPosition: heroProject.imagePosition ?? "center" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 to-transparent flex items-end p-8">
              <h3 className="text-white text-2xl md:text-3xl font-display font-bold uppercase">{heroProject.name}</h3>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={staggerItem}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="md:col-span-4 md:absolute md:top-1/4 md:-end-2 z-20"
        >
          <div className="bg-navy-deep p-7 md:p-8 text-white rounded-lg shadow-2xl md:max-w-sm">
            <h4 className="text-xl font-display font-bold uppercase mb-4">{promoTitle}</h4>
            <p className="text-onNavy-muted text-sm leading-relaxed mb-5">{promoBody}</p>
            <p className="text-[13px] leading-relaxed mb-2">
              <strong className="text-accent">{promoBullet.label}:</strong>{" "}
              <span className="text-onNavy-muted">{promoBullet.text}</span>
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={staggerItem}
          whileHover={{ scale: 1.03 }}
          transition={{ duration: 0.3 }}
          className="md:col-span-5 md:-mt-20 relative z-30"
        >
          <div className="aspect-square overflow-hidden rounded-lg border-8 border-white bg-[#f2f5f8] shadow-2xl">
            <img
              src={detailProject.image}
              alt={detailProject.name}
              className={`w-full h-full ${detailProject.imageFit === "cover" ? "object-cover" : "object-contain"}`}
              style={{ objectPosition: detailProject.imagePosition ?? "center" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
