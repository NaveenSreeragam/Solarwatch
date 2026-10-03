# SolarWatch

SolarWatch is an interactive space-weather dashboard built for the NASA Space Apps Challenge. It turns recent NASA DONKI observations into a clear, approachable view of solar activity and its possible effects on Earth, satellites, navigation, communications, and human spaceflight.

## Challenge requirements

SolarWatch addresses the project requirements by:

- displaying current and recent space-weather activity from the previous 14 days;
- presenting more than four space-weather parameters: solar flares, coronal mass ejections (CMEs), geomagnetic storms, solar energetic particle (SEP) events, and interplanetary shocks;
- using cards, severity indicators, a flare-intensity chart, filter controls, and a chronological event timeline to make the data easy to explore.

## What the dashboard shows

| Area | Information shown |
| --- | --- |
| Solar flares | Latest flare class, active region, start and peak time, plus flare history in the chart |
| CMEs | Recent count, estimated speed, direction, and whether NASA's model indicates an Earth-directed trajectory |
| Geomagnetic activity | Maximum Kp index, G1–G5 storm scale, and onset time |
| Solar energetic particles | Recent SEP count, detecting instruments, and particle-radiation status |
| Event stream | A time-ordered feed of flare, CME, storm, SEP, and shock events, with links back to DONKI records |
| Earth-impact conditions | Derived status for solar activity, satellites, radio communication, GPS/navigation, and space radiation |

## Data source

SolarWatch uses NASA's [DONKI](https://ccmc.gsfc.nasa.gov/donki/) (Database Of Notifications, Knowledge, Information) service. The app requests these event types:

- `FLR` — solar flares
- `CME` — coronal mass ejections
- `GST` — geomagnetic storms
- `SEP` — solar energetic particle events
- `IPS` — interplanetary shocks

The server first queries NASA CCMC's DONKI web service. If it returns no observations, SolarWatch retries through `api.nasa.gov/DONKI` using the configured NASA API key. API keys remain on the server; browsers call only the app's own `/api/space-weather` endpoint.

## Condition methodology

The dashboard does not claim to be an operational forecast. It uses transparent, educational rules to turn DONKI event records into indicators:

- X-class flares → extreme solar activity and radio-communication status
- M-class flares → high solar activity and radio-communication status
- C-class flares → elevated/moderate activity status
- Kp ≥ 6 → extreme navigation status; Kp ≥ 5 → high navigation status
- an SEP event or Kp ≥ 6 → high satellite-environment status
- an SEP event combined with an X-class flare → extreme radiation status

## Reliability and API-rate protection

The fully processed dashboard payload is shared in a **15-minute server cache**. This prevents each visitor and each Refresh-button click from issuing five separate DONKI requests.

In a typical deployment region, the cache limits normal polling to approximately:

- 20 primary DONKI requests per hour (five endpoints × four refreshes), or
- 40 requests per hour when each primary fetch also requires the `api.nasa.gov` fallback.

If NASA responds with HTTP `429` (rate limited), SolarWatch keeps displaying the most recently successful result and changes the navbar status to **Data update delayed**. It never generates simulated space-weather events.

## Tech stack

- Next.js 14 and React 18
- TypeScript
- Tailwind CSS
- Recharts
- Framer Motion
- Lucide icons

## Run locally

### 1. Install dependencies

```bash
npm install
```

### 2. Configure the NASA API key

Create `.env.local` in the project root:

```env
NASA_API_KEY=your_nasa_api_key
```

An official NASA key is recommended. If no key is supplied, the app uses `DEMO_KEY`, which has much lower limits.

### 3. Start the development server

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Project structure

```text
app/
  api/space-weather/route.ts  Internal API endpoint for browser refreshes
  page.tsx                    Dashboard page
components/
  dashboard/                  Dashboard client and refresh behavior
  ParametersGrid.tsx          Key-space-weather metric cards
  SolarActivityChart.tsx      Flare intensity chart
  EventsTimeline.tsx          Filterable recent-event timeline
  SpaceWeatherConditions.tsx  Derived impact-condition matrix
lib/nasa/
  donki.ts                    Secure NASA requests, caching, and rate-limit handling
  transformers.ts             DONKI normalization and condition rules
  types.ts                    NASA and dashboard TypeScript models
```

## Disclaimer

SolarWatch is an independent educational project for the NASA Space Apps Challenge. It is not an official NASA or NOAA operational alerting system. For official warnings and operational space-weather forecasts, consult [NOAA Space Weather Prediction Center](https://www.swpc.noaa.gov/).
