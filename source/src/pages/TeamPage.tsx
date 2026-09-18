import { useEffect } from "react";
import { motion } from "framer-motion";
import { siteContent } from "../content/site";
import { teamContent } from "../content/team";
import { staggerChildren, staggerItem } from "../motion/variants";
import { useScrollReveal } from "../motion/useScrollReveal";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";
import { trackWhatsAppContact } from "../lib/analytics";

/**
 * Faz 3b: second non-homepage page, same static multi-page pattern as AboutPage
 * (entry-team-{lang}.tsx). Full 5-member roster (the homepage teaser only shows 4;
 * Bedirhan Kavraş is real-data-only here).
 */
export function TeamPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const team = teamContent[lang];
  const { ref, isInView } = useScrollReveal();

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/team-${l}.html`;
  }

  return (
    <div className="bg-gradient-to-b from-[#fbfcfe] via-[#eef4fb] to-[#d9e6f5] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="team" onLangChange={navigateToLang} />

      <section className="pt-32 pb-16 md:pb-20 px-6 lg:px-10 bg-navy-deep">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-center gap-2 text-sm text-onNavy-muted mb-3">
            <a href="/" className="hover:text-white transition-colors">
              {team.breadcrumbHome}
            </a>
            <span className="text-onNavy-faint" aria-hidden="true">
              /
            </span>
            <span className="text-white font-semibold">{team.breadcrumbCurrent}</span>
          </div>
          <h1 className="font-display text-3xl md:text-4xl font-extrabold text-white mb-4">{team.pageTitle}</h1>
          <p className="text-base text-onNavy-bright max-w-xl leading-relaxed">{team.heroLead}</p>
        </div>
      </section>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-10 py-16 md:py-20">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerChildren}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {team.members.map((member) => (
            <motion.div
              key={member.email}
              variants={staggerItem}
              className="bg-white/70 backdrop-blur-md border border-navy/10 rounded-2xl overflow-hidden text-center shadow-lg"
            >
              <div className="aspect-square flex items-center justify-center bg-navy-deep">
                <span className="font-display text-3xl font-bold text-accent tracking-wide">{member.initials}</span>
              </div>
              <div className="p-5">
                <h3 className="font-display text-[15px] font-bold text-navy mb-0.5">{member.name}</h3>
                <p className="text-xs font-semibold uppercase tracking-wide text-[#5b6b7d] mb-3">{member.role}</p>
                <div className="flex flex-col gap-1 text-[12.5px] text-navy mb-3">
                  <a href={member.phoneHref} className="hover:text-accent-deep transition-colors">
                    {member.phone}
                  </a>
                  <a href={`mailto:${member.email}`} className="hover:text-accent-deep transition-colors break-all">
                    {member.email}
                  </a>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {member.langs.map((l) => (
                    <span
                      key={l}
                      className="text-[10px] font-bold tracking-wide text-accent-deep bg-accent/10 rounded px-1.5 py-0.5"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerItem}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-14 bg-navy-deep rounded-2xl p-8 md:p-10 flex flex-wrap items-center justify-between gap-6"
        >
          <div>
            <h3 className="font-display text-xl font-bold text-white mb-2">{team.ctaTitle}</h3>
            <p className="text-sm text-onNavy-muted max-w-md">{team.ctaBody}</p>
          </div>
          <div className="flex items-center gap-5 flex-wrap">
            <a
              href={`https://wa.me/${site.contact.whatsappNumber}?text=${encodeURIComponent(site.contact.whatsappText)}`}
              target="_blank"
              rel="noreferrer"
              onClick={trackWhatsAppContact}
              className="bg-accent-deep hover:bg-accent-deepHover text-white text-sm font-bold uppercase tracking-wide rounded-lg px-6 py-3.5 transition-colors"
            >
              {team.ctaButton}
            </a>
            <a href={site.contact.phoneHref} className="text-white font-bold text-sm hover:text-accent transition-colors">
              {site.contact.phone}
            </a>
          </div>
        </motion.div>
      </main>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
