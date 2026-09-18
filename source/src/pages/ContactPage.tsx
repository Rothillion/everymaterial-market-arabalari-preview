import { useEffect, useState, type FormEvent } from "react";
import { siteContent } from "../content/site";
import { contactContent } from "../content/contact";
import type { Lang } from "../content/types";
import { SiteHeader } from "../sections/SiteHeader";
import { SiteFooter } from "../sections/SiteFooter";
import { WhatsAppButton } from "../ui/WhatsAppButton";
import { ScrollProgress } from "../ui/ScrollProgress";

const CLIP_NAVY_LTR = "polygon(0 0, 55% 0, 40% 100%, 0 100%)";
const CLIP_NAVY_RTL = "polygon(100% 0, 45% 0, 60% 100%, 100% 100%)";
const CLIP_SEAM_LTR = "polygon(55% 0, calc(55% + 4px) 0, calc(40% + 4px) 100%, 40% 100%)";
const CLIP_SEAM_RTL = "polygon(45% 0, calc(45% - 4px) 0, calc(60% - 4px) 100%, 60% 100%)";

function InfoRow({ index, label, value, href }: { index: string; label: string; value: string; href?: string }) {
  const Tag = href ? "a" : "p";
  return (
    <div className="flex items-start gap-4">
      <span className="font-mono text-xs font-bold tracking-widest text-accent mt-1 shrink-0">[{index}]</span>
      <div>
        <h3 className="font-mono text-[11px] uppercase tracking-widest text-onNavy-muted mb-1">{label}</h3>
        <Tag
          href={href}
          dir={href?.startsWith("tel:") ? "ltr" : undefined}
          className="font-display text-lg font-semibold text-white hover:text-accent transition-colors leading-snug"
        >
          {value}
        </Tag>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  placeholder,
  type,
  required = true,
}: {
  id: string;
  label: string;
  placeholder: string;
  type: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[11px] uppercase tracking-widest text-[#5b6b7d]">
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full bg-transparent border-0 border-b-2 border-navy/15 rounded-none px-0 py-2.5 text-[15px] text-navy focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  );
}

/**
 * Faz 3h: İletişim — "Futuristic Contact: Diagonal Split" variant picked from a 5-variant
 * Stitch round, ported into the real navy/accent tokens. Real content: form field labels,
 * placeholders and success message from .deploy/iletisim-{lang}.html; phone/email/address
 * reused from site.ts rather than duplicated. The form has no real backend (the original
 * site never had one either — same client-only "message received" behavior is preserved).
 */
export function ContactPage({ lang }: { lang: Lang }) {
  const site = siteContent[lang];
  const c = contactContent[lang];
  const isRTL = site.meta.dir === "rtl";
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.documentElement.dir = site.meta.dir;
    document.documentElement.lang = site.meta.htmlLang;
  }, [site.meta.dir, site.meta.htmlLang]);

  function navigateToLang(l: Lang) {
    window.location.href = `/iletisim-${l}.html`;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleMessageInput(e: FormEvent<HTMLTextAreaElement>) {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }

  return (
    <div className="bg-[#fbfcfe] min-h-screen">
      <ScrollProgress />
      <SiteHeader lang={lang} activePage="contact" onLangChange={navigateToLang} />

      <section className="relative overflow-hidden min-h-[85vh] flex pt-20 pb-16">
        <div className="absolute inset-x-0 top-0 bottom-16 bg-navy-deep lg:hidden" aria-hidden="true" />
        <div
          className="absolute inset-x-0 top-0 bottom-16 bg-navy-deep hidden lg:block"
          style={{ clipPath: isRTL ? CLIP_NAVY_RTL : CLIP_NAVY_LTR }}
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 top-0 bottom-16 bg-accent hidden lg:block"
          style={{ clipPath: isRTL ? CLIP_SEAM_RTL : CLIP_SEAM_LTR }}
          aria-hidden="true"
        />

        <div className="relative z-10 w-full max-w-[1300px] mx-auto flex flex-col lg:flex-row px-6 lg:px-10 py-16 lg:py-24 gap-12 lg:gap-0">
          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:pe-16">
            <nav className="flex items-center gap-2 mb-8 font-mono text-xs uppercase tracking-[0.2em] text-onNavy-muted">
              <a href="/" className="hover:text-white transition-colors">{c.breadcrumbHome}</a>
              <span className="opacity-50" aria-hidden="true">/</span>
              <span className="text-white">{c.breadcrumbCurrent}</span>
            </nav>
            <h1 className="font-display text-3xl md:text-5xl font-extrabold text-white mb-5">{c.pageTitle}</h1>
            <p className="text-base text-onNavy-bright max-w-md mb-12 leading-relaxed">{c.heroLead}</p>

            <div className="flex flex-col gap-8">
              <InfoRow index="01" label={c.phoneLabel} value={site.contact.phone} href={site.contact.phoneHref} />
              <InfoRow index="02" label={c.emailLabel} value={site.contact.email} href={`mailto:${site.contact.email}`} />
              <InfoRow index="03" label={c.addressLabel} value={site.footer.address} />
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center lg:ps-16">
            <div className="w-full max-w-lg bg-white/95 backdrop-blur-md border border-navy/10 rounded-2xl shadow-2xl p-8 md:p-10">
              <h2 className="font-display text-xl font-bold text-navy mb-8">{c.formTitle}</h2>
              {!submitted ? (
                <form className="flex flex-col gap-7" onSubmit={handleSubmit}>
                  <Field id="fullName" label={c.labelName} placeholder={c.placeholderName} type="text" />
                  <Field id="email" label={c.labelEmail} placeholder={c.placeholderEmail} type="email" />
                  <Field id="phone" label={c.labelPhone} placeholder={c.placeholderPhone} type="tel" required={false} />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-mono text-[11px] uppercase tracking-widest text-[#5b6b7d]">
                      {c.labelMessage}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      placeholder={c.placeholderMessage}
                      onInput={handleMessageInput}
                      className="w-full bg-transparent border-0 border-b-2 border-navy/15 rounded-none px-0 py-2.5 text-[15px] text-navy focus:outline-none focus:border-accent transition-colors resize-none overflow-y-auto max-h-72"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <button
                      type="submit"
                      className="w-full sm:w-auto bg-accent-deep hover:bg-accent-deepHover text-white font-bold text-sm uppercase tracking-widest px-8 py-3.5 rounded-lg transition-colors"
                    >
                      {c.submitLabel}
                    </button>
                    <p className="font-mono text-[11px] text-[#5b6b7d] text-center sm:text-end max-w-[220px]">
                      🔒 {c.recaptchaText}
                    </p>
                  </div>
                </form>
              ) : (
                <div className="text-center py-6">
                  <div className="w-14 h-14 rounded-full bg-accent/10 text-accent-deep flex items-center justify-center text-2xl font-bold mx-auto mb-4">✓</div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">{c.successTitle}</h3>
                  <p className="text-sm text-[#5b6b7d]">{c.successBody}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <SiteFooter lang={lang} />
      <WhatsAppButton lang={lang} />
    </div>
  );
}
