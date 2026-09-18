import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { CATEGORY_SLUGS, HIDDEN_FROM_NAV_SLUGS } from "../content/productCategoryContent";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";

export function SiteFooter({ lang }: { lang: Lang }) {
  const { ref, isInView } = useScrollReveal(0.15);
  const c = siteContent[lang];
  const visibleCategories = c.nav.categories
    .map((name, i) => ({ name, slug: CATEGORY_SLUGS[i] }))
    .filter((cat) => !HIDDEN_FROM_NAV_SLUGS.has(cat.slug));
  return (
    <footer className="relative overflow-hidden rounded-t-[40px] sm:rounded-t-[56px] text-onNavy pt-14">
      {/* Real product-sketch texture (the same blueprint-style illustration used behind
          the Kategoriler hero on the live site) as the base — visible in the gaps between
          the three glass cards below, per the picked "Split Column Glass Footer" variant. */}
      <div className="absolute inset-0 bg-navy-deep">
        <img
          src="/assets/img/footer-sketch-bg.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-deep/55 via-navy/60 to-navy-deep/85" />
      </div>

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerChildren}
        className="relative max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-6 lg:px-10 pb-9"
      >
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.3)" }}
          transition={{ duration: 0.25 }}
          className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6"
        >
          <img src="/assets/images/every-material-logo-beyaz.png" alt="EveryMaterial" className="h-7 mb-3" />
          <p className="text-sm leading-relaxed text-onNavy-muted mb-4">{c.footer.description}</p>
          <a
            href={`/katalog-${lang}.html`}
            className="inline-flex items-center gap-2 bg-white/10 border border-white/15 rounded-lg px-4 py-3 text-sm font-bold text-white"
          >
            📖 {c.footer.catalogLink}
          </a>
        </motion.div>
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.3)" }}
          transition={{ duration: 0.25 }}
          className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6"
        >
          <h5 className="font-mono text-xs font-bold uppercase tracking-wide text-white mb-4">
            {c.footer.categoriesTitle}
          </h5>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {visibleCategories.map(({ name, slug }) => (
              <li key={name}>
                <a href={`/kategoriler-${lang}.html?slug=${slug}`} className="text-sm hover:text-accent">
                  {name}
                </a>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
          variants={staggerItem}
          whileHover={{ y: -4, borderColor: "rgba(255,255,255,0.3)" }}
          transition={{ duration: 0.25 }}
          className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-6"
        >
          <h5 className="font-mono text-xs font-bold uppercase tracking-wide text-white mb-4">
            {c.footer.contactTitle}
          </h5>
          <p className="text-sm mb-2.5">
            <span className="text-onNavy-faint">{c.footer.addressLabel}</span> {c.footer.address}
          </p>
          <p className="text-sm mb-2.5">
            <span className="text-onNavy-faint">{c.footer.phoneLabel}</span>{" "}
            <a href={c.contact.phoneHref}>{c.contact.phone}</a>
          </p>
          <p className="text-sm">
            <span className="text-onNavy-faint">{c.footer.emailLabel}</span>{" "}
            <a href={`mailto:${c.contact.email}`}>{c.contact.email}</a>
          </p>
        </motion.div>
      </motion.div>
      <div className="relative max-w-[1400px] mx-auto flex flex-wrap justify-between items-center gap-3 px-6 lg:px-10 pb-8 text-xs text-onNavy-faint">
        <span>{c.footer.copyright}</span>
        <div className="flex gap-5">
          <a href={`/kvkk-${lang}.html`}>{c.footer.kvkk}</a>
          <a href={`/cerez-politikasi-${lang}.html`}>{c.footer.cookie}</a>
        </div>
      </div>
    </footer>
  );
}
