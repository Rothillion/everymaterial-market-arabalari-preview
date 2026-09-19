import { useEffect, useMemo, useState } from "react";
import { siteContent } from "../content/site";
import { projectsContent, type Project } from "../content/projects";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// Radial positions (desktop only) for the 7 real product-based projects, indices 0-6.
const RADIAL_POSITIONS = [
  { top: "40px", side: "end", offset: "13%" },
  { top: "380px", side: "end", offset: "9%" },
  { top: "720px", side: "end", offset: "16%" },
  { top: "100px", side: "start", offset: "13%" },
  { top: "440px", side: "start", offset: "7%" },
  { top: "760px", side: "start", offset: "13%" },
  { top: "940px", side: "start", offset: "41%" },
];

function Hexagon({
  project,
  size,
  label,
  viewLabel,
  style,
  lang,
}: {
  project: Project;
  size: "large" | "small";
  label: string;
  viewLabel: string;
  style?: React.CSSProperties;
  lang: Lang;
}) {
  const dims = size === "large" ? "w-[280px] h-[320px] md:w-[360px] md:h-[416px]" : "w-[170px] h-[196px] md:w-[220px] md:h-[254px]";
  const Tag = project.hasDetail ? "a" : "div";
  const content = (
    <>
      <img
        src={project.image}
        alt={project.name}
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ${
          project.hasDetail ? "group-hover:scale-110" : ""
        }`}
      />
      <div
        className="absolute inset-0 flex flex-col justify-end items-center text-center p-5 pb-8"
        style={{ background: "linear-gradient(to top, rgba(10,31,51,0.92) 0%, rgba(10,31,51,0.35) 55%, transparent 100%)" }}
      >
        <span className="bg-accent-deep text-white text-[10px] font-mono font-bold px-3 py-1.5 rounded-full uppercase tracking-wide mb-3 shadow-md">
          {label}
        </span>
        <h3 className="font-display text-white text-sm md:text-base font-bold leading-tight px-2">{project.name}</h3>
        {project.hasDetail && (
          <span className="mt-2 font-mono text-[10px] uppercase tracking-widest text-accent">
            {viewLabel} <span className="rtl:inline-block rtl:rotate-180">→</span>
          </span>
        )}
      </div>
    </>
  );
  return (
    <Tag
      href={project.hasDetail ? `/proje-${project.slug}-${lang}.html` : undefined}
      className={`group relative block ${dims} bg-white shadow-lg transition-transform duration-500 border-[6px] border-white/70 ${
        project.hasDetail ? "cursor-pointer hover:scale-105" : "cursor-default"
      }`}
      style={{ clipPath: HEX_CLIP, ...style }}
    >
      {content}
    </Tag>
  );
}

/**
 * Faz 3f: Projeler — "Radial Hexagons" variant picked from 5 rounds of Stitch exploration
 * (25 variants total), ported into the light Cinematic Industrial system. Real content:
 * 2 store-based + 7 product-based real projects; only "Ahşap Standlar" links to a real
 * detail page since it's the only one with real gallery content.
 */
export function ProjectsPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const c = projectsContent[lang];
  const [filter, setFilter] = useState<"all" | "store" | "product">("all");
  const isRTL = site.meta.dir === "rtl";

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/projeler-${l}.html`;
  }

  const storeProjects = useMemo(() => c.projects.filter((p) => p.group === "store"), [c]);
  const productProjects = useMemo(() => c.projects.filter((p) => p.group === "product"), [c]);

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="projects" onLangChange={navigateToLang} />

      <main className="pt-32 pb-24 px-6 lg:px-10 relative overflow-hidden">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <nav className="flex items-center justify-center gap-2 mb-4 font-mono text-xs uppercase tracking-[0.2em] text-[#5b6b7d]">
            <a href="/" className="hover:text-accent-deep transition-colors">{c.breadcrumbHome}</a>
            <span className="opacity-50" aria-hidden="true">/</span>
            <span className="text-accent-deep font-bold">{c.breadcrumbCurrent}</span>
          </nav>
          <h1 className="font-display text-4xl md:text-5xl font-extrabold text-navy mb-4">{c.pageTitle}</h1>
          <p className="text-base text-[#5b6b7d] leading-relaxed">{c.heroLead}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2.5 mb-16">
          {(["all", "store", "product"] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`px-6 py-3 rounded-full text-[13px] font-bold uppercase tracking-wide transition-colors ${
                filter === f ? "bg-accent-deep text-white shadow-md" : "bg-white/80 backdrop-blur-sm border border-navy/10 text-navy hover:border-accent"
              }`}
            >
              {f === "all" ? c.filterAll : f === "store" ? c.filterStore : c.filterProduct}
            </button>
          ))}
        </div>

        {/* Desktop radial layout */}
        <div className="relative w-full max-w-[1400px] mx-auto hidden md:block" style={{ minHeight: filter === "store" ? "480px" : "1100px" }}>
          {(filter === "all" || filter === "store") && (
            <div className="absolute start-1/2 -translate-x-1/2 rtl:translate-x-1/2 top-0 flex flex-col items-center gap-8 z-20">
              {storeProjects.map((p) => (
                <Hexagon key={p.slug} project={p} size="large" label={c.tagStore} viewLabel={c.viewProjectLabel} lang={lang} />
              ))}
            </div>
          )}
          {(filter === "all" || filter === "product") && (
            <div className="absolute inset-0">
              {productProjects.map((p, i) => {
                const pos = RADIAL_POSITIONS[i % RADIAL_POSITIONS.length];
                const sideProp = isRTL ? (pos.side === "end" ? "left" : "right") : pos.side === "end" ? "right" : "left";
                return (
                  <div key={p.slug} className="absolute" style={{ top: pos.top, [sideProp]: pos.offset }}>
                    <Hexagon project={p} size="small" label={c.tagProduct} viewLabel={c.viewProjectLabel} lang={lang} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Mobile fallback: stacked flex columns */}
        <div className="md:hidden flex flex-col items-center gap-8">
          {(filter === "all" || filter === "store") && (
            <div className="flex flex-col items-center gap-8">
              {storeProjects.map((p) => (
                <Hexagon key={p.slug} project={p} size="large" label={c.tagStore} viewLabel={c.viewProjectLabel} lang={lang} />
              ))}
            </div>
          )}
          {(filter === "all" || filter === "product") && (
            <div className="flex flex-col items-center gap-6">
              {productProjects.map((p) => (
                <Hexagon key={p.slug} project={p} size="small" label={c.tagProduct} viewLabel={c.viewProjectLabel} lang={lang} />
              ))}
            </div>
          )}
        </div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
