import { unstable_cache } from 'next/cache';
import {
  NASASolarFlare,
  NASACME,
  NASAGeomagneticStorm,
  NASASolarEnergeticParticle,
  NASAInterplanetaryShock,
  SolarWatchPayload,
} from './types';
import { transformDONKIData } from './transformers';

// Direct NASA Goddard Community Coordinated Modeling Center DONKI REST Web Service
const NASA_CCMC_BASE = 'https://ccmc.gsfc.nasa.gov/DONKI/WS/get';
const NASA_API_BASE = 'https://api.nasa.gov/DONKI';

// Cache the fully normalized dashboard payload once for every visitor. This is
// deliberately shorter than a typical DONKI history window, but long enough
// to prevent each page view and manual refresh from becoming five API calls.
const SPACE_WEATHER_CACHE_SECONDS = 15 * 60;

type NASAFetchResult<T> = {
  data: T[];
  wasRateLimited: boolean;
};

// Keeps the last complete result available when NASA temporarily responds with
// HTTP 429. The shared cache below prevents this path in normal operation.
let lastSuccessfulPayload: SolarWatchPayload | null = null;

function getDatesRange(daysBack = 14) {
  const endDateObj = new Date();
  const startDateObj = new Date();
  startDateObj.setDate(endDateObj.getDate() - daysBack);

  const formatDateStr = (d: Date) => d.toISOString().split('T')[0];

  return {
    startDate: formatDateStr(startDateObj),
    endDate: formatDateStr(endDateObj),
  };
}

async function safeFetchJson<T>(
  url: string,
  fetchOptions: RequestInit = {}
): Promise<NASAFetchResult<T>> {
  try {
    const headers = {
      Accept: 'application/json',
      'User-Agent': 'SolarWatch-NASA-SpaceApps-Challenge',
      ...(fetchOptions.headers || {}),
    };

    const res = await fetch(url, {
      ...fetchOptions,
      headers,
    });

    if (!res.ok) {
      console.warn(`NASA API status ${res.status} for ${url}`);
      return { data: [], wasRateLimited: res.status === 429 };
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.warn(`NASA API non-JSON response from ${url}`);
      return { data: [], wasRateLimited: false };
    }
    const json = await res.json();
    return { data: Array.isArray(json) ? json : [], wasRateLimited: false };
  } catch (err) {
    console.warn(`Failed fetching from ${url}:`, err);
    return { data: [], wasRateLimited: false };
  }
}

function serveDelayedData(): SolarWatchPayload {
  if (lastSuccessfulPayload) {
    return {
      ...lastSuccessfulPayload,
      isDataDelayed: true,
    };
  }

  return {
    ...transformDONKIData([], [], [], [], [], false),
    isDataDelayed: true,
    summaryText: 'NASA temporarily delayed this update. No previously retrieved observations are available yet.',
  };
}

async function fetchLiveSpaceWeatherData(): Promise<SolarWatchPayload> {
  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  const { startDate, endDate } = getDatesRange(14);

  // The outer shared cache controls when this request is repeated. Avoid a
  // second fetch cache here so an expired dashboard cache always gets a fresh
  // NASA response.
  const fetchOptions: RequestInit = {
    cache: 'no-store',
  };

  try {
    // Primary: Query direct CCMC DONKI Web Service (real-time telemetry)
    const ccmcParams = `startDate=${startDate}&endDate=${endDate}`;
    const primaryResults = await Promise.all([
      safeFetchJson<NASASolarFlare>(`${NASA_CCMC_BASE}/FLR?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASACME>(`${NASA_CCMC_BASE}/CME?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASAGeomagneticStorm>(`${NASA_CCMC_BASE}/GST?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASASolarEnergeticParticle>(`${NASA_CCMC_BASE}/SEP?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASAInterplanetaryShock>(`${NASA_CCMC_BASE}/IPS?${ccmcParams}`, fetchOptions),
    ]);
    const [flareResult, cmeResult, stormResult, sepResult, shockResult] = primaryResults;
    const flares = flareResult.data;
    const cmes = cmeResult.data;
    const storms = stormResult.data;
    const seps = sepResult.data;
    const shocks = shockResult.data;

    // If direct CCMC returned real observations, transform and serve them
    if (flares.length > 0 || cmes.length > 0 || storms.length > 0 || seps.length > 0 || shocks.length > 0) {
      if (primaryResults.some((result) => result.wasRateLimited)) return serveDelayedData();
      const payload = transformDONKIData(flares, cmes, storms, seps, shocks, false);
      lastSuccessfulPayload = payload;
      return payload;
    }

    // Fallback attempt: query api.nasa.gov DONKI with user API key
    const apiGovParams = `startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const fallbackResults = await Promise.all([
      safeFetchJson<NASASolarFlare>(`${NASA_API_BASE}/FLR?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASACME>(`${NASA_API_BASE}/CME?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASAGeomagneticStorm>(`${NASA_API_BASE}/GST?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASASolarEnergeticParticle>(`${NASA_API_BASE}/SEP?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASAInterplanetaryShock>(`${NASA_API_BASE}/IPS?${apiGovParams}`, fetchOptions),
    ]);
    const [govFlareResult, govCmeResult, govStormResult, govSepResult, govShockResult] = fallbackResults;
    const govFlares = govFlareResult.data;
    const govCmes = govCmeResult.data;
    const govStorms = govStormResult.data;
    const govSeps = govSepResult.data;
    const govShocks = govShockResult.data;

    if (govFlares.length > 0 || govCmes.length > 0 || govStorms.length > 0) {
      if (fallbackResults.some((result) => result.wasRateLimited)) return serveDelayedData();
      const payload = transformDONKIData(govFlares, govCmes, govStorms, govSeps, govShocks, false);
      lastSuccessfulPayload = payload;
      return payload;
    }

    if (primaryResults.some((result) => result.wasRateLimited) || fallbackResults.some((result) => result.wasRateLimited)) {
      return serveDelayedData();
    }

    // When no events exist in the 14-day window, return empty real dataset (not fake)
    const payload = transformDONKIData([], [], [], [], [], false);
    lastSuccessfulPayload = payload;
    return payload;
  } catch (error) {
    console.error('Error fetching NASA space weather data:', error);
    return transformDONKIData([], [], [], [], [], false);
  }
}

/**
 * Shared Next.js data cache. A cache miss performs the five DONKI calls once;
 * all dashboard pages and /api/space-weather requests reuse the result for
 * 15 minutes. On one deployment region this caps normal traffic at 20 primary
 * DONKI calls per hour (40 if every primary query needs the api.nasa.gov
 * fallback), regardless of visitor count.
 */
export const fetchSpaceWeatherData = unstable_cache(
  fetchLiveSpaceWeatherData,
  ['solarwatch-space-weather-v1'],
  { revalidate: SPACE_WEATHER_CACHE_SECONDS }
);
