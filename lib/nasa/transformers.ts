import {
  NASASolarFlare,
  NASACME,
  NASAGeomagneticStorm,
  NASASolarEnergeticParticle,
  NASAInterplanetaryShock,
  SolarWatchPayload,
  FlareSummary,
  CMESummary,
  GSTSummary,
  SEPSummary,
  ConditionsStatus,
  SpaceWeatherEvent,
  ChartDataPoint,
  FlareCategory,
  StormSeverity,
} from './types';

// Converts flare class string (e.g., "M2.4", "X1.1", "C5.2") to numeric value for visualization
export function getNumericFlareIntensity(classType: string): number {
  if (!classType) return 0;
  const match = classType.trim().match(/^([A-Z])([\d.]+)?/i);
  if (!match) return 1;

  const letter = match[1].toUpperCase();
  const val = parseFloat(match[2] || '1');

  const baseMap: Record<string, number> = {
    A: 1,
    B: 10,
    C: 100,
    M: 1000,
    X: 10000,
  };

  const base = baseMap[letter] || 1;
  return base * val;
}

export function getFlareCategory(classType: string): FlareCategory {
  if (!classType) return 'A';
  const char = classType.trim().charAt(0).toUpperCase();
  if (['A', 'B', 'C', 'M', 'X'].includes(char)) {
    return char as FlareCategory;
  }
  return 'C';
}

export function getFlareSeverityLabel(category: FlareCategory): 'Low' | 'Moderate' | 'High' | 'Extreme' {
  switch (category) {
    case 'A':
    case 'B':
      return 'Low';
    case 'C':
      return 'Moderate';
    case 'M':
      return 'High';
    case 'X':
      return 'Extreme';
    default:
      return 'Moderate';
  }
}

export function calculateKpSeverity(kp: number): StormSeverity {
  if (kp >= 9) return 'G5';
  if (kp >= 8) return 'G4';
  if (kp >= 7) return 'G3';
  if (kp >= 6) return 'G2';
  if (kp >= 5) return 'G1';
  return 'None';
}

