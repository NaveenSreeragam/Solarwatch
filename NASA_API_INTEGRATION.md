# 🛰 NASA API Key Integration Guide — SolarWatch

This guide walks you through acquiring, configuring, and testing your official **NASA API Key** with **SolarWatch**.

---

## 📋 Overview

SolarWatch retrieves real-time space weather telemetry from **NASA DONKI** (Database Of Notifications, Knowledge, Information) managed by the Community Coordinated Modeling Center (CCMC) at NASA Goddard Space Flight Center.

### Default Mode vs. Official Key
| Feature | `DEMO_KEY` (Default) | Official NASA API Key |
| :--- | :--- | :--- |
| **Hourly Request Limit** | 30 requests per hour / 50 per day | **1,000 requests per hour** |
| **Telemetry Availability** | May trigger `429 Rate Limit` during high usage | Uninterrupted live satellite data stream |
| **Cost** | Free | **100% Free (Instant signup)** |

---

## 🔑 Step 1: Obtain Your Free NASA API Key

1. Open your browser and go to the official portal:  
   👉 **[https://api.nasa.gov/](https://api.nasa.gov/)**

2. Fill out the short signup form under **Generate API Key**:
   - **First Name**
   - **Last Name**
   - **Email Address**

3. Click **Signup**. Your API key will be displayed immediately on screen and emailed to you.

---

## ⚙️ Step 2: Configure `.env.local`

1. In the root directory of your project (`d:\naveen's projects\Solarwatch`), locate or open `.env.local`.

2. Replace `DEMO_KEY` with your newly acquired key:

```env
# NASA Open API Key Configuration
NASA_API_KEY=your_actual_nasa_api_key_here
```

> ⚠️ **Security Rule**: Keep your API key inside `.env.local`. The `lib/nasa/donki.ts` architecture keeps all NASA API calls strictly **server-side**, protecting your API key from being exposed to browser clients.

---

## 🏗 Step 3: Understanding the Data Architecture

SolarWatch routes all NASA requests through a secure server-side pipeline:

```text
NASA DONKI APIs (api.nasa.gov/DONKI)
            ↓
lib/nasa/donki.ts (Server-side fetcher with 5-minute cache)
            ↓
lib/nasa/transformers.ts (Data normalization & risk matrix)
            ↓
app/api/space-weather/route.ts (Internal API Proxy Route)
            ↓
React Components & Recharts Telemetry Visualizers
```

### Integrated DONKI Endpoints:
- `https://api.nasa.gov/DONKI/FLR` — Solar Flares (Class A, B, C, M, X)
- `https://api.nasa.gov/DONKI/CME` — Coronal Mass Ejections & Speed vectors
- `https://api.nasa.gov/DONKI/GST` — Geomagnetic Storms & Kp Index
- `https://api.nasa.gov/DONKI/SEP` — Solar Energetic Particle Events
- `https://api.nasa.gov/DONKI/IPS` — Interplanetary Shock Fronts

---

## 🧪 Step 4: Verify Live Integration

1. **Restart your local development server** so Next.js loads the updated `.env.local` environment variable:

```bash
# Stop dev server (Ctrl + C), then restart:
npm run dev
```

2. Open your browser at **`http://localhost:3000`**.

3. Look at the **Navbar Status Pill** at the top right:
   - 🟢 **`NASA Live Telemetry`**: Indicates your official key successfully fetched live observations from GOES & DSCOVR spacecraft.
   - 🟠 **`NASA Simulation Mode`**: Displays normalized baseline telemetry if NASA DONKI servers are undergoing maintenance or returning no events.

4. Click the **Refresh Button** (🔄) to manually trigger an API revalidation.

---

## 🚀 Step 5: Production Deployment (Vercel / Netlify)

When deploying SolarWatch to production:

1. Go to your deployment platform dashboard (e.g. Vercel / Netlify / Railway).
2. Navigate to **Project Settings → Environment Variables**.
3. Add variable name: `NASA_API_KEY`
4. Add variable value: `YOUR_OFFICIAL_NASA_API_KEY`
5. Trigger a new deployment.

---

## 🛠 Troubleshooting

| Problem | Cause | Solution |
| :--- | :--- | :--- |
| `NASA API non-ok status 429` | Reached rate limit of `DEMO_KEY` | Add your official NASA API key in `.env.local` |
| `SyntaxError: Unexpected token '<'` | NASA API returned an HTML error page | SolarWatch automatically catches non-JSON responses and serves high-quality baseline telemetry |
| Telemetry not updating after editing `.env.local` | Next.js server hasn't reloaded environment variables | Restart the dev server (`npm run dev`) |

---

*SolarWatch is an independent educational project created for the NASA Space Apps Challenge.*
