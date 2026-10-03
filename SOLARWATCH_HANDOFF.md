# SolarWatch — Project Handoff Document

> **Created for:** NASA Space Apps Challenge  
> **Status:** Production-ready (dev server confirmed working at `http://localhost:3000`)  
> **Last Updated:** 2026-10-03  
> **For any incoming agent:** Read this document top-to-bottom before touching any file.

---

## 📌 What Is SolarWatch?

SolarWatch is an interactive **Space Weather Intelligence Dashboard** that fetches real NASA heliospheric telemetry from the **NASA DONKI API** and presents it in a mission-control interface. It was built for the NASA Space Apps Challenge.

**Core Concept: OBSERVE → ANALYZE → EXPLAIN → UNDERSTAND IMPACT**

**Official Disclaimer (must remain in app):** SolarWatch is an independent educational project and is NOT an official NASA product.

---

## 🛠 Technology Stack

| Layer | Technology |
| :--- | :--- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v3 |
| Charts | Recharts v2 |
| Icons | Lucide React |
| Fonts | Google Fonts via `next/font/google` |
| NASA Data | NASA DONKI public API |

---

## 🔤 Typography Stack (RECENTLY UPDATED)

This is a 3-tier scientific typography system. **Do not change this without good reason.**

| Role | Font | Tailwind Class | CSS Variable | Fallbacks |
| :--- | :--- | :--- | :--- | :--- |
| **Headings & Display** | Inter | `font-heading` | `--font-heading` | Helvetica Neue, Helvetica, Arial, sans-serif |
| **Body Copy & Paragraphs** | Public Sans | `font-sans` | `--font-body` | Helvetica Neue, Helvetica, Arial, sans-serif |
| **Data / Technical Labels** | DM Mono | `font-mono` | `--font-mono` | Courier New, monospace |

**Implementation:**
- Fonts loaded in [`app/layout.tsx`](app/layout.tsx) using `next/font/google` (zero layout shift, self-hosted via Next.js CDN)
- CSS variables injected on `<html>` element via `inter.variable`, `publicSans.variable`, `dmMono.variable`
- [`tailwind.config.js`](tailwind.config.js) maps these to `fontFamily.heading`, `fontFamily.sans`, `fontFamily.mono`
- Base rules in [`app/globals.css`](app/globals.css) apply fonts to `h1–h6`, `body`, and `code/pre` elements

**Tailwind usage pattern:**
```tsx
<h1 className="font-heading text-4xl font-extrabold ...">     // Inter — headings
<p className="font-sans text-base leading-relaxed ...">        // Public Sans — body
<span className="font-mono text-xs ...">                       // DM Mono — data/timestamps
```

**Fallback / Legacy (NASA brand alignment):**  
The fallback stacks end with `Helvetica Neue, Helvetica, Arial, sans-serif` — matching NASA's own Web Design Standards, which rely on Helvetica as their brand typeface.

### Components That Have Been Updated With Typography Classes
- ✅ `components/Hero.tsx` — `font-heading` on h1, `font-sans` on supporting paragraph
- ✅ `components/Navbar.tsx` — `font-heading` on SOLARWATCH brand wordmark
- ✅ `components/ParametersGrid.tsx` — `font-heading` on section h2
- ✅ `components/SolarActivityChart.tsx` — `font-heading` on chart h3
- ✅ `components/SpaceWeatherConditions.tsx` — `font-heading` on section h3
- ✅ `components/EventsTimeline.tsx` — `font-heading` on section h3
- ✅ `components/WhyDoesThisMatter.tsx` — `font-heading` on section h2
- ✅ `components/EducationSection.tsx` — `font-heading` on section h2

---

## 🗂 Project File Structure

