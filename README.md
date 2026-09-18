# YT Channel Hub

A dark, marketplace-style website for old/aged YouTube channel categories.
Built with **Next.js 14 (App Router) + React + Tailwind CSS**.

The site presents five creation-year categories and routes every enquiry to
WhatsApp or Telegram. It deliberately contains **no channel inventory, prices,
subscriber counts, reviews, or statistics** — those would all have to be
invented, and inventing them would mislead your visitors.

---

## 1. Run it locally

You need Node.js 18.17 or newer.

```bash
npm install
cp .env.local.example .env.local   # then edit .env.local
npm run dev
```

Open http://localhost:3000

To build for production:

```bash
npm run build
npm start
```

---

## 2. Where to change things

Everything you'll want to edit regularly lives in **three files**:

| What you want to change | File |
| --- | --- |
| WhatsApp link, Telegram link, guarantee days, guarantee terms, site name, SEO title/description | `lib/siteConfig.js` |
| The five categories, their labels and feature points | `lib/categories.js` |
| Auth credentials, links per environment | `.env.local` |

### Contact links

Already set to:

- WhatsApp: `https://wa.me/923007917283`
- Telegram: `https://t.me/waqas_aziz`

They're defined once in `lib/siteConfig.js` and can be overridden per
environment through `.env.local`:

```
NEXT_PUBLIC_WHATSAPP_LINK=https://wa.me/923007917283
NEXT_PUBLIC_TELEGRAM_LINK=https://t.me/waqas_aziz
```

Every button on the site — navbar, hero, category modal, contact section,
dashboard — reads from that one place.

---

## 3. Authentication — read this before launching

`lib/auth.js` currently stores accounts in the visitor's own browser
(`localStorage`). This makes Sign Up / Login / Dashboard clickable for local
testing, but **it is not real authentication**: passwords are not hashed,
nothing is stored on a server, and accounts vanish if the browser data is
cleared. The dashboard says so on screen.

Before you accept real users, replace the function bodies in `lib/auth.js`
with one provider. Each option is documented with step-by-step notes in the
comment block at the top of that file:

- **NextAuth.js** — best fit for Next.js, handles Google sign-in cleanly
- **Supabase Auth** — hosted Postgres + auth, generous free tier
- **Firebase Auth** — quickest Google sign-in setup

"Continue with Google" and "Forgot password" intentionally show a message
explaining they're not connected yet, rather than pretending to work.

Add credentials to `.env.local` (templates are in `.env.local.example`).

---

## 4. Admin dashboard (future)

The project is structured so an admin panel can be added without rewriting
components. All editable content already flows from two data modules:

- `lib/siteConfig.js` — links, guarantee text, site name, SEO
- `lib/categories.js` — category ranges, labels, feature points

To add an admin panel later:

1. Move the contents of those two files into a database table
   (Supabase or Postgres works well — one `site_settings` row, one
   `categories` table).
2. Replace the static imports with a server-side fetch in `app/layout.jsx`
   and `components/ChannelCategories.jsx`.
3. Add `app/admin/page.jsx` behind a role check, with forms writing to
   those tables.

No component reads hardcoded content directly, so nothing else changes.

---

## 5. Project structure

```
yt-channel-hub/
├── app/
│   ├── layout.jsx              # fonts, SEO, Open Graph, Twitter card, AuthProvider
│   ├── page.jsx                # home page — assembles all sections
│   ├── globals.css             # Tailwind layers, focus styles, reduced-motion
│   ├── login/page.jsx
│   ├── signup/page.jsx
│   ├── forgot-password/page.jsx
│   ├── dashboard/page.jsx      # account info, protected route
│   ├── privacy/page.jsx        # template — complete before launch
│   └── terms/page.jsx          # template — includes guarantee terms
├── components/
│   ├── Navbar.jsx              # sticky, hamburger menu on mobile
│   ├── Hero.jsx                # heading, CTAs, CSS/SVG visual (no stock photos)
│   ├── TrustFeatures.jsx       # three service boxes
│   ├── ChannelCategories.jsx   # section + modal state
│   ├── CategoryCard.jsx
│   ├── CategoryDetailsModal.jsx# category info + WhatsApp/Telegram, no inventory
│   ├── HowItWorks.jsx
│   ├── FAQ.jsx                 # accordion
│   ├── ContactCTA.jsx
│   ├── Footer.jsx
│   └── AuthShell.jsx           # shared form shell, inputs, Google button
├── context/
│   └── AuthContext.jsx         # wraps lib/auth.js
├── lib/
│   ├── siteConfig.js           # ← edit links & guarantee here
│   ├── categories.js           # ← edit categories here
│   └── auth.js                 # ← connect real auth here
├── public/favicon.svg          # original mark, not YouTube's logo
└── .env.local.example
```

---

## 6. Deploy

**Vercel (easiest):**

1. Push this folder to a GitHub repository.
2. Go to vercel.com → New Project → import the repo.
3. Under Environment Variables, add `NEXT_PUBLIC_WHATSAPP_LINK` and
   `NEXT_PUBLIC_TELEGRAM_LINK`.
4. Deploy. Add your custom domain in Project Settings → Domains.

**Netlify:** same flow, build command `npm run build`, publish directory `.next`,
with the official Next.js plugin.

After deploying, add the domain in Google Search Console and request indexing
so the site appears in search.

---

## 7. Before you go live — checklist

- [ ] Connect a real auth provider in `lib/auth.js`
- [ ] Complete `app/privacy/page.jsx` and `app/terms/page.jsx` with your real terms
- [ ] Write out the full 7-day guarantee conditions (what is and isn't covered)
- [ ] Update `siteConfig.seo.url` to your real domain
- [ ] Add an Open Graph image at `public/og.png` and reference it in `app/layout.jsx`

## Notes on content

The logo is an original `YT` mark in a rounded square — it does not reproduce
YouTube's official logo. If you grow this site, be aware that using "YouTube"
in a brand name has trademark limits; YouTube's brand guidelines are worth
reading before you invest in the name.
