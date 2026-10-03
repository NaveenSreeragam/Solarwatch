'use client';

import React from 'react';
import { Sun, Flame, Wind, Compass, ShieldAlert, Radio, Clock, AlertTriangle, ExternalLink } from 'lucide-react';
import { FlareSummary, CMESummary, GSTSummary, SEPSummary } from '@/lib/nasa/types';

interface ParametersGridProps {
  flareSummary: FlareSummary;
  cmeSummary: CMESummary;
  gstSummary: GSTSummary;
  sepSummary: SEPSummary;
}

export const ParametersGrid: React.FC<ParametersGridProps> = ({
  flareSummary,
  cmeSummary,
  gstSummary,
  sepSummary,
}) => {
  return (
    <section className="my-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="font-heading text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Sun className="w-6 h-6 text-amber-400" />
            <span>Key Space-Weather Telemetry</span>
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time observational telemetry from NASA DONKI sensors
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[11px] font-mono text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            4 PRIMARY INSTRUMENT DOMAINS
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CARD 1: SOLAR FLARES */}
        <div className="relative glass-panel p-6 rounded-2xl border border-white/10 hover:border-amber-500/40 transition-all group flex flex-col justify-between shadow-lg">
          <div className="absolute top-2 left-2 font-mono text-[9px] text-amber-400/30">+ FLR-SENS</div>
          <div className="absolute top-2 right-2 font-mono text-[9px] text-amber-400/30">+ AR-OBS</div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                  <Flame className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  1. Solar Flares
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                flareSummary.category === 'X'
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : flareSummary.category === 'M'
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : flareSummary.category === 'C'
                  ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                  : 'bg-slate-500/20 text-slate-400 border border-slate-500/30'
              }`}>
                {flareSummary.severityLabel}
              </span>
            </div>

            {/* Flare Class Display */}
            <div className="mb-4">
              <div className="text-3xl font-extrabold font-mono text-amber-400 tracking-tight">
                {flareSummary.classType}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <span>Region:</span>
                <span className="text-slate-200 font-mono font-semibold">{flareSummary.activeRegion}</span>
              </div>
            </div>

            {/* Flare Times */}
            <div className="space-y-2 text-xs font-mono bg-space-950/60 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-slate-400">
                <span>Start Time:</span>
                <span className="text-slate-200">{flareSummary.startTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Peak Time:</span>
                <span className="text-amber-300 font-semibold">{flareSummary.peakTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>End Time:</span>
                <span className="text-slate-200">{flareSummary.endTime}</span>
              </div>
            </div>
          </div>

          {/* Flare Class Legend */}
          <div className="mt-4 pt-3 border-t border-white/5">
            <div className="text-[10px] font-mono text-slate-400 mb-1">Class Scale Guide:</div>
            <div className="grid grid-cols-4 gap-1 text-[9px] font-mono text-center">
              <span className="bg-slate-800 text-slate-400 py-0.5 rounded">A/B: Low</span>
              <span className="bg-cyan-950 text-cyan-400 py-0.5 rounded">C: Mod</span>
              <span className="bg-amber-950 text-amber-400 py-0.5 rounded">M: High</span>
              <span className="bg-red-950 text-red-400 py-0.5 rounded">X: Extr</span>
            </div>
          </div>
        </div>

        {/* CARD 2: CORONAL MASS EJECTIONS */}
        <div className="relative glass-panel p-6 rounded-2xl border border-white/10 hover:border-cyan-500/40 transition-all group flex flex-col justify-between shadow-lg">
          <div className="absolute top-2 left-2 font-mono text-[9px] text-cyan-400/30">+ CME-ANALYSIS</div>
          <div className="absolute top-2 right-2 font-mono text-[9px] text-cyan-400/30">+ LASCO C2/C3</div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                  <Wind className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  2. Coronal Mass Eruptions
                </span>
              </div>
              {cmeSummary.earthDirected ? (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 animate-pulse">
                  Earth Directed
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-slate-400 bg-slate-800 border border-slate-700">
                  Standard
                </span>
              )}
            </div>

            <div className="mb-4">
              <div className="text-3xl font-extrabold font-mono text-cyan-400 tracking-tight">
                {cmeSummary.estimatedSpeed ? `${cmeSummary.estimatedSpeed} km/s` : 'Plasma Ejection'}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <span>Recent 14-day count:</span>
                <span className="text-cyan-300 font-mono font-semibold">{cmeSummary.recentCount} events</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono bg-space-950/60 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-slate-400">
                <span>Latest CME Start:</span>
                <span className="text-slate-200">{cmeSummary.startTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Trajectory:</span>
                <span className="text-cyan-300 truncate max-w-[130px]" title={cmeSummary.direction}>
                  {cmeSummary.direction}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Heliospheric Speed:</span>
                <span className="text-slate-200">
                  {cmeSummary.estimatedSpeed ? `${cmeSummary.estimatedSpeed} km/s` : 'Estimating...'}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] text-slate-400 leading-tight">
            High-speed plasma eruptions interact with Earth's magnetosphere within 1-3 days.
          </div>
        </div>

        {/* CARD 3: GEOMAGNETIC ACTIVITY */}
        <div className="relative glass-panel p-6 rounded-2xl border border-white/10 hover:border-purple-500/40 transition-all group flex flex-col justify-between shadow-lg">
          <div className="absolute top-2 left-2 font-mono text-[9px] text-purple-400/30">+ MAGNETO-SENS</div>
          <div className="absolute top-2 right-2 font-mono text-[9px] text-purple-400/30">+ KP-INDEX</div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  3. Geomagnetic Storms
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                gstSummary.gScale !== 'None'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {gstSummary.gScale !== 'None' ? gstSummary.gScale : 'Quiet Field'}
              </span>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-extrabold font-mono text-purple-300 tracking-tight">
                {gstSummary.gScale !== 'None' ? gstSummary.gScale : 'G0 Quiet'}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <span>Peak Planetary Kp Index:</span>
                <span className="text-purple-300 font-mono font-semibold">{gstSummary.kpMax}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono bg-space-950/60 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-slate-400">
                <span>Storm Commencement:</span>
                <span className="text-slate-200">{gstSummary.startTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Field Status:</span>
                <span className="text-purple-200 truncate max-w-[130px]" title={gstSummary.description}>
                  {gstSummary.description}
                </span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Associated ID:</span>
                <span className="text-slate-300">{gstSummary.associatedEventId || 'Isolated Field'}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5 text-[10px] font-mono text-slate-400">
            NOAA Scale: G1 (Minor) to G5 (Extreme). Kp index measures magnetic perturbation.
          </div>
        </div>

        {/* CARD 4: SOLAR ENERGETIC PARTICLES */}
        <div className="relative glass-panel p-6 rounded-2xl border border-white/10 hover:border-red-500/40 transition-all group flex flex-col justify-between shadow-lg">
          <div className="absolute top-2 left-2 font-mono text-[9px] text-red-400/30">+ SEP-FLUX</div>
          <div className="absolute top-2 right-2 font-mono text-[9px] text-red-400/30">+ RAD-MONITOR</div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400">
                  <ShieldAlert className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono font-bold tracking-wider text-slate-300 uppercase">
                  4. Solar Energetic Particles
                </span>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                sepSummary.recentCount > 0
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {sepSummary.recentCount > 0 ? 'Active Event' : 'Nominal Flux'}
              </span>
            </div>

            <div className="mb-4">
              <div className="text-3xl font-extrabold font-mono text-red-400 tracking-tight">
                {sepSummary.recentCount > 0 ? `${sepSummary.recentCount} Events` : 'Baseline Flux'}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                <span>Sensors:</span>
                <span className="text-red-300 font-mono text-[11px] truncate">
                  {sepSummary.instrumentList.join(', ')}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono bg-space-950/60 p-3 rounded-xl border border-white/5">
              <div className="flex justify-between text-slate-400">
                <span>Onset Time:</span>
                <span className="text-slate-200">{sepSummary.eventTime}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>Linked Event:</span>
                <span className="text-red-300">{sepSummary.associatedEventId || 'Solar Disk Flare'}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/5">
            <div className="p-2 rounded bg-red-950/30 border border-red-500/20 text-[10px] text-red-200 leading-tight">
              <strong>Why SEP Matters:</strong> High-energy protons elevate radiation risks for astronauts on extravehicular activities & degrade satellite solar panels.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
