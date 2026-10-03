import {
  NASASolarFlare,
  NASACME,
  NASAGeomagneticStorm,
  NASASolarEnergeticParticle,
  NASAInterplanetaryShock,
  SolarWatchPayload,
} from './types';
import { transformDONKIData, getFallbackSolarWatchData } from './transformers';

// Direct NASA Goddard Community Coordinated Modeling Center DONKI REST Web Service
const NASA_CCMC_BASE = 'https://ccmc.gsfc.nasa.gov/DONKI/WS/get';
const NASA_API_BASE = 'https://api.nasa.gov/DONKI';

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

async function safeFetchJson<T>(url: string, fetchOptions: RequestInit = {}): Promise<T[]> {
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
      return [];
    }
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) {
      console.warn(`NASA API non-JSON response from ${url}`);
      return [];
    }
    const json = await res.json();
    return Array.isArray(json) ? json : [];
  } catch (err) {
    console.warn(`Failed fetching from ${url}:`, err);
    return [];
  }
}

export async function fetchSpaceWeatherData(): Promise<SolarWatchPayload> {
  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  const { startDate, endDate } = getDatesRange(14);

  // 1-Hour cache: revalidates once every 3600 seconds (hourly on the clock)
  const fetchOptions: RequestInit = {
    next: { revalidate: 3600 },
  };

  try {
    // Primary: Query direct CCMC DONKI Web Service (real-time telemetry)
    const ccmcParams = `startDate=${startDate}&endDate=${endDate}`;
    const [flares, cmes, storms, seps, shocks] = await Promise.all([
      safeFetchJson<NASASolarFlare>(`${NASA_CCMC_BASE}/FLR?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASACME>(`${NASA_CCMC_BASE}/CME?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASAGeomagneticStorm>(`${NASA_CCMC_BASE}/GST?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASASolarEnergeticParticle>(`${NASA_CCMC_BASE}/SEP?${ccmcParams}`, fetchOptions),
      safeFetchJson<NASAInterplanetaryShock>(`${NASA_CCMC_BASE}/IPS?${ccmcParams}`, fetchOptions),
    ]);

    // If direct CCMC returned real observations, transform and serve them
    if (flares.length > 0 || cmes.length > 0 || storms.length > 0 || seps.length > 0 || shocks.length > 0) {
      return transformDONKIData(flares, cmes, storms, seps, shocks, false);
    }

    // Fallback attempt: query api.nasa.gov DONKI with user API key
    const apiGovParams = `startDate=${startDate}&endDate=${endDate}&api_key=${apiKey}`;
    const [govFlares, govCmes, govStorms, govSeps, govShocks] = await Promise.all([
      safeFetchJson<NASASolarFlare>(`${NASA_API_BASE}/FLR?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASACME>(`${NASA_API_BASE}/CME?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASAGeomagneticStorm>(`${NASA_API_BASE}/GST?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASASolarEnergeticParticle>(`${NASA_API_BASE}/SEP?${apiGovParams}`, fetchOptions),
      safeFetchJson<NASAInterplanetaryShock>(`${NASA_API_BASE}/IPS?${apiGovParams}`, fetchOptions),
    ]);

    if (govFlares.length > 0 || govCmes.length > 0 || govStorms.length > 0) {
      return transformDONKIData(govFlares, govCmes, govStorms, govSeps, govShocks, false);
    }

    // When no events exist in the 14-day window, return empty real dataset (not fake)
    return transformDONKIData([], [], [], [], [], false);
  } catch (error) {
    console.error('Error fetching NASA space weather data:', error);
    return transformDONKIData([], [], [], [], [], false);
  }
}