export function transformDONKIData(
  flares: NASASolarFlare[],
  cmes: NASACME[],
  storms: NASAGeomagneticStorm[],
  seps: NASASolarEnergeticParticle[],
  shocks: NASAInterplanetaryShock[],
  isFallback = false
): SolarWatchPayload {
  // Sort flares newest first
  const sortedFlares = [...flares].sort(
    (a, b) => new Date(b.beginTime).getTime() - new Date(a.beginTime).getTime()
  );
  const latestFlare = sortedFlares[0] || null;

  const flareCategory = latestFlare ? getFlareCategory(latestFlare.classType) : 'None';
  const flareSeverity = latestFlare && flareCategory !== 'None' ? getFlareSeverityLabel(flareCategory) : 'None';

  const flareSummary: FlareSummary = {
    latestFlare,
    classType: latestFlare?.classType || 'Data unavailable',
    category: flareCategory,
    severityLabel: flareSeverity,
    intensity: latestFlare?.classType ? `${latestFlare.classType} (${flareSeverity})` : 'Data unavailable',
    peakTime: latestFlare?.peakTime ? formatDate(latestFlare.peakTime) : 'Data unavailable',
    startTime: latestFlare?.beginTime ? formatDate(latestFlare.beginTime) : 'Data unavailable',
    endTime: latestFlare?.endTime ? formatDate(latestFlare.endTime) : 'Ongoing / Unspecified',
    activeRegion: latestFlare?.activeRegionNum ? `AR${latestFlare.activeRegionNum}` : (latestFlare?.sourceLocation || 'Unassigned'),
    totalCount7Days: flares.length,
  };

  // CME summary
  const sortedCMEs = [...cmes].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  const latestCME = sortedCMEs[0] || null;

  let estimatedSpeed: number | null = null;
  let earthDirected = false;
  let cmeDirection = 'Heliospheric propagation';

  if (latestCME?.cmeAnalyses && latestCME.cmeAnalyses.length > 0) {
    const primaryAnalysis = latestCME.cmeAnalyses.find((a) => a.isMostAccurate) || latestCME.cmeAnalyses[0];
    estimatedSpeed = primaryAnalysis.speed || null;

    if (primaryAnalysis.enlilList && primaryAnalysis.enlilList.length > 0) {
      const enlil = primaryAnalysis.enlilList[0];
      if (enlil.impactList && enlil.impactList.some((imp) => typeof imp?.isLocation === 'string' && imp.isLocation.toLowerCase().includes('earth'))) {
        earthDirected = true;
        cmeDirection = 'Earth-directed Trajectory';
      }
    }
  }

  const cmeSummary: CMESummary = {
    recentCount: cmes.length,
    latestCME,
    startTime: latestCME?.startTime ? formatDate(latestCME.startTime) : 'Data unavailable',
    estimatedSpeed,
    direction: cmeDirection,
    earthDirected,
  };

  // GST Summary
  const sortedStorms = [...storms].sort(
    (a, b) => new Date(b.startTime).getTime() - new Date(a.startTime).getTime()
  );
  const latestStorm = sortedStorms[0] || null;
  let maxKp = 0;
  if (latestStorm?.allKpIndex) {
    maxKp = Math.max(...latestStorm.allKpIndex.map((k) => k.kpIndex), 0);
  }
  const gScale = calculateKpSeverity(maxKp);

  const gstSummary: GSTSummary = {
    latestStorm,
    gScale,
    kpMax: maxKp,
    startTime: latestStorm?.startTime ? formatDate(latestStorm.startTime) : 'No recent storm',
    description: gScale !== 'None' ? `${gScale} Geomagnetic Storm (Max Kp: ${maxKp})` : 'Quiet Geomagnetic Field',
    associatedEventId: latestStorm?.linkedEvents?.[0]?.activityID || null,
  };

  // SEP Summary
  const sortedSEPs = [...seps].sort(
    (a, b) => new Date(b.eventTime).getTime() - new Date(a.eventTime).getTime()
  );
  const latestSEP = sortedSEPs[0] || null;

  const sepSummary: SEPSummary = {
    latestEvent: latestSEP,
    eventTime: latestSEP?.eventTime ? formatDate(latestSEP.eventTime) : 'No recent SEP event',
    instrumentList: latestSEP?.instruments?.map((i) => i.displayName) || ['GOES Energetic Particle Sensor'],
    associatedEventId: latestSEP?.linkedEvents?.[0]?.activityID || null,
    recentCount: seps.length,
  };

  // Calculate Conditions Matrix
  const conditions: ConditionsStatus = calculateConditions(flares, cmes, storms, seps);

  // Generate Space Weather Timeline Events
  const events: SpaceWeatherEvent[] = generateEventTimeline(flares, cmes, storms, seps, shocks);

  // Generate Chart Data Points (sorted chronologically)
  const chartData: ChartDataPoint[] = generateChartData(flares);

  // Generate Dynamic Summary Text
  const summaryText = generateDynamicSummary(flares.length, cmes.length, storms.length, seps.length, latestFlare, gScale);

  return {
    fetchedAt: new Date().toISOString(),
    summaryText,
    flareSummary,
    cmeSummary,
    gstSummary,
    sepSummary,
    conditions,
    events,
    chartData,
    isFallbackData: isFallback,
  };
}

function calculateConditions(
  flares: NASASolarFlare[],
  cmes: NASACME[],
  storms: NASAGeomagneticStorm[],
  seps: NASASolarEnergeticParticle[]
): ConditionsStatus {
  const hasX = flares.some((f) => f.classType.toUpperCase().startsWith('X'));
  const hasM = flares.some((f) => f.classType.toUpperCase().startsWith('M'));
  const hasC = flares.some((f) => f.classType.toUpperCase().startsWith('C'));
  const hasSEP = seps.length > 0;
  const hasStrongStorm = storms.some((s) => s.allKpIndex.some((k) => k.kpIndex >= 6));
  const hasMinorStorm = storms.some((s) => s.allKpIndex.some((k) => k.kpIndex >= 5));

  let solarActivity: ConditionsStatus['solarActivity'] = 'LOW';
  if (hasX) solarActivity = 'EXTREME';
  else if (hasM) solarActivity = 'HIGH';
  else if (hasC) solarActivity = 'ELEVATED';

  let radioComm: ConditionsStatus['radioComm'] = 'LOW';
  if (hasX) radioComm = 'EXTREME';
  else if (hasM) radioComm = 'HIGH';
  else if (hasC) radioComm = 'MODERATE';

  let satelliteEnv: ConditionsStatus['satelliteEnv'] = 'LOW';
  if (hasSEP || hasStrongStorm) satelliteEnv = 'HIGH';
  else if (hasM || hasMinorStorm) satelliteEnv = 'ELEVATED';

  let navigation: ConditionsStatus['navigation'] = 'LOW';
  if (hasStrongStorm) navigation = 'EXTREME';
  else if (hasMinorStorm || hasM) navigation = 'HIGH';
  else if (hasC) navigation = 'MODERATE';

  let radiation: ConditionsStatus['radiation'] = 'LOW';
  if (hasSEP && hasX) radiation = 'EXTREME';
  else if (hasSEP) radiation = 'HIGH';
  else if (hasM) radiation = 'ELEVATED';

  return {
    solarActivity,
    satelliteEnv,
    radioComm,
    navigation,
    radiation,
  };
}

