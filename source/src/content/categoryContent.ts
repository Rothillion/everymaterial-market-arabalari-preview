import type { Localized } from "./types";

export interface CategoryChrome {
  trustPoints: string[];
}

/**
 * Real 3-item trust strip per in-scope family, ported from .deploy/full-metal-*.html and
 * full-plastic-*.html (Faz 3d). Only the 2 families with a real CategoryPage exist here.
 */
export const categoryContent: Localized<Record<string, CategoryChrome>> = {
  tr: {
    "metal-yuk-tasima": { trustPoints: ["Galvaniz Kaplı Çelik Gövde", "25L – 210L Kapasite Aralığı", "Tüm Modellerde 4 Yönlü Teker"] },
    "alisveris-arabalari": { trustPoints: ["PP GFR30 Takviyeli Gövde", "25L – 150L Kapasite Aralığı", "Tüm Modellerde 4 Yönlü Teker"] },
  },
  en: {
    "metal-yuk-tasima": { trustPoints: ["Galvanised Steel Body", "25L – 210L Capacity Range", "4-Way Casters on Every Model"] },
    "alisveris-arabalari": { trustPoints: ["PP GFR30 Reinforced Body", "25L – 150L Capacity Range", "4-Way Casters on Every Model"] },
  },
  de: {
    "metal-yuk-tasima": { trustPoints: ["Verzinkter Stahlkorpus", "25L – 210L Kapazitätsbereich", "4-Wege-Rollen bei jedem Modell"] },
    "alisveris-arabalari": { trustPoints: ["PP-GFR30-verstärkter Korpus", "25L – 150L Kapazitätsbereich", "4-Wege-Rollen bei jedem Modell"] },
  },
  ar: {
    "metal-yuk-tasima": { trustPoints: ["جسم فولاذي مجلفن", "نطاق سعة 25 – 210 لتر", "عجلات رباعية الاتجاه في كل طراز"] },
    "alisveris-arabalari": { trustPoints: ["جسم مقوى بـ PP GFR30", "نطاق سعة 25 – 150 لتر", "عجلات رباعية الاتجاه في كل طراز"] },
  },
};
