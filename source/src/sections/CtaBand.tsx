import { motion } from "framer-motion";
import { fadeUp } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";

/**
 * Accent Rail Variant — the Stitch pattern picked for this promo+CTA band: an
 * asymmetric 7/4 column split (light promo card / dark navy CTA card) joined by a
 * vertical accent rail with two connector nodes, replacing the previous plain
 * equal-width two-box layout.
 */
export function CtaBand({
  promoTitle,
  promoBody,
  promoBullets,
  promoImage,
  ctaTitle,
  ctaBody,
  phone,
  phoneHref,
}: {
  promoTitle: string;
  promoBody: string;
  promoBullets: { label: string; text: string }[];
  promoImage: string;
  ctaTitle: string;
  ctaBody: string;
  phone: string;
  phoneHref: string;
}) {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="py-14 max-w-[1400px] mx-auto px-6 lg:px-10">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={fadeUp}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-0 items-stretch"
      >
        <div className="lg:col-span-7 bg-white/70 backdrop-blur-md border border-navy/10 rounded-xl overflow-hidden flex flex-col shadow-xl">
          <div className="p-8 md:p-10 flex-grow flex flex-col justify-center">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-4 leading-tight">{promoTitle}</h2>
            <p className="text-[15px] leading-relaxed text-[#5b6b7d] mb-7">{promoBody}</p>
            <ul className="space-y-3.5">
              {promoBullets.map((b) => (
                <li key={b.label} className="flex items-start gap-3">
                  <span className="mt-0.5 w-5 h-5 shrink-0 rounded-full bg-accent/15 text-accent flex items-center justify-center text-[12px] font-bold">
                    ✓
                  </span>
                  <span className="text-[13.5px] leading-relaxed text-[#5b6b7d]">
                    <strong className="text-navy font-semibold">{b.label}</strong>: {b.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-56 md:h-64 w-full">
            <img src={promoImage} alt={promoTitle} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>
        </div>

        <div className="hidden lg:flex lg:col-span-1 flex-col items-center justify-center relative w-full">
          <div className="absolute w-px h-[70%] bg-gradient-to-b from-transparent via-accent/40 to-transparent" />
          <span className="relative z-10 w-7 h-7 rounded-full bg-white border-[3px] border-accent flex items-center justify-center shadow-[0_0_15px_rgba(254,107,0,0.3)] mb-20">
            <span className="w-2 h-2 bg-navy rounded-full" />
          </span>
          <span className="relative z-10 w-7 h-7 rounded-full bg-white border-[3px] border-accent flex items-center justify-center shadow-[0_0_15px_rgba(254,107,0,0.3)] mt-20">
            <span className="w-2 h-2 bg-navy rounded-full" />
          </span>
        </div>

        <div className="lg:col-span-4 relative bg-navy-deep rounded-xl overflow-hidden flex flex-col justify-center p-8 md:p-10 shadow-xl">
          <motion.div
            className="absolute top-0 end-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -me-32 -mt-32 pointer-events-none"
            animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.08, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <h2 className="relative font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-tight">{ctaTitle}</h2>
          <p className="relative text-onNavy text-sm leading-relaxed mb-8">{ctaBody}</p>
          <motion.a
            href={phoneHref}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="relative inline-flex items-center justify-center gap-3 bg-accent-deep hover:bg-accent-deepHover text-white rounded-full px-6 py-4 text-lg font-bold w-full transition-colors"
          >
            ☎ {phone}
          </motion.a>
        </div>
      </motion.div>
    </section>
  );
}