function generateEventTimeline(
  flares: NASASolarFlare[],
  cmes: NASACME[],
  storms: NASAGeomagneticStorm[],
  seps: NASASolarEnergeticParticle[],
  shocks: NASAInterplanetaryShock[]
): SpaceWeatherEvent[] {
  const list: SpaceWeatherEvent[] = [];

  flares.forEach((f) => {
    const cat = getFlareCategory(f.classType);
    const severity = getFlareSeverityLabel(cat);
    list.push({
      id: f.flrID || `FLR-${f.beginTime}`,
      type: 'FLARE',
      title: `Solar Flare ${f.classType}`,
      timestamp: f.beginTime,
      description: `Solar flare of class ${f.classType} detected from ${f.sourceLocation || 'active region'}. Peak time: ${f.peakTime || f.beginTime}.`,
      severity,
      details: {
        classType: f.classType,
        location: f.sourceLocation || 'Sun Disk',
        activeRegion: f.activeRegionNum || undefined,
        rawLink: f.link,
      },
    });
  });

  cmes.forEach((c) => {
    const primaryAnalysis = c.cmeAnalyses?.[0];
    const speed = primaryAnalysis?.speed;
    const isEarth = primaryAnalysis?.enlilList?.some((e) =>
      e.impactList?.some((imp) => typeof imp?.isLocation === 'string' && imp.isLocation.toLowerCase().includes('earth'))
    );
    list.push({
      id: c.activityID || `CME-${c.startTime}`,
      type: 'CME',
      title: `Coronal Mass Ejection`,
      timestamp: c.startTime,
      description: `CME observed at ${formatDate(c.startTime)} with speed ${speed ? `${speed} km/s` : 'unspecified'}.${isEarth ? ' Earth-directed trajectory modeled.' : ''}`,
      severity: speed && speed > 800 ? 'High' : speed && speed > 500 ? 'Elevated' : 'Moderate',
      details: {
        speed: speed || undefined,
        location: c.sourceLocation || 'Solar Corona',
        earthDirected: isEarth,
        rawLink: c.link,
      },
    });
  });

  storms.forEach((s) => {
    const maxKp = Math.max(...(s.allKpIndex?.map((k) => k.kpIndex) || [0]), 0);
    const gRating = calculateKpSeverity(maxKp);
    list.push({
      id: s.gstID || `GST-${s.startTime}`,
      type: 'GST',
      title: `Geomagnetic Storm (${gRating})`,
      timestamp: s.startTime,
      description: `Geomagnetic disturbance reached peak Kp index ${maxKp} (${gRating} storm rating).`,
      severity: maxKp >= 7 ? 'Extreme' : maxKp >= 6 ? 'High' : maxKp >= 5 ? 'Elevated' : 'Moderate',
      details: {
        kpMax: maxKp,
        gRating,
        rawLink: s.link,
      },
    });
  });

  seps.forEach((sep) => {
    list.push({
      id: sep.sepID || `SEP-${sep.eventTime}`,
      type: 'SEP',
      title: `Solar Energetic Particle Event`,
      timestamp: sep.eventTime,
      description: `High-energy solar particle stream detected by orbiting spacecraft detectors.`,
      severity: 'High',
      details: {
        rawLink: sep.link,
      },
    });
  });

  shocks.forEach((sh) => {
    list.push({
      id: sh.activityID || `IPS-${sh.eventTime}`,
      type: 'IPS',
      title: `Interplanetary Shock`,
      timestamp: sh.eventTime,
      description: `Interplanetary shock front recorded at ${sh.location || 'heliospheric monitor'}.`,
      severity: 'Moderate',
      details: {
        location: sh.location || undefined,
        rawLink: sh.link,
      },
    });
  });

  // Sort newest first
  return list.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
}

