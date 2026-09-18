import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { catalogContent } from "../content/catalog";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

/**
 * Faz 3c: real 62-product, 5-family catalog. Family filter tabs show one family
 * at a time (matches the real .deploy/katalog-{lang}.html's own toggle behavior)
 * rather than a scroll-to-section — simplest faithful port of the real page.
 */
export function CatalogPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const catalog = catalogContent[lang];
  const [activeFamily, setActiveFamily] = useState(0);
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/katalog-${l}.html`;
  }

  const family = catalog.families[activeFamily];
  const globalStartIndex = catalog.families.slice(0, activeFamily).reduce((sum, f) => sum + f.products.length, 0);

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="catalog" onLangChange={navigateToLang} />

      <section className="pt-32 pb-10 px-6 lg:px-10 bg-navy-deep">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-onNavy-muted mb-3">
            <a href="/" className="hover:text-white transition-colors">
              {catalog.breadcrumbHome}
            </a>
            <span className="text-onNavy-faint" aria-hidden="true">
              /
            </span>
            <span className="text-white font-semibold">{catalog.breadcrumbCurrent}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">{catalog.pageTitle}</h1>
          <p className="text-base text-onNavy-bright max-w-xl leading-relaxed mb-6">{catalog.heroLead}</p>
          <div className="flex gap-8 flex-wrap">
            {catalog.stats.map((stat) => (
              <div key={stat.label}>
                <span className="block font-display text-2xl font-extrabold text-white">{stat.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-widest text-onNavy-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <div role="tablist" className="flex flex-wrap gap-2.5 mb-12">
          {catalog.families.map((f, i) => (
            <button
              key={f.slug}
              type="button"
              role="tab"
              aria-selected={i === activeFamily}
              onClick={() => setActiveFamily(i)}
              className={`rounded-full px-5 py-3 text-[13px] font-bold transition-colors ${
                i === activeFamily
                  ? "bg-accent-deep text-white"
                  : "bg-white border border-navy/15 text-[#5b6b7d] hover:border-accent hover:text-accent-deep"
              }`}
            >
              {f.name}
            </button>
          ))}
        </div>

        <motion.div key={family.slug} ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={staggerChildren}>
          <div className="flex flex-wrap items-end justify-between gap-4 max-w-[1200px] mb-7">
            <div className="max-w-[820px]">
              <h2 className="font-display text-2xl font-extrabold text-navy mb-2.5">{family.name}</h2>
              <p className="text-[15px] leading-relaxed text-[#5b6b7d]">{family.description}</p>
            </div>
            <a
              href={`/kategori-${lang}.html?aile=${family.slug}`}
              className="shrink-0 font-mono text-xs font-bold uppercase tracking-widest text-accent-deep hover:text-accent-deepHover transition-colors"
            >
              {family.name} →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {family.products.map((p, i) => {
              return (
              <motion.a
                key={p.name}
                variants={staggerItem}
                href={`/urun-${lang}.html?slug=${p.slug}`}
                className="group bg-white/70 backdrop-blur-md border border-navy/10 hover:border-accent/40 rounded-xl overflow-hidden shadow-md flex flex-col transition-colors"
              >
                <div className="aspect-[4/3] bg-white/60 flex items-center justify-center overflow-hidden">
                  <img src={p.image} alt={p.alt} loading="lazy" className="w-full h-full object-contain p-2.5" />
                </div>
                <div className="grid grid-cols-3 text-center text-[10px] uppercase tracking-wide text-[#5b6b7d] border-t border-navy/10 py-2">
                  {p.widthCm != null && <span>{p.widthCm} cm</span>}
                  {p.lengthCm != null && <span>{p.lengthCm} cm</span>}
                  {p.heightCm != null && <span>{p.heightCm} cm</span>}
                </div>
                <div className="p-4 flex-1 flex flex-col gap-1.5 border-t border-navy/10">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-widest text-[#5b6b7d]">
                    {pad(globalStartIndex + i + 1)}
                  </span>
                  <h3 className="font-display text-[15px] font-bold text-navy leading-tight mb-1">{p.name}</h3>
                  <div className="flex flex-col text-[12.5px] text-[#5b6b7d]">
                    <div className="flex justify-between border-b border-navy/10 py-1.5">
                      <span>Hacim</span>
                      <span className="font-semibold text-navy">{p.volumeLabel}</span>
                    </div>
                    <div className="flex justify-between border-b border-navy/10 py-1.5">
                      <span>Malzeme</span>
                      <span className="font-semibold text-navy">{p.material}</span>
                    </div>
                    <div className="flex justify-between py-1.5">
                      <span>Üretim</span>
                      <span className="font-semibold text-navy">{p.origin}</span>
                    </div>
                  </div>
                  {p.colors && (
                    <div className="flex justify-between text-[12.5px] border-t border-navy/10 pt-1.5">
                      <span className="text-[#5b6b7d]">Renk</span>
                      <span className="font-semibold text-navy text-end">{p.colors}</span>
                    </div>
                  )}
                  {p.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-bold tracking-wide text-accent-deep bg-accent/10 rounded px-1.5 py-0.5"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.a>
              );
            })}
          </div>

          <div className="overflow-x-auto rounded-xl border border-navy/10 bg-white/60 backdrop-blur-md mb-16">
            <table className="w-full text-[13px] whitespace-nowrap">
              <thead>
                <tr className="border-b border-navy/10">
                  <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">No</th>
                  <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">Ürün</th>
                  <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">Hacim</th>
                  <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">Genişlik</th>
                  <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">Uzunluk</th>
                  <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">Yükseklik</th>
                  <th className="text-start font-mono text-[11px] uppercase tracking-wide text-[#5b6b7d] font-bold px-4 py-3">Malzeme</th>
                </tr>
              </thead>
              <tbody>
                {family.products.map((p, i) => (
                  <tr key={p.name} className="border-b border-navy/5 last:border-0 hover:bg-accent/5">
                    <td className="px-4 py-3 text-navy">{pad(globalStartIndex + i + 1)}</td>
                    <td className="px-4 py-3 text-navy font-semibold">{p.name}</td>
                    <td className="px-4 py-3 text-navy">{p.volumeLabel}</td>
                    <td className="px-4 py-3 text-navy">{p.widthCm != null ? `${p.widthCm} cm` : "—"}</td>
                    <td className="px-4 py-3 text-navy">{p.lengthCm != null ? `${p.lengthCm} cm` : "—"}</td>
                    <td className="px-4 py-3 text-navy">{p.heightCm != null ? `${p.heightCm} cm` : "—"}</td>
                    <td className="px-4 py-3 text-navy">{p.material}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        <section>
          <h2 className="font-display text-2xl font-extrabold text-navy mb-6">{catalog.certSectionTitle}</h2>
          <div className="flex flex-col gap-3">
            {catalog.certificates.map((cert) => (
              <div
                key={cert.certNo}
                className="flex items-center gap-4 bg-white/70 backdrop-blur-md border border-navy/10 rounded-xl p-4 md:p-5"
              >
                <span
                  className="shrink-0 w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center text-lg"
                  aria-hidden="true"
                >
                  📄
                </span>
                <div className="flex-1 min-w-0">
                  <h4 className="font-display text-sm font-bold text-navy mb-0.5">{cert.title}</h4>
                  <p className="text-[13px] text-[#5b6b7d]">{cert.subtitle}</p>
                </div>
                <span className="shrink-0 font-mono text-[12.5px] font-semibold text-accent-deep bg-accent/10 rounded-md px-3 py-1.5">
                  {cert.certNo}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[12.5px] text-[#5b6b7d] leading-relaxed max-w-[80ch] mt-4">{catalog.certNote}</p>
        </section>

        <div className="mt-14 bg-navy-deep rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-2">{catalog.ctaTitle}</h3>
            <p className="text-sm text-onNavy-muted max-w-md">{catalog.ctaBody}</p>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              onClick={trackWhatsAppContact}
              className="bg-accent-deep hover:bg-accent-deepHover text-white text-sm font-bold uppercase tracking-wide rounded-lg px-6 py-3.5 transition-colors"
            >
              {catalog.ctaButton}
            </a>
            <a href={site.contact.phoneHref} className="text-white font-bold text-sm hover:text-accent transition-colors">
              {site.contact.phone}
            </a>
          </div>
        </div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
