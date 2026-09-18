# Backend PHP Integration — Claude Code task brief

This file is written for a Claude Code session doing the PHP-side integration
of the everymaterial.com v2 rebuild (not for a human to read casually — it's
a task brief). If you're a Claude Code agent picking this up: read this
whole file before touching anything, then work through the task list below
in order. If you're a human handing this to a Claude Code session, paste
this file's path as your first message, or copy it into the PHP repo as
`CLAUDE.md` before starting a session there.

## Source of truth

- Frontend repo: `github.com/Rothillion/marketarabasi-everymaterial`, PR #1
  (`worktree-redesign-v2-phase0-1` → `main`). Clone or pull this repo to get
  the actual files referenced below.
- This redirects folder: `web/redirects/` in that repo.
- Do not treat anything in this document as fact until you've verified it
  against the actual files — this brief summarizes findings from an earlier
  session, and repos drift.

## What the frontend is (context you need before deciding how to integrate)

- Vite + React, built as a **static multi-page site** — `npm run build` in
  `web/` produces a `dist/` folder of plain HTML/CSS/JS/images. No Node
  runtime is needed to *serve* it — only to build it.
- Each page × language is its own real HTML file (e.g. `about-tr.html`,
  `kategori-urun-en.html`), not a single-page app with client routing. A few
  pages (category/product listing and detail) read `?slug=` / `?aile=` query
  params client-side via `location.search` — these are plain GET query
  strings, no special server config needed for them to work.
- All asset references are **root-relative** (`/assets/...`). The site must
  be deployed at the domain root, not a subdirectory. If it must go in a
  subdirectory, that requires a rebuild with a `base` path set in
  `web/vite.config.ts` — flag this back to the frontend side rather than
  trying to patch built output paths yourself.

## Task list

### 1. Verify deployment root
Confirm with whoever owns hosting that `dist/` will be served at
`everymaterial.com/` directly. If not, stop and get the frontend rebuilt
with the correct `base` — do not attempt to rewrite the built asset paths
by hand, that's fragile and will drift on the next build.

### 2. Wire the legacy-URL redirect map
Read `web/redirects/README.md` in full first — it explains exactly what's
covered (860 rules: 175 products, 9 categories, 22 subcategories, 6 static
pages) and what's a genuine content gap (70/71 real blog articles, 8/9 real
projects have no v2 page — those get a fallback redirect to the listing
page, documented in the README, not a 1:1 match).

- `web/redirects/legacy-url-redirects.php` is ready to `require` directly —
  it returns a plain associative array, no dependencies.
- Implement the exact-match lookup + the two fallback prefix rules
  (`/blog-detail/*`, `/project/*`) exactly as shown in the README's PHP
  example, adapted to however this codebase actually routes requests
  (`.htaccess` + PHP front controller, a framework's router, etc. — inspect
  the actual PHP codebase to see which, don't assume).
- **Verify, don't just wire it and move on.** Pick 5-10 real old URLs from
  `web/redirects/exact-matches.json` at random, request them against the
  deployed backend, and confirm each returns a 301 to the correct new URL.
  Also test one `/blog-detail/*` URL and one `/project/*` URL to confirm the
  fallback rules fire.

### 3. Wire the contact form to a real backend
`web/src/pages/ContactPage.tsx` in the frontend repo currently has a
**client-only fake success state** — submitting the form does not send data
anywhere. Before this goes live, add real handling: an endpoint that
receives the form fields (name, email, phone, message — see
`web/src/content/contact.ts` for the exact field set) and does whatever the
business actually wants (email notification, CRM/DB insert, etc.). Ask the
user what "real" should mean here if it isn't obvious from the existing PHP
codebase's conventions — don't invent a delivery mechanism nobody asked for.

### 4. Confirm the leaked API key was rotated
A Stitch MCP API key was briefly committed to the frontend repo's git
history in this session before being caught and removed pre-push. It never
reached the shared remote, but if it wasn't already rotated, flag this to
the user now — this task brief is not the place to rotate it (it's not a
backend/PHP credential), just don't skip mentioning it if you notice it's
still outstanding.

### 5. Content gaps — get a decision, don't silently pick one
Two real content gaps exist (see `web/redirects/README.md`'s gap section):
70 real blog articles and 8 real projects that only exist on the live site,
not in the v2 rebuild. Building these out is a frontend task (new content
files + pages in the `web/` repo, following the exact same real-content-only
pattern used for the one article/project that already got ported), not
something to patch around purely on the PHP side. If asked to "just make it
work," the honest options are: (a) leave the fallback redirects as-is and
accept those specific pages funnel to a listing page instead of their exact
original content, or (b) rebuild the missing pages properly. Ask which,
don't default to fabricating placeholder content for either.

## Ground rule carried over from the frontend work

Every real page in this project was built strictly from real source
material (the company's actual archived site content, official registration
documents, etc.) — nothing was invented (no fake specs, no fake legal text,
no fake testimonials). If your PHP integration work touches any user-facing
copy, hold it to the same standard: real content or an honest gap, never a
plausible-sounding placeholder presented as real.