function generateChartData(flares: NASASolarFlare[]): ChartDataPoint[] {
  const sorted = [...flares].sort(
    (a, b) => new Date(a.beginTime).getTime() - new Date(b.beginTime).getTime()
  );

  return sorted.map((f) => {
    const d = new Date(f.beginTime);
    const category = getFlareCategory(f.classType);
    const numericIntensity = getNumericFlareIntensity(f.classType);

    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      fullDate: d.toISOString(),
      flareClass: f.classType,
      numericIntensity,
      category,
      activeRegion: f.activeRegionNum ? `AR${f.activeRegionNum}` : f.sourceLocation || 'Disk',
    };
  });
}

function generateDynamicSummary(
  flareCount: number,
  cmeCount: number,
  stormCount: number,
  sepCount: number,
  latestFlare: NASASolarFlare | null,
  gScale: StormSeverity
): string {
  if (flareCount === 0 && cmeCount === 0 && stormCount === 0) {
    return 'Insufficient recent observations detected in the current NASA space weather polling period.';
  }

  const parts: string[] = [];
  if (flareCount > 0) {
    parts.push(`${flareCount} solar flare${flareCount > 1 ? 's' : ''}`);
  }
  if (cmeCount > 0) {
    parts.push(`${cmeCount} coronal mass ejection${cmeCount > 1 ? 's' : ''}`);
  }
  if (stormCount > 0) {
    parts.push(`${stormCount} geomagnetic storm event${stormCount > 1 ? 's' : ''}`);
  }
  if (sepCount > 0) {
    parts.push(`${sepCount} energetic particle event${sepCount > 1 ? 's' : ''}`);
  }

  let text = `Recent NASA DONKI telemetry recorded ${parts.join(', ')}.`;
  if (latestFlare) {
    text += ` The strongest recent solar flare was rated ${latestFlare.classType} originating from region ${latestFlare.activeRegionNum ? `AR${latestFlare.activeRegionNum}` : 'on the solar disk'}.`;
  }
  if (gScale !== 'None') {
    text += ` Geomagnetic field activity peaked at ${gScale} levels.`;
  } else {
    text += ` Earth's magnetosphere remains in a relatively quiet state.`;
  }

  return text;
}

export function formatDate(isoStr: string): string {
  if (!isoStr) return 'N/A';
  try {
    const d = new Date(isoStr);
    if (isNaN(d.getTime())) return isoStr;
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });
  } catch {
    return isoStr;
  }
}