```
d:\naveen's projects\Solarwatch\
│
├── .env.local                        ← NASA_API_KEY lives here (see API section)
├── tailwind.config.js                ← Design tokens, font families, color palette
├── next.config.js                    ← Next.js image config
├── package.json                      ← Dependencies
│
├── app/
│   ├── layout.tsx                    ← Root layout: fonts, SEO metadata, bg image
│   ├── globals.css                   ← Tailwind directives + typography base rules
│   ├── page.tsx                      ← Main dashboard (SSR, force-dynamic)
│   ├── error.tsx                     ← App-wide error boundary (client component)
│   ├── not-found.tsx                 ← 404 page
│   ├── about/page.tsx                ← About & methodology page
│   ├── events/page.tsx               ← Event timeline page (force-dynamic)
│   ├── impact/page.tsx               ← Earth impact page
│   ├── solar-activity/page.tsx       ← Solar activity chart page (force-dynamic)
│   └── api/space-weather/route.ts    ← Internal API proxy (GET → NASA DONKI)
│
├── components/
│   ├── dashboard/
│   │   └── DashboardClient.tsx       ← Main dashboard: state + refresh logic
│   ├── Hero.tsx                      ← Hero section with bg image + dynamic summary
│   ├── Navbar.tsx                    ← Sticky nav: pill bar, live status, refresh btn
│   ├── ParametersGrid.tsx            ← 4 key parameter cards (Flare/CME/GST/SEP)
│   ├── SolarActivityChart.tsx        ← Recharts Area chart with flare intensity
│   ├── SpaceWeatherConditions.tsx    ← 5-domain conditions matrix
│   ├── EventsTimeline.tsx            ← Chronological event feed with filters
│   ├── WhyDoesThisMatter.tsx         ← Infrastructure impact section
│   ├── EducationSection.tsx          ← Beginner space weather glossary
│   └── Footer.tsx                    ← Links, attribution, disclaimer
│
├── lib/nasa/
│   ├── types.ts                      ← All TypeScript interfaces (NASA + normalized)
│   ├── donki.ts                      ← Server-side NASA DONKI API fetcher
│   └── transformers.ts               ← Data normalization, risk matrix, fallback data
│
├── pages/
│   └── _error.js                     ← Required by Next.js 14 build (pages router shim)
│
└── public/
    ├── Luminous Blue Nebula Vortex.png   ← PRIMARY BACKGROUND IMAGE (do not remove)
    └── Screenshot 2026-10-03 090314.png  ← Original UI reference image
```

---

## 🌐 Pages & Routes

| Route | Type | Description |
| :--- | :--- | :--- |
| `/` | SSR Dynamic | Main dashboard — all sections |
| `/solar-activity` | SSR Dynamic | Solar flare chart + class guide |
| `/events` | SSR Dynamic | Filterable NASA event timeline |
| `/impact` | Static | Earth infrastructure impact cards |
| `/about` | Static | Project info, methodology, disclaimer |
| `/api/space-weather` | API Route | Internal NASA proxy (GET) |

---

## 🛰 NASA API Integration

