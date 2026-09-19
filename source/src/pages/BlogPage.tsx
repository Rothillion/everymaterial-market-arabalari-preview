import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { blogContent, blogArticleContent, type BlogPost, type BlogCategory } from "../content/blog";

const FILTER_CATEGORIES: (BlogCategory | "all")[] = ["all", "guide", "decoration", "pet"];
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import { homeHref, type Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

function FeaturedCard({ post, lang, readMoreLabel, excerpt }: { post: BlogPost; lang: Lang; readMoreLabel: string; excerpt: string | null }) {
  const Tag = post.hasDetail ? "a" : "div";
  return (
    <Tag
      href={post.hasDetail ? `/blogdetay-${post.slug}-${lang}.html` : undefined}
      className="group relative flex flex-col md:flex-row items-start md:items-center"
    >
      <div className="w-full md:w-2/3 relative h-72 md:h-96 overflow-hidden rounded-3xl">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${post.hasDetail ? "group-hover:scale-105" : ""}`}
        />
      </div>
      <div
        className={`w-[92%] md:w-1/2 self-center bg-white border border-navy/10 rounded-3xl p-7 md:p-9 flex flex-col justify-center relative z-10 -mt-14 md:mt-0 md:-ms-20 shadow-xl transition-colors ${
          post.hasDetail ? "group-hover:border-accent/40" : ""
        }`}
      >
        <time className="font-mono text-[11px] uppercase tracking-widest text-[#5b6b7d] mb-3">{post.date}</time>
        <h2 className="font-display text-xl md:text-2xl font-extrabold text-navy mb-4 leading-tight">{post.title}</h2>
        {excerpt && <p className="text-sm text-[#5b6b7d] leading-relaxed mb-6 line-clamp-3">{excerpt}</p>}
        {post.hasDetail && (
          <span className="inline-flex items-center gap-1.5 text-accent-deep font-bold text-sm mt-auto">
            {readMoreLabel} <span className="rtl:rotate-180">→</span>
          </span>
        )}
      </div>
    </Tag>
  );
}

function PostCard({ post, lang, readMoreLabel }: { post: BlogPost; lang: Lang; readMoreLabel: string }) {
  const Tag = post.hasDetail ? motion.a : motion.div;
  return (
    <Tag
      variants={staggerItem}
      href={post.hasDetail ? `/blogdetay-${post.slug}-${lang}.html` : undefined}
      className="group relative flex flex-col"
    >
      <div className="w-full relative h-56 overflow-hidden rounded-3xl bg-white/60">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full h-full object-cover transition-transform duration-500 ${post.hasDetail ? "group-hover:scale-105" : ""}`}
        />
      </div>
      <div
        className={`w-[90%] self-center bg-white border border-navy/10 rounded-2xl p-5 flex flex-col flex-grow relative z-10 -mt-10 shadow-lg transition-colors ${
          post.hasDetail ? "group-hover:border-accent/40" : ""
        }`}
      >
        <time className="font-mono text-[10px] uppercase tracking-widest text-[#5b6b7d] mb-2">{post.date}</time>
        <h3 className="font-display text-base font-bold text-navy mb-2.5 leading-tight line-clamp-2">{post.title}</h3>
        {post.excerpt && <p className="text-[13px] text-[#5b6b7d] leading-relaxed mb-4 line-clamp-3">{post.excerpt}</p>}
        {post.hasDetail && (
          <span className="inline-flex items-center gap-1.5 text-accent-deep font-bold text-[13px] mt-auto w-fit">
            {readMoreLabel} <span className="rtl:rotate-180">→</span>
          </span>
        )}
      </div>
    </Tag>
  );
}

/**
 * Faz 3g: Blog listing — "Overlapping Elements" variant picked from a 5-variant Stitch
 * round, ported into the light Cinematic Industrial system with soft rounded corners per
 * the user's request. Real content: 15 real posts (title/date/image/excerpt), only
 * "Pleksi Kutu Nasıl Üretilir?" has a real article, so it's used as the featured card and
 * is the only clickable post; the other 14 render as plain (non-link) cards.
 */
export function BlogPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const c = blogContent[lang];
  const { ref, isInView } = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState(0);

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/blog-${l}.html`;
  }

  const activeCategory = FILTER_CATEGORIES[activeFilter];
  const filteredPosts = activeCategory === "all" ? c.posts : c.posts.filter((p) => p.category === activeCategory);
  const featured = filteredPosts.find((p) => p.hasDetail) ?? filteredPosts[0];
  const rest = featured ? filteredPosts.filter((p) => p.slug !== featured.slug) : [];
  const featuredExcerpt = featured?.excerpt ?? blogArticleContent[lang].lead;

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="blog" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-16 px-6 lg:px-10">
        <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-accent rounded-full blur-[160px] -me-40 -mt-40" />
        </div>
        <div className="max-w-[1400px] mx-auto relative z-10">
          <nav className="flex items-center gap-3 mb-6 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted">
            <a href={homeHref(lang)} className="hover:text-white transition-colors">{c.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-white">{c.breadcrumbCurrent}</span>
          </nav>
          <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-4">{c.pageTitle}</h1>
          <p className="text-base text-onNavy-bright max-w-xl leading-relaxed">{c.heroLead}</p>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-14 md:py-20">
        <div className="flex flex-wrap gap-2.5 mb-16">
          {c.filters.map((f, i) => (
            <button
              key={f}
              type="button"
              onClick={() => setActiveFilter(i)}
              className={`rounded-full px-5 py-2.5 text-[13px] font-bold transition-colors ${
                i === activeFilter
                  ? "bg-accent-deep text-white shadow-md"
                  : "bg-white border border-navy/15 text-[#5b6b7d] hover:border-accent hover:text-accent-deep"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {featured && (
          <>
            <FeaturedCard post={featured} lang={lang} readMoreLabel={c.readMoreLabel} excerpt={featuredExcerpt} />

            <motion.div
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={staggerChildren}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14 mt-16"
            >
              {rest.map((p) => (
                <PostCard key={p.slug} post={p} lang={lang} readMoreLabel={c.readMoreLabel} />
              ))}
            </motion.div>
          </>
        )}
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
