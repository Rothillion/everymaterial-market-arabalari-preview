# Legacy URL Redirects (v1 real site → v2 rebuild)

## Why this exists

The real, currently-indexed everymaterial.com uses clean path-based URLs
(e.g. `/product/100-l-metal-shopping-cart/102?dil=tr`, `/category/plexiglass-display-equipment/1`),
almost certainly served by a PHP framework router. The v2 rebuild in this
repo uses static per-language files instead (e.g. `kategori-urun-tr.html?slug=100-l-metal-shopping-cart`).

**These two URL schemes do not match at all** — not even for pages like
Home, About, or Contact. If v2 replaces the live site without redirects,
every indexed URL 404s and any backlinks pointing at them lose their SEO
value. `legacy-url-redirects.php` is a generated map to prevent that.

## What's in this folder

- **`exact-matches.json`** — 860 `{ old-path+query → new-path }` pairs, plain JSON.
- **`legacy-url-redirects.php`** — the same 860 pairs as a PHP array (`return [...]`),
  ready to `include`/`require` directly in a PHP router or bootstrap file.
- **`BACKEND_CLAUDE_HANDOFF.md`** — if the backend integration will be done via
  a Claude Code session, start there instead of here. It's a task brief (not
  a casual read) that points back to this README for the details.

## Coverage — what's fully mapped (860 rules)

Built from the real site's own indexed URL list (`llms.txt`, extracted from
a production cache) cross-matched against this repo's real content data
(`products-parsed.json`, `productCategoryContent.ts`). All 4 language
variants (`en` = no `?dil=`, `tr`/`de`/`ar` = `?dil=tr|de|ar`) per item:

| Real URL pattern | Count | New v2 target |
|---|---|---|
| `/product/{slug}/{id}` | 175 products | `kategori-urun-{lang}.html?slug={slug}` |
| `/category/{slug}/{id}` | 9 categories | `kategoriler-{lang}.html?slug={v2-slug}` |
| `/subcategory/{slug}/{id}` | 22 subcategories | parent category's `kategoriler-{lang}.html?slug=...` (v2 has no subcategory-level pages, so these fold up one level) |
| `/`, `/contact`, `/our-team`, `/catalog`, `/corporate/about-us/1`, `/export-consultancy` | 6 static pages | matching v2 static page |
| `/most-preferred` | 1 | `katalog-{lang}.html` (closest real equivalent — v2 has no dedicated "most preferred" page) |
| `/categories` (all-categories index) | 1 | `/` (v2 has no all-categories index page — this is an approximation, not exact) |
| `/project/wooden-stands/7` | 1 | `proje-ahsap-standlar-{lang}.html` (the one project v2 has a real detail page for) |

## Coverage — genuine content gaps (NOT in the 860, needs a decision)

These real, currently-live, indexed URLs have **no v2 equivalent page at all**,
because that content was never rebuilt in v2 (out of scope for the redirect-map
task, not something I fabricated a fallback target for without saying so):

- **70 of 71 real blog articles** (`/blog-detail/{slug}/{id}`) — v2 only has one
  full article ("Pleksi Kutu Nasıl Üretilir?"/"How Are Plexiglass Boxes
  Manufactured?"). The other 70 real articles exist on the live site but were
  only ported into v2 as teaser cards (title/date/image), not full pages.
- **8 of 9 real projects** (`/project/{slug}/{id}`) — same situation; only
  "Wooden Stands" (`proje-ahsap-standlar`) got a real v2 detail page.

**Recommendation for these**: redirect the whole `/blog-detail/*` prefix to
`/blog-{lang}.html` and the whole `/project/*` prefix (except `wooden-stands`)
to `/projeler-{lang}.html`, so visitors land on a real listing page instead of
a 404. That's a soft fallback, not a content fix — the actual full articles/
projects would need to be rebuilt as real v2 pages to fully recover that SEO
value. Flagging this as a real gap rather than silently omitting it.

## How to use `legacy-url-redirects.php`

```php
<?php
$map = require __DIR__ . '/redirects/legacy-url-redirects.php';
$requestUri = $_SERVER['REQUEST_URI']; // e.g. "/product/100-l-metal-shopping-cart/102?dil=tr"

if (isset($map[$requestUri])) {
    header('Location: ' . $map[$requestUri], true, 301);
    exit;
}

// Fallback prefix rules for the content gaps above:
$path = parse_url($requestUri, PHP_URL_PATH);
$dil = $_GET['dil'] ?? null;
$lang = $dil ?: 'en';
if (str_starts_with($path, '/blog-detail/')) {
    header('Location: /blog-' . $lang . '.html', true, 301);
    exit;
}
if (str_starts_with($path, '/project/')) {
    header('Location: /projeler-' . $lang . '.html', true, 301);
    exit;
}
```

Adjust to whatever routing layer the backend team actually uses (Apache
`.htaccess` + `RewriteMap`, Nginx `map {}` block, or a framework's own
router) — the JSON/PHP data is the source of truth either way.

## Confidence notes

- Product and category mappings are high-confidence: the v2 `slug` values
  were generated directly from the same real archive this redirect map is
  built from, so they match exactly (verified: v2's `productCatalog.ts`
  slugs are byte-identical to the real site's URL slugs).
- The `/categories` and `/most-preferred` targets are best-effort approximations,
  not exact content matches — flagged above.
- This map was generated from a crawl snapshot (`llms.txt`), not a live API,
  so if products/categories were added or renamed on the live site after that
  snapshot was taken, this map won't include them.
