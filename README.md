# APS MAJESTE — Personal Care Brand Website

A modern, fast, static website for **APS MAJESTE**, a premium personal care brand offering botanical skincare, face wash, and perfumes. Built with HTML5, CSS3, vanilla JavaScript, and Vite — no frameworks, no backend, no database.

> **Design ethos:** clean, modern, luxury. Mobile-first. Accessible. Optimized for Lighthouse > 95.

---

## Quick start

```bash
# 1. Install dependencies (Vite only — ~10 packages)
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Build for production (outputs to /dist)
npm run build

# 4. Preview the production build locally
npm run preview
```

**Requirements:** Node.js 18+ and npm 9+.

---

## Tech stack

| Layer       | Choice                                  | Why                                         |
| ----------- | --------------------------------------- | ------------------------------------------- |
| Markup      | HTML5 (semantic)                        | SEO + accessibility foundation              |
| Styling     | Hand-rolled CSS3 with design tokens     | No framework lock-in, fully themeable      |
| Scripting   | Vanilla JavaScript (ES modules)         | Minimal payload, no runtime overhead        |
| Build       | Vite 5                                  | Fastest dev server + lean production bundle |
| Fonts       | Cormorant Garamond + Inter (Google)     | Premium serif + clean sans pairing          |
| Backend     | None                                    | Static site, deploys anywhere               |

**Production bundle:** ~22 KB JS / ~28 KB CSS (gzipped: 8 KB / 5.6 KB) — across all 9 pages.

---

## Project structure

```
apsmajeste/
├── index.html                  # Home
├── about.html                  # About Us
├── products.html               # Products (filterable grid)
├── product.html                # Product Details (?id=slug)
├── why-choose-us.html          # Why Choose Us
├── contact.html                # Contact
├── privacy-policy.html         # Privacy Policy
├── terms.html                  # Terms & Conditions
├── 404.html                    # Not found
├── vite.config.js              # Multi-page build config
├── package.json
│
├── public/                     # Copied verbatim to /dist
│   ├── favicon.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   ├── images/                 # (Add product/lifestyle imagery here)
│   └── admin/                  # Decap CMS admin UI
│       ├── index.html          # Loads Decap CMS from CDN
│       └── config.yml          # CMS configuration (collections, fields)
│
├── content/                    # Editable content (managed by Decap CMS)
│   ├── products/               # One JSON file per product
│   │   ├── rose-damascena-elixir.json
│   │   └── ... (7 total)
│   └── settings/
│       └── site.json           # Brand contact info, social links
│
└── src/
    ├── styles/
    │   ├── main.css            # Entry — imports the chain
    │   ├── tokens.css          # Design tokens (colors, type, spacing)
    │   ├── base.css            # Reset + element defaults
    │   ├── components.css      # Buttons, cards, nav, footer, etc.
    │   └── utilities.css       # Layout helpers + animations
    │
    ├── js/
    │   ├── main.js             # Entry — orchestrates all modules
    │   ├── components.js       # Header + footer injection (DRY)
    │   ├── nav.js              # Mobile menu, scroll state
    │   ├── ui.js               # Reveal on scroll, FAQ, forms, toast
    │   ├── products.js         # Products grid + filtering
    │   └── product-detail.js   # Product detail + JSON-LD injection
    │
    └── data/
        ├── site.js             # Brand info, nav, footer links
        └── products.js         # Reads from /content/products/*.json at build time
```

---

## What's inside

### Pages (9)
Home · About · Products · Product Details · Why Choose Us · Contact · Privacy Policy · Terms & Conditions · 404

### Reusable components
Header · Navigation (desktop + mobile) · Hero · Product Cards · Testimonials · FAQ accordion · CTA bands · Footer · Forms · Toast · Breadcrumbs · Page headers · Filter chips · Stats · Steps · Feature cards

