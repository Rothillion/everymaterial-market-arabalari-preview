# EveryMaterial — Market Arabaları Önizleme Repo'su

Bu repo iki bölümden oluşur:

## 1. Kök dizin — Derlenmiş önizleme build'i
Repo kökündeki `*.html` dosyaları ve `assets/` klasörü, React/Vite frontend'in **derlenmiş (production build)** halidir.
175 ürünlü güncel katalog, 4 dil (TR/EN/AR/DE). Ürünler client-side render edilir; ürün verisi
`assets/productCatalogLookup-*.js` içinde tek pakette taşınır, bu yüzden ürün başına ayrı HTML dosyası yoktur —
bu normal bir Vite SPA build davranışıdır, eksik içerik değildir.

Local'de görüntülemek için repo köküne indirdiğiniz `SITEYI_AC.bat` dosyasına **çift tıklayın** —
otomatik olarak local sunucu başlatır ve siteyi tarayıcıda açar. (HTML dosyalarına doğrudan çift
tıklayarak açmayın: bu bir Vite/React build'i olduğu için `type="module"` script'ler kullanır ve
Chrome/Edge bunları `file://` üzerinden güvenlik (CORS) gereği tamamen engeller — bembeyaz sayfa
görürsünüz. `SITEYI_AC.bat` bu sorunu otomatik çözer.)

Terminalden manuel açmak isterseniz:
```
python -m http.server 8080
```

## 2. `source/` — Frontend kaynak kodu
`source/` klasörü, bu build'in üretildiği React + TypeScript + Vite projesinin kaynak kodunu içerir
(`src/`, sayfa `.tsx` giriş noktaları, `vite.config.ts`, `tailwind.config.ts`, `scripts/`, `redirects/` vb.).

**Not:** `public/assets` altındaki ham (sıkıştırılmamış) ürün görselleri buraya dahil edilmemiştir —
onlar zaten kök dizindeki derlenmiş `assets/img/` içinde optimize edilmiş haliyle mevcuttur; ham
görselleri de eklemek repo boyutunu ~2.2GB artırıp gereksiz GitHub push hatalarına yol açar.

Kurulum:
```
cd source
npm install
npm run dev
```

PHP/Emlog backend bu projenin dışındadır ve bu çalışmada değiştirilmemiştir; frontend yalnızca
mevcut public URL/slug/backlink yapısını koruyacak şekilde tasarlanmıştır.
