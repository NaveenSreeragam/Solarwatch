export interface NASASolarFlare {
  flrID: string;
  beginTime: string;
  peakTime: string;
  endTime: string | null;
  classType: string;
  sourceLocation: string | null;
  activeRegionNum: number | null;
  link: string;
}

export interface NASACMEAnalysis {
  isMostAccurate: boolean;
  latitude: number | null;
  longitude: number | null;
  halfAngle: number | null;
  speed: number | null;
  type: string | null;
  note: string | null;
  enlilList?: Array<{
    modelURL?: string;
    impactList?: Array<{
      isLocation: string;
      arrivalTime: string;
    }>;
    estimatedSpeed?: number;
    estimatedShockArrivalTime?: string | null;
  }>;
}

export interface NASACME {
  activityID: string;
  startTime: string;
  sourceLocation: string | null;
  activeRegionNum: number | null;
  link: string;
  cmeAnalyses?: NASACMEAnalysis[];
}

export interface NASAKpIndex {
  observedTime: string;
  kpIndex: number;
  source: string;
}

export interface NASAGeomagneticStorm {
  gstID: string;
  startTime: string;
  allKpIndex: NASAKpIndex[];
  linkedEvents?: Array<{ activityID: string }>;
  link: string;
}

export interface NASASolarEnergeticParticle {
  sepID: string;
  eventTime: string;
  instruments?: Array<{ displayName: string }>;
  linkedEvents?: Array<{ activityID: string }>;
  link: string;
}

export interface NASAInterplanetaryShock {
  activityID: string;
  eventTime: string;
  location: string | null;
  link: string;
}

// Normalized Space Weather Data models for SolarWatch
export type FlareCategory = 'A' | 'B' | 'C' | 'M' | 'X';
export type StormSeverity = 'G1' | 'G2' | 'G3' | 'G4' | 'G5' | 'None';

export interface SpaceWeatherEvent {
  id: string;
  type: 'FLARE' | 'CME' | 'GST' | 'SEP' | 'IPS';
  title: string;
  timestamp: string;
  description: string;
  severity: 'Low' | 'Moderate' | 'Elevated' | 'High' | 'Extreme';
  details: {
    classType?: string;
    speed?: number;
    kpMax?: number;
    gRating?: StormSeverity;
    location?: string;
    activeRegion?: number;
    earthDirected?: boolean;
    rawLink?: string;
  };
}

export interface FlareSummary {
  latestFlare: NASASolarFlare | null;
  classType: string;
  category: FlareCategory | 'None';
  severityLabel: 'Low' | 'Moderate' | 'High' | 'Extreme' | 'None';
  intensity: string;
  peakTime: string;
  startTime: string;
  endTime: string;
  activeRegion: string;
  totalCount7Days: number;
}

export interface CMESummary {
  recentCount: number;
  latestCME: NASACME | null;
  startTime: string;
  estimatedSpeed: number | null;
  direction: string;
  earthDirected: boolean;
}

export interface GSTSummary {
  latestStorm: NASAGeomagneticStorm | null;
  gScale: StormSeverity;
  kpMax: number;
  startTime: string;
  description: string;
  associatedEventId: string | null;
}

export interface SEPSummary {
  latestEvent: NASASolarEnergeticParticle | null;
  eventTime: string;
  instrumentList: string[];
  associatedEventId: string | null;
  recentCount: number;
}

export interface ConditionsStatus {
  solarActivity: 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'EXTREME';
  satelliteEnv: 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'EXTREME';
  radioComm: 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'EXTREME';
  navigation: 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'EXTREME';
  radiation: 'LOW' | 'MODERATE' | 'ELEVATED' | 'HIGH' | 'EXTREME';
}

export interface ChartDataPoint {
  date: string;
  time: string;
  fullDate: string;
  flareClass: string;
  numericIntensity: number;
  category: FlareCategory;
  activeRegion: string;
  cmeSpeed?: number;
  kpIndex?: number;
}

export interface SolarWatchPayload {
  fetchedAt: string;
  /** True when the most recent NASA update was rate-limited and prior live data is shown. */
  isDataDelayed: boolean;
  summaryText: string;
  flareSummary: FlareSummary;
  cmeSummary: CMESummary;
  gstSummary: GSTSummary;
  sepSummary: SEPSummary;
  conditions: ConditionsStatus;
  events: SpaceWeatherEvent[];
  chartData: ChartDataPoint[];
  isFallbackData: boolean;
}
