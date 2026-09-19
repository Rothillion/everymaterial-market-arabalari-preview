import { useEffect } from "react";
import { siteContent } from "../content/site";
import { homeContent, sectionChrome } from "../content/home";
import { CATEGORY_SLUGS, HIDDEN_FROM_NAV_SLUGS } from "../content/productCategoryContent";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { Hero } from "../sections/Hero";
import { CategoryGrid } from "../sections/CategoryGrid";
import { FeaturedProducts } from "../sections/FeaturedProducts";
import { HowWeWork } from "../sections/HowWeWork";
import { CtaBand } from "../sections/CtaBand";
import { TeamTeaser } from "../sections/TeamTeaser";
import { ProjectsTeaser } from "../sections/ProjectsTeaser";
import { BlogTeaser } from "../sections/BlogTeaser";
import { StatementBand } from "../sections/StatementBand";
import { FeaturedProjectSpotlight } from "../sections/FeaturedProjectSpotlight";
import { ScrollProgress } from "../ui/ScrollProgress";

/**
 * Faz 2: every section — header/footer/nav/contact (site.ts) and body content
 * (home.ts) — renders in the active `lang`, all 4 locales real. Also flips
 * `document.documentElement.dir`/`lang` so Arabic renders RTL end-to-end.
 */
export function HomePage({ lang, onLangChange }: { lang: Lang; onLangChange: (lang: Lang) => void }) {
  const site = siteContent[lang];
  const home = homeContent[lang];
  const chrome = sectionChrome[lang];
  const visibleCategories = home.categories
    .map((category, i) => ({ ...category, href: `/kategoriler-${lang}.html?slug=${CATEGORY_SLUGS[i]}` }))
    .filter((_, i) => !HIDDEN_FROM_NAV_SLUGS.has(CATEGORY_SLUGS[i]));

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="home" onLangChange={onLangChange} />
      <Hero
        slides={home.heroSlides}
        seoH1={home.seo.h1}
        seoDescription={home.seo.description}
        catalogLabel={site.footer.catalogLink}
        catalogHref={`/katalog-${lang}.html`}
        callLabel={site.nav.callButton}
        callHref={site.contact.phoneHref}
      />
      <CategoryGrid
        categories={visibleCategories}
        title={chrome.categoriesTitle}
        ctaLabel={chrome.categoriesCta}
        ctaHref={`/katalog-${lang}.html`}
        eyebrow={chrome.categoriesEyebrow}
        dir={site.meta.dir}
      />
      <FeaturedProducts
        products={home.featuredProducts}
        title={chrome.productsTitle}
        ctaLabel={chrome.productsCta}
        ctaHref={`/katalog-${lang}.html`}
        eyebrow={chrome.productsEyebrow}
        dir={site.meta.dir}
      />
      <StatementBand
        text={home.howWeWork.sloganText}
        stats={[
          { value: String(visibleCategories.length), label: chrome.statCategoriesLabel },
          { value: String(home.team.length), label: chrome.statTeamLabel },
        ]}
      />
      <HowWeWork title={chrome.howWeWorkTitle} eyebrow={chrome.howWeWorkEyebrow} {...home.howWeWork} />
      <FeaturedProjectSpotlight
        title={chrome.featuredProjectTitle}
        eyebrow={chrome.featuredProjectEyebrow}
        heroProject={home.projects[0]}
        detailProject={home.projects[1]}
        promoTitle={home.ctaBand.promoTitle}
        promoBody={home.ctaBand.promoBody}
        promoBullet={home.ctaBand.promoBullets[0]}
      />
      <TeamTeaser
        members={home.team}
        title={chrome.teamTitle}
        ctaLabel={chrome.teamCta}
        ctaHref={`/team-${lang}.html`}
        eyebrow={chrome.teamEyebrow}
      />
      <ProjectsTeaser
        projects={home.projects}
        title={chrome.projectsTitle}
        ctaLabel={chrome.projectsCta}
        ctaHref={`/projeler-${lang}.html`}
        eyebrow={chrome.projectsEyebrow}
      />
      <CtaBand {...home.ctaBand} phone={site.contact.phone} phoneHref={site.contact.phoneHref} />
      <BlogTeaser
        posts={home.blogPosts}
        title={chrome.blogTitle}
        ctaLabel={chrome.blogCta}
        ctaHref={`/blog-${lang}.html`}
        eyebrow={chrome.blogEyebrow}
        readMoreLabel={chrome.blogReadMore}
        lang={lang}
      />
      <SiteFooter lang={lang} />
    </div>
  );
}