### SEO (built in)
- Semantic HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`)
- Per-page `<title>`, meta description, keywords
- Open Graph + Twitter Card tags on every page
- Canonical URLs
- `robots.txt` and `sitemap.xml` (with all 13 URLs)
- Image alt text (where images are used; placeholders are `aria-hidden`)
- Clean, keyword-rich URLs (`/products.html`, `/product.html?id=rose-damascena-elixir`)

### AEO + GEO (built in)
- **Organization schema** (JSON-LD) on every page
- **WebSite schema** with SearchAction
- **FAQPage schema** with 6 Q&As on home
- **Product schema** dynamically injected per product detail page
- **ItemList schema** on products listing
- **ContactPage + LocalBusiness** schema on contact
- **AboutPage** schema on about
- Entity-rich content (named growers, founded year, locations, ingredient INCI lists)
- Clear, plain-language descriptions answer the questions AI assistants are asked

### Performance
- Total JS: ~22 KB (8 KB gzipped) — site-wide
- Total CSS: ~28 KB (5.6 KB gzipped)
- Fonts loaded with `preconnect` + `preload` + `media="print"` swap
- IntersectionObserver-based scroll reveal (no scroll listeners)
- `prefers-reduced-motion` respected throughout
- No images on initial load (CSS gradient placeholders); add `<img loading="lazy">` when you drop in real photography
- `crossorigin` attributes on assets for proper caching
- Minimal DOM, minimal reflow

### Accessibility
- Skip-to-content link
- Semantic landmarks (`<header>`, `<main>`, `<footer>`, `<nav>`)
- `aria-current="page"` on active nav links
- `aria-expanded` on mobile menu toggle
- Visible `:focus-visible` outlines
- Keyboard-dismissable mobile menu (Escape key)
- All interactive elements are real `<button>`, `<a>`, `<input>` — no `div` clicks
- Color contrast meets WCAG AA

### UX details
- Sticky header that gains a border on scroll
- Smooth scrolling (native, with `prefers-reduced-motion` opt-out)
- Subtle scroll-reveal animations (staggered via `data-delay`)
- Mobile menu slides in from the right with body scroll lock
- FAQ accordion (native `<details>`, enhanced with sibling-collapse)
- Toast notifications for form submissions
- Sticky product media on detail page (desktop)
- Filter chips with active state

---

## Customization guide

### Change brand name, email, social links
Edit `src/data/site.js`. The header, footer, contact page, and structured data all read from this file.

> 💡 **Easier:** Use the admin UI at `/admin/` → "Site Settings" to edit brand contact info without touching code. See [Admin (Decap CMS)](#admin-decap-cms) below.

### Add or edit products
**Option A — Use the admin UI (recommended):** Go to `/admin/` → "Products" → click any product to edit, or "New Product" to add one. Every save commits to GitHub and auto-deploys. See [Admin (Decap CMS)](#admin-decap-cms) below.

**Option B — Edit JSON files directly:** Each product is a single JSON file at `content/products/<slug>.json`. Fields: `name`, `category`, `categorySlug` (one of: `serums`, `oils`, `cleansers`, `moisturizers`, `fragrances`, `body`), `price`, `size`, `tag` (one of: `""`, `"Bestseller"`, `"New"`, `"Signature"`), `bg` (one of: `rose`, `amber`, `sage`, `cream`, `noir`, `blush`), `short`, `description`, `benefits` (array of strings), `ingredients` (array of strings), `usage`, `pairings` (array of slugs), `rating`, `reviews`. The slug is derived from the filename.

> ⚠️ When you add a product, also add its URL to `public/sitemap.xml`.

### Change colors or typography
Edit `src/styles/tokens.css`. All colors, fonts, spacing, radii, and shadows are CSS custom properties — change them once and the whole site updates.

### Add a new page
1. Create `your-page.html` in the project root (use `about.html` as a template)
2. Add the page to the `pages` array in `vite.config.js`
3. Add the page to `public/sitemap.xml`
4. Add it to the `NAV_LINKS` array in `src/data/site.js` if it should appear in the nav

### Swap CSS placeholders for real product photography
Replace `<div class="ph product-bg--rose">` blocks in `src/js/products.js` and `src/js/product-detail.js` with:
```html
<img src="/images/your-image.jpg" alt="Rose Damascena Elixir bottle" loading="lazy" width="800" height="800">
```
And drop the image files into `public/images/`. You can also upload images via the admin UI — they'll be stored in `public/images/uploads/`.

---

## Admin (Decap CMS)

A full admin UI is built in at **`/admin/`**. It lets you add, edit, and delete products through a form-based interface — no code editing required. Every save commits directly to your GitHub repo and triggers a Pages rebuild via the workflow in `.github/workflows/deploy.yml`.

### How it works

```
Browser  →  /admin/  →  Decap CMS UI (from CDN)
                            ↓
                       GitHub OAuth (PKCE, no proxy server)
                            ↓
                       Commits JSON to content/products/<slug>.json
                            ↓
                       GitHub Actions triggers
                            ↓
                       Vite build → GitHub Pages
                            ↓
                       Live in ~30s
