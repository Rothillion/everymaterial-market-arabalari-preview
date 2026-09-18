/** Site's one real dönüşüm signal (META-ADS-RULES.md §1) — call from every WhatsApp CTA. */
export function trackWhatsAppContact() {
  window.fbq?.("track", "Contact");
  window.ttq?.track("Contact");
}
