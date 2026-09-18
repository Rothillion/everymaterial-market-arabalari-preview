import { motion } from "framer-motion";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import type { TeamMember } from "../content/home";

/**
 * V4: Split-Pane Technical Grid — the Stitch pattern picked for Uzman Ekibimiz. Each
 * card's left half is a dedicated photo pane (currently filled with an initials
 * monogram placeholder, since no real employee photos exist yet — see
 * [[everymaterial-project-status]] memory) sized and framed so a real photo can be
 * dropped in later with no layout changes. Right half is an info pane that reveals
 * phone/email/language details on hover.
 */
export function TeamTeaser({
  members,
  title,
  ctaLabel,
  ctaHref,
  eyebrow,
}: {
  members: TeamMember[];
  title: string;
  ctaLabel: string;
  ctaHref: string;
  eyebrow?: string;
}) {
  const { ref, isInView } = useScrollReveal();

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
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {members.map((m) => (
          <motion.div
            key={m.email}
            variants={staggerItem}
            className="group grid grid-cols-2 h-[280px] border border-navy/10 rounded-lg overflow-hidden"
          >
            <div className="relative flex items-center justify-center bg-[#f1f5f9] transition-colors duration-500 group-hover:bg-navy-deep">
              <span className="font-display text-4xl font-bold text-navy/20 group-hover:text-accent transition-colors duration-500">
                {m.initials}
              </span>
            </div>
            <div className="flex flex-col justify-between p-6 bg-white border-l border-navy/10 transition-transform duration-500 group-hover:translate-x-[6%]">
              <div>
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.1em] text-accent-deep mb-1">
                  {m.role}
                </p>
                <h3 className="font-display text-lg font-bold text-navy leading-tight">{m.name}</h3>
              </div>
              <div className="opacity-0 -translate-x-2 transition-all duration-300 delay-100 group-hover:opacity-100 group-hover:translate-x-0 space-y-2">
                <a href={m.phoneHref} className="block text-[12px] font-mono text-navy">
                  ☎ {m.phone}
                </a>
                <a href={`mailto:${m.email}`} className="block text-[12px] font-mono text-navy truncate">
                  ✉ {m.email}
                </a>
                <div className="flex gap-1 pt-1">
                  {m.langs.map((l) => (
                    <Badge key={l}>{l}</Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <div className="mt-10 md:mt-14 flex justify-center">
        <Button href={ctaHref} variant="outline">
          {ctaLabel}
        </Button>
      </div>
    </section>
  );
}