```

### One-time setup (5 minutes)

**1. Create a GitHub OAuth App**

- Go to: GitHub → **Settings → Developer settings → OAuth Apps → New OAuth App**
- Fill in:
  - **Application name:** `APS MAJESTE Admin`
  - **Homepage URL:** `https://<your-username>.github.io/<repo>/`
  - **Authorization callback URL:** `https://<your-username>.github.io/<repo>/admin/`
- Click **Register**
- Copy the **Client ID** (starts with `Iv1.`)

**2. Edit `public/admin/config.yml`**

Replace these two placeholder values:

```yaml
backend:
  name: github
  repo: your-username/apsmajeste           # ← your GitHub username/repo
  app_id: Iv1.xxxxxxxxxxxxxxxx             # ← your OAuth App Client ID
  ...

site_url: https://your-username.github.io/apsmajeste  # ← your live URL
```

**3. Commit and push**

```bash
git add public/admin/config.yml
git commit -m "Configure Decap CMS"
git push
```

**4. Visit `/admin/`** and click **"Login with GitHub"**. Authorize the OAuth app when prompted.

That's it. You can now:
- ✏️ Edit any of the 7 products through form fields (name, price, description, benefits, ingredients, etc.)
- ➕ Add new products (auto-generates a new JSON file + sitemap URL)
- 🗑️ Delete products
- 📸 Upload product images (stored in `public/images/uploads/`)
- 🔗 Set product pairings via a searchable dropdown (relation field)
- 📝 Edit brand contact info, social links, address (Site Settings collection)
- 📋 Use draft → review → publish workflow (`publish_mode: editorial_workflow`)

### Multi-user access

Anyone you grant write access to your GitHub repo can use the admin. To add a content editor:
1. GitHub → your repo → **Settings → Collaborators → Add people**
2. They visit `/admin/`, log in with their own GitHub account, and can start editing

### Troubleshooting

- **"Login with GitHub" button does nothing** → Check that `app_id` in `config.yml` matches your OAuth App Client ID, and the callback URL in the OAuth App is exactly `https://<user>.github.io/<repo>/admin/`
- **404 after login redirect** → Your OAuth callback URL doesn't match the deployed URL. Update both the OAuth App on GitHub and `site_url` in `config.yml`.
- **Edits don't appear on the site** → Check the **Actions** tab in your GitHub repo — the workflow should be running. If it fails, check the build log.
- **"Cannot find module" build error after editing** → Make sure your JSON files are valid (no trailing commas, no comments). Validate at jsonlint.com.
- **Want to disable the admin temporarily?** → Delete `public/admin/` and the link is gone.

---

## Deployment

The site builds to a static `/dist` folder. Deploy it anywhere that serves static files.

### Netlify
1. Push this folder to a Git repo
2. New site → import repo
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Done — Netlify will auto-deploy on every push

### Vercel
1. Push this folder to a Git repo
2. New project → import repo (Vercel auto-detects Vite)
3. Build command: `npm run build` (auto)
4. Output directory: `dist` (auto)
5. Done

### GitHub Pages (recommended — zero config)

A ready-to-use workflow is included at `.github/workflows/deploy.yml`. It auto-detects whether your repo is a **project site** (`<user>.github.io/<repo>/`) or a **user/org site** (`<user>.github.io/`) and sets Vite's `base` path accordingly — no manual config needed.

**One-time setup:**
1. Push this folder to a GitHub repo (e.g. `your-username/apsmajeste`)
2. In GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**
3. Push to `main` (or `master`) — the workflow runs automatically

**Your site goes live at:**
- Project repo (`apsmajeste`): `https://<your-username>.github.io/apsmajeste/`
- User site (`<your-username>.github.io`): `https://<your-username>.github.io/`

The workflow also runs a build check on pull requests (without deploying) so you can catch issues before merging.

**Manual trigger:** Go to **Actions → Deploy to GitHub Pages → Run workflow** to deploy on demand.

---

## Notes

- The demo content uses a placeholder domain (`apsmajeste.example.com`), email (`concierge@apsmajeste.example.com`), and social handles. Replace these with your real values in `src/data/site.js` before going live.
- The `og:image` references `https://apsmajeste.example.com/images/og-cover.jpg` — create and upload this 1200×630 image before launch.
- Forms (newsletter, contact, add-to-bag) are front-end only and show a toast on submit. Wire them to your backend, Formspree, Netlify Forms, or Klaviyo when ready.
- The product imagery uses CSS gradient placeholders. Drop real product photography into `public/images/` and swap the `<div class="ph …">` blocks in `src/js/products.js` and `src/js/product-detail.js` for `<img loading="lazy">` tags.

---

## License

MIT — use it, fork it, ship it.