### Current Config
File: [`.env.local`](.env.local)  
```env
NASA_API_KEY=DEMO_KEY
```
Replace `DEMO_KEY` with your real key from **[https://api.nasa.gov/](https://api.nasa.gov/)** (free, instant signup).

### DEMO_KEY Limits
- 30 requests/hour, 50 requests/day
- At build time or high load, returns HTTP 429 (rate limited)
- SolarWatch handles 429 gracefully — serves high-quality normalized baseline telemetry instead of blank pages

### Data Flow (Server-Side Only)
```
NASA DONKI (api.nasa.gov/DONKI)
        ↓
lib/nasa/donki.ts   [safeFetchJson — handles 429 and non-JSON gracefully]
        ↓
lib/nasa/transformers.ts   [normalizes → FlareSummary, CMESummary, etc.]
        ↓
app/page.tsx (SSR) or app/api/space-weather/route.ts (client refresh)
        ↓
React Components & Recharts
```

### DONKI Endpoints Used
| Endpoint | Data |
| :--- | :--- |
| `/DONKI/FLR` | Solar Flares |
| `/DONKI/CME` | Coronal Mass Ejections |
| `/DONKI/GST` | Geomagnetic Storms + Kp Index |
| `/DONKI/SEP` | Solar Energetic Particles |
| `/DONKI/IPS` | Interplanetary Shocks |

### Fallback Behavior
If NASA API is unavailable (`getFallbackSolarWatchData()` in `transformers.ts`):
- Returns 7 synthetic solar flares, 2 CMEs, 1 geomagnetic storm, 1 SEP event, 1 interplanetary shock
- Navbar shows 🟠 **"NASA Simulation Mode"** badge instead of 🟢 **"NASA Live Telemetry"**
- All data is clearly labeled as baseline/simulation — no silent fake data

---

## 🎨 Visual Design System

### Color Palette (tailwind.config.js)
| Token | Value | Use |
| :--- | :--- | :--- |
| `space-950` | `#030712` | Primary dark background |
| `space-900` | `#070d1e` | Card backgrounds |
| `space-800` | `#1c2541` | Elevated surfaces |
| `nebula.cyan` | `#38bdf8` | Primary accent |
| `solar.orange` | `#f97316` | Alert / solar flare |
| `solar.yellow` | `#fbbf24` | M-class flares |
| `solar.red` | `#ef4444` | X-class flares / extreme |

### Background Image
- File: `public/Luminous Blue Nebula Vortex.png` (2.4 MB, original from user)
- Applied as `fixed` full-page background at 30% opacity with `mix-blend-screen`
- Used again as 45% opacity in the Hero section `mix-blend-screen`
- **Do NOT remove or replace this image** — it is a core design requirement

### Glass Panels
All cards use `.glass-panel` CSS class:
```css
background: rgba(7, 13, 30, 0.65);
backdrop-filter: blur(12px);
border: 1px solid rgba(255, 255, 255, 0.08);
```

### NebulaOS Visual Signature
- Monospace corner reticles on cards: `+ FLR-SENS`, `+ RETICLE 01`, etc.
- Pill-shaped nav bar with active gradient indicator
- Animated pulse dot for live status
- Thin `rounded-2xl` / `rounded-3xl` card radii

---

## ⚙️ Running the App

```bash
# Install dependencies
npm install

# Development server (hot reload)
npm run dev
# → http://localhost:3000

# Production build (takes ~90 sec due to NASA API calls at build time)
npm run build

# Serve production build
npm run start
```

**Note on build:** During `npm run build`, Next.js calls NASA DONKI at build time for static pages. If NASA returns 429, you'll see warning logs but the build still succeeds — pages use fallback data. This is expected behavior with `DEMO_KEY`.

---

## 🔴 Known Issues & Remaining Work

### ✅ Completed
- [x] Full NASA DONKI integration with 5 endpoints
- [x] 3-tier typography stack (Inter / Public Sans / DM Mono) applied to all headings and components
- [x] Background image integrated as full-page and hero atmosphere
- [x] 5-page app structure with proper error/404 handling
- [x] Client-side refresh button with NASA revalidation
- [x] Interactive Recharts flare chart with log scale + class filters
- [x] Event timeline with type filters
- [x] Space weather conditions matrix with educational disclaimer
- [x] Graceful 429 rate-limit fallback (no broken/empty pages)
- [x] Production build passes (`exit code 0`)

### 🔧 Potential Improvements
- [ ] **NASA API Key**: Replace `DEMO_KEY` with a real NASA API key for live telemetry beyond rate limits
- [ ] **Mobile nav drawer**: Current mobile nav is a bottom pill bar; could upgrade to slide-in drawer
- [ ] **Loading skeletons**: Pages currently show SSR content, no client-side loading skeleton (not critical for SSR pages)
- [ ] **NOAA Kp live feed**: Could complement DONKI GST data with real-time Kp index from `https://services.swpc.noaa.gov/`
- [ ] **Dark/Light mode toggle**: Currently dark-only
- [ ] **Animated chart transitions**: Recharts data updates could animate in
- [ ] **CME Arrival Countdown**: When NASA ENLIL model predicts Earth arrival time, display a countdown timer
- [ ] **Solar wind speed card**: Add real-time DSCOVR/ACE solar wind data from NOAA SWPC JSON feeds (free, no API key needed)

---

## 📜 Important Rules (Do Not Violate)

1. **Never fabricate space weather values** — if NASA data is missing, show "Data unavailable"
2. **Keep NASA API key server-side only** — never pass `NASA_API_KEY` to client components
3. **Do not remove the official disclaimer** — "SolarWatch is not an official NASA product"
4. **Typography system is intentional** — `font-heading` = Inter, `font-sans` = Public Sans, `font-mono` = DM Mono
5. **Background image must stay** — `public/Luminous Blue Nebula Vortex.png` is a core design requirement
6. **`pages/_error.js` must exist** — Next.js 14 requires it to prevent build errors with the App Router

---

*SolarWatch — NASA Space Apps Challenge Submission*
