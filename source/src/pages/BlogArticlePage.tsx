import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { blogContent, blogArticleContent } from "../content/blog";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { homeHref, type Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

/**
 * Faz 3g: the one real Blog article ("Pleksi Kutu Nasıl Üretilir?"). Reuses the standard
 * navy-hero page pattern (same as ProjectDetailAhsapStandlarPage) rather than its own Stitch
 * round, since it's a single long-form real article, not a new page layout to explore.
 * Sidebar "Kategoriler" reuses the real filter-chip labels from the Blog listing (the source
 * site never had real per-post category tagging, so these are shown as plain labels, not links).
 * Related products have real names/images but no matching real detail page, so they render
 * as plain (non-link) cards.
 */
export function BlogArticlePage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const list = blogContent[lang];
  const c = blogArticleContent[lang];
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/blogdetay-pleksi-kutu-nasil-uretilir-${l}.html`;
  }

  const recentPosts = list.posts.slice(0, 4);
  const whatsappHref = `https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappText)}`;

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="blog" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-16 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1200px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted flex-wrap">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">{c.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <a href={`/blog-${lang}.html`} className="hover:text-white transition-colors">{c.breadcrumbBlog}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-white">{c.tag}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4 max-w-3xl leading-tight">{c.title}</h1>
          <time className="font-mono text-xs uppercase tracking-widest text-onNavy-muted">{c.date}</time>
        </div>
      </section>

      <main className="max-w-[1200px] mx-auto px-6 lg:px-10 py-12 md:py-16">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="rounded-3xl overflow-hidden shadow-xl mb-14 -mt-24 md:-mt-32 relative z-10 max-h-[480px]"
        >
          <motion.img variants={staggerItem} src={c.heroImage} alt={c.title} className="w-full h-full object-cover max-h-[480px]" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <motion.article
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="lg:col-span-8"
          >
            <motion.p variants={staggerItem} className="text-lg leading-relaxed text-navy font-semibold mb-10">
              {c.lead}
            </motion.p>

            {c.blocks.map((block, i) => {
              if (block.type === "h2") {
                return (
                  <motion.h2 key={i} variants={staggerItem} className="font-display text-xl md:text-2xl font-extrabold text-navy mt-10 mb-4 uppercase tracking-tight">
                    {block.text}
                  </motion.h2>
                );
              }
              if (block.type === "h3") {
                return (
                  <motion.h3 key={i} variants={staggerItem} className="font-display text-lg font-bold text-navy mt-8 mb-3">
                    {block.text}
                  </motion.h3>
                );
              }
              return (
                <motion.p key={i} variants={staggerItem} className="text-[15px] leading-relaxed text-[#5b6b7d] mb-5">
                  {block.text}
                </motion.p>
              );
            })}

            <motion.blockquote variants={staggerItem} className="my-12 bg-navy-deep rounded-3xl p-8 md:p-10 relative">
              <p className="text-white text-[15px] leading-relaxed italic mb-4">{c.quoteText}</p>
              <cite className="not-italic font-mono text-xs uppercase tracking-widest text-accent">{c.quoteCite}</cite>
            </motion.blockquote>

            {c.related.length > 0 && (
              <motion.section variants={staggerItem}>
                <h3 className="font-display text-xl font-bold text-navy mb-6">{c.relatedTitle}</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                  {c.related.map((name) => (
                    <div key={name} className="bg-white border border-navy/10 rounded-2xl p-4 flex items-center justify-center text-center">
                      <span className="font-display text-[13px] font-bold text-navy leading-tight">{name}</span>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </motion.article>

          <aside className="lg:col-span-4 flex flex-col gap-8">
            <div className="bg-white border border-navy/10 rounded-2xl p-6">
              <h4 className="font-display text-sm font-bold text-navy uppercase tracking-wide mb-4">{c.sideRecentTitle}</h4>
              <div className="flex flex-col gap-3">
                {recentPosts.map((p) => (
                  <div key={p.slug} className="flex items-center gap-3">
                    <img src={p.image} alt={p.title} className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <span className="text-[13px] font-semibold text-navy leading-tight line-clamp-2">{p.title}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-navy-deep rounded-2xl p-7 text-center">
              <h4 className="font-display text-base font-bold text-white mb-3">{c.sideCtaTitle}</h4>
              <p className="text-[13px] text-onNavy-muted leading-relaxed mb-6">{c.sideCtaBody}</p>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
                onClick={trackWhatsAppContact}
                className="inline-block bg-accent-deep hover:bg-accent-deepHover text-white text-sm font-bold uppercase tracking-widest rounded-lg px-6 py-3.5 transition-colors w-full"
              >
                {c.sideCtaBtn}
              </a>
            </div>

            <div className="bg-white border border-navy/10 rounded-2xl p-6">
              <h4 className="font-display text-sm font-bold text-navy uppercase tracking-wide mb-4">{c.sideCatsTitle}</h4>
              <div className="flex flex-wrap gap-2">
                {list.filters.map((f) => (
                  <span key={f} className="rounded-full px-3.5 py-1.5 text-[12px] font-semibold bg-accent/10 text-accent-deep">
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
