import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { siteContent } from "../content/site";
import { CATEGORY_SLUGS, HIDDEN_FROM_NAV_SLUGS } from "../content/productCategoryContent";
import { homeHref, type Lang } from "../content/types";
import { Button } from "../ui/Button";
import { LanguageSwitcher } from "../ui/LanguageSwitcher";
import { trackWhatsAppContact } from "../lib/analytics";

type PageKey = "home" | "about" | "updates" | "team" | "export" | "projects" | "blog" | "contact" | "catalog" | "legal";

export function SiteHeader({
  lang,
  activePage,
  onLangChange,
}: {
  lang: Lang;
  activePage: PageKey;
  onLangChange: (lang: Lang) => void;
}) {
  const c = siteContent[lang];
  const whatsappHref = `https://wa.me/${c.contact.whatsappNumber}?text=${encodeURIComponent(c.contact.whatsappText)}`;
  const visibleCategories = c.nav.categories
    .map((name, i) => ({ name, slug: CATEGORY_SLUGS[i] }))
    .filter((cat) => !HIDDEN_FROM_NAV_SLUGS.has(cat.slug));
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [corporateOpen, setCorporateOpen] = useState(false);
  const categoriesRef = useRef<HTMLDivElement>(null);
  const corporateRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (categoriesRef.current && !categoriesRef.current.contains(e.target as Node)) setCategoriesOpen(false);
      if (corporateRef.current && !corporateRef.current.contains(e.target as Node)) setCorporateOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const navLinkClass = (key: PageKey) =>
    `text-[13px] font-semibold uppercase tracking-wide transition-colors pb-0.5 ${
      activePage === key
        ? "text-accent border-b-2 border-accent"
        : scrolled
          ? "text-navy/80 hover:text-accent-deep"
          : "text-white/85 hover:text-white"
    }`;

  const dropdownLabelClass = `text-[13px] font-semibold uppercase tracking-wide pb-0.5 ${
    scrolled ? "text-navy/80" : "text-white/85"
  }`;

  return (
    <>
    <header
      className={`fixed top-3 md:top-4 inset-x-0 mx-auto w-[95%] max-w-[1320px] z-50 rounded-xl border transition-colors duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-navy/10 shadow-lg"
          : "bg-navy-deep/70 backdrop-blur-md border-white/15"
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-5 py-3">
        <a href={homeHref(lang)} className="shrink-0">
          <img
            src={
              scrolled
                ? "/assets/img/logo/every-material-logo-2.png"
                : "/assets/images/every-material-logo-beyaz.png"
            }
            alt="EveryMaterial"
            className="h-7"
          />
        </a>
        <nav className="hidden lg:flex items-center gap-5">
          <a className={navLinkClass("home")} href={homeHref(lang)}>
            {c.nav.home}
          </a>
          <div ref={categoriesRef} className="relative group flex items-center h-full">
            <button
              type="button"
              onClick={() => setCategoriesOpen((v) => !v)}
              aria-expanded={categoriesOpen}
              className={`${dropdownLabelClass} cursor-pointer`}
            >
              {c.nav.categoriesLabel}
            </button>
            {/* pt-2 (not a margin) keeps the gap between trigger and panel inside this
                hoverable box, so the mouse doesn't fall out of :hover crossing it. */}
            <div className={`absolute top-full start-0 pt-2 min-w-[230px] ${categoriesOpen ? "block" : "hidden group-hover:block"}`}>
              <div className="bg-white border border-navy/10 rounded-lg shadow-xl p-2">
                {visibleCategories.map(({ name, slug }) => (
                  <a
                    key={name}
                    href={`/kategoriler-${lang}.html?slug=${slug}`}
                    onClick={() => setCategoriesOpen(false)}
                    className="block px-3 py-2 rounded-md text-sm text-navy hover:bg-accent/10 hover:text-accent-deep"
                  >
                    {name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div ref={corporateRef} className="relative group flex items-center h-full">
            <button
              type="button"
              onClick={() => setCorporateOpen((v) => !v)}
              aria-expanded={corporateOpen}
              className={`${dropdownLabelClass} cursor-pointer`}
            >
              {c.nav.corporateLabel}
            </button>
            <div className={`absolute top-full start-0 pt-2 min-w-[200px] ${corporateOpen ? "block" : "hidden group-hover:block"}`}>
              <div className="bg-white border border-navy/10 rounded-lg shadow-xl p-2">
                <a href={`/about-${lang}.html`} onClick={() => setCorporateOpen(false)} className="block px-3 py-2 rounded-md text-sm text-navy hover:bg-accent/10 hover:text-accent-deep">
                  {c.nav.about}
                </a>
                <a href={`/gelismeler-${lang}.html`} onClick={() => setCorporateOpen(false)} className="block px-3 py-2 rounded-md text-sm text-navy hover:bg-accent/10 hover:text-accent-deep">
                  {c.nav.updates}
                </a>
                <a href={`/team-${lang}.html`} onClick={() => setCorporateOpen(false)} className="block px-3 py-2 rounded-md text-sm text-navy hover:bg-accent/10 hover:text-accent-deep">
                  {c.nav.team}
                </a>
              </div>
            </div>
          </div>
          <a className={navLinkClass("export")} href={`/ihracat-danismanligi-${lang}.html`}>
            {c.nav.exportConsultancy}
          </a>
          <a className={navLinkClass("projects")} href={`/projeler-${lang}.html`}>
            {c.nav.projects}
          </a>
          <a className={navLinkClass("blog")} href={`/blog-${lang}.html`}>
            {c.nav.blog}
          </a>
          <a className={navLinkClass("contact")} href={`/iletisim-${lang}.html`}>
            {c.nav.contact}
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher lang={lang} onChange={onLangChange} dark={scrolled} />
          </div>
          <Button href={whatsappHref} target="_blank" rel="noreferrer" variant="solid" onClick={trackWhatsAppContact}>
            {c.nav.callButton}
          </Button>
          <button
            type="button"
            aria-label={c.nav.menuAria}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            onClick={() => setMobileOpen((v) => !v)}
            className={`lg:hidden flex flex-col justify-center items-center gap-1.5 w-10 h-10 shrink-0 rounded-md ${
              scrolled ? "text-navy" : "text-white"
            }`}
          >
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-6 bg-current transition-transform duration-300 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>
    </header>
    <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-nav-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden fixed inset-0 top-0 z-40 bg-navy-deep/98 backdrop-blur-md overflow-y-auto"
          >
            <div className="flex flex-col gap-1 px-6 pt-28 pb-10 max-w-md mx-auto">
              <a onClick={closeMobile} className="py-3 text-lg font-semibold uppercase tracking-wide text-white border-b border-white/10" href={homeHref(lang)}>
                {c.nav.home}
              </a>
              <div className="py-3 border-b border-white/10">
                <span className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-3">{c.nav.categoriesLabel}</span>
                <div className="flex flex-col gap-2.5">
                  {visibleCategories.map(({ name, slug }) => (
                    <a key={name} href={`/kategoriler-${lang}.html?slug=${slug}`} onClick={closeMobile} className="text-white/85 text-sm">
                      {name}
                    </a>
                  ))}
                </div>
              </div>
              <div className="py-3 border-b border-white/10">
                <span className="block text-xs uppercase tracking-[0.2em] text-white/50 mb-3">{c.nav.corporateLabel}</span>
                <div className="flex flex-col gap-2.5">
                  <a href={`/about-${lang}.html`} onClick={closeMobile} className="text-white/85 text-sm">
                    {c.nav.about}
                  </a>
                  <a href={`/gelismeler-${lang}.html`} onClick={closeMobile} className="text-white/85 text-sm">
                    {c.nav.updates}
                  </a>
                  <a href={`/team-${lang}.html`} onClick={closeMobile} className="text-white/85 text-sm">
                    {c.nav.team}
                  </a>
                </div>
              </div>
              <a onClick={closeMobile} className="py-3 text-lg font-semibold uppercase tracking-wide text-white border-b border-white/10" href={`/ihracat-danismanligi-${lang}.html`}>
                {c.nav.exportConsultancy}
              </a>
              <a onClick={closeMobile} className="py-3 text-lg font-semibold uppercase tracking-wide text-white border-b border-white/10" href={`/projeler-${lang}.html`}>
                {c.nav.projects}
              </a>
              <a onClick={closeMobile} className="py-3 text-lg font-semibold uppercase tracking-wide text-white border-b border-white/10" href={`/blog-${lang}.html`}>
                {c.nav.blog}
              </a>
              <a onClick={closeMobile} className="py-3 text-lg font-semibold uppercase tracking-wide text-white" href={`/iletisim-${lang}.html`}>
                {c.nav.contact}
              </a>
              <div className="mt-6 flex items-center gap-3">
                <LanguageSwitcher lang={lang} onChange={onLangChange} dark={false} />
                <Button
                  href={whatsappHref}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => {
                    trackWhatsAppContact();
                    closeMobile();
                  }}
                  variant="solid"
                >
                  {c.nav.callButton}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
    </AnimatePresence>
    </>
  );
}