// Fallback Data generator for fallback mode or preview
export function getFallbackSolarWatchData(): SolarWatchPayload {
  const now = new Date();
  const daysAgo = (d: number, hours = 0) => {
    const date = new Date(now.getTime() - (d * 86400 + hours * 3600) * 1000);
    return date.toISOString();
  };

  const fallbackFlares: NASASolarFlare[] = [
    {
      flrID: '2026-09-30-FLR-001',
      beginTime: daysAgo(0, 4),
      peakTime: daysAgo(0, 3.5),
      endTime: daysAgo(0, 3),
      classType: 'M2.4',
      sourceLocation: 'N18E42',
      activeRegionNum: 3842,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/FLR/3842',
    },
    {
      flrID: '2026-09-29-FLR-002',
      beginTime: daysAgo(1, 10),
      peakTime: daysAgo(1, 9),
      endTime: daysAgo(1, 8.5),
      classType: 'M1.8',
      sourceLocation: 'S20W12',
      activeRegionNum: 3840,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/FLR/3840',
    },
    {
      flrID: '2026-09-28-FLR-003',
      beginTime: daysAgo(2, 6),
      peakTime: daysAgo(2, 5.8),
      endTime: daysAgo(2, 5.2),
      classType: 'X1.1',
      sourceLocation: 'N15E30',
      activeRegionNum: 3842,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/FLR/3842',
    },
    {
      flrID: '2026-09-27-FLR-004',
      beginTime: daysAgo(3, 14),
      peakTime: daysAgo(3, 13.5),
      endTime: daysAgo(3, 13),
      classType: 'C8.5',
      sourceLocation: 'N10W05',
      activeRegionNum: 3838,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/FLR/3838',
    },
    {
      flrID: '2026-09-26-FLR-005',
      beginTime: daysAgo(4, 8),
      peakTime: daysAgo(4, 7.5),
      endTime: daysAgo(4, 7),
      classType: 'C5.2',
      sourceLocation: 'S15E50',
      activeRegionNum: 3845,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/FLR/3845',
    },
    {
      flrID: '2026-09-25-FLR-006',
      beginTime: daysAgo(5, 18),
      peakTime: daysAgo(5, 17.2),
      endTime: daysAgo(5, 16.5),
      classType: 'M4.6',
      sourceLocation: 'N18E42',
      activeRegionNum: 3842,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/FLR/3842',
    },
    {
      flrID: '2026-09-24-FLR-007',
      beginTime: daysAgo(6, 12),
      peakTime: daysAgo(6, 11.5),
      endTime: daysAgo(6, 11),
      classType: 'C3.1',
      sourceLocation: 'S10W30',
      activeRegionNum: 3835,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/FLR/3835',
    },
  ];

  const fallbackCMEs: NASACME[] = [
    {
      activityID: '2026-09-30-CME-001',
      startTime: daysAgo(0, 5),
      sourceLocation: 'N18E42',
      activeRegionNum: 3842,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CME/001',
      cmeAnalyses: [
        {
          isMostAccurate: true,
          latitude: 18,
          longitude: 42,
          halfAngle: 35,
          speed: 720,
          type: 'Halo',
          note: 'Fast halo coronal mass ejection.',
          enlilList: [
            {
              modelURL: 'https://ccmc.gsfc.nasa.gov/donki',
              impactList: [{ isLocation: 'Earth', arrivalTime: daysAgo(-2, 0) }],
              estimatedSpeed: 700,
              estimatedShockArrivalTime: daysAgo(-2, 0),
            },
          ],
        },
      ],
    },
    {
      activityID: '2026-09-28-CME-002',
      startTime: daysAgo(2, 7),
      sourceLocation: 'N15E30',
      activeRegionNum: 3842,
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/CME/002',
      cmeAnalyses: [
        {
          isMostAccurate: true,
          latitude: 15,
          longitude: 30,
          halfAngle: 45,
          speed: 1150,
          type: 'Full Halo',
          note: 'Associated with X1.1 flare eruption.',
          enlilList: [
            {
              modelURL: 'https://ccmc.gsfc.nasa.gov/donki',
              impactList: [{ isLocation: 'Earth', arrivalTime: daysAgo(0, 2) }],
              estimatedSpeed: 1100,
            },
          ],
        },
      ],
    },
  ];

  const fallbackStorms: NASAGeomagneticStorm[] = [
    {
      gstID: '2026-09-29-GST-001',
      startTime: daysAgo(1, 2),
      allKpIndex: [
        { observedTime: daysAgo(1, 2), kpIndex: 5, source: 'NOAA WPC' },
        { observedTime: daysAgo(1, 5), kpIndex: 6.33, source: 'NOAA WPC' },
        { observedTime: daysAgo(1, 8), kpIndex: 5.67, source: 'NOAA WPC' },
      ],
      linkedEvents: [{ activityID: '2026-09-28-CME-002' }],
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/GST/001',
    },
  ];

  const fallbackSEPs: NASASolarEnergeticParticle[] = [
    {
      sepID: '2026-09-28-SEP-001',
      eventTime: daysAgo(2, 6.5),
      instruments: [{ displayName: 'GOES-18 SEISS' }, { displayName: 'ACE EPAM' }],
      linkedEvents: [{ activityID: '2026-09-28-FLR-003' }],
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/SEP/001',
    },
  ];

  const fallbackShocks: NASAInterplanetaryShock[] = [
    {
      activityID: '2026-09-29-IPS-001',
      eventTime: daysAgo(1, 1),
      location: 'L1 Lagrange Point (DSCOVR)',
      link: 'https://webtools.ccmc.gsfc.nasa.gov/DONKI/view/IPS/001',
    },
  ];

  return transformDONKIData(
    fallbackFlares,
    fallbackCMEs,
    fallbackStorms,
    fallbackSEPs,
    fallbackShocks,
    true
  );
}
