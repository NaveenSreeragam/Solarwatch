'use client';

import React from 'react';
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
    <section className="my-14">
      <div className="mb-8">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight">
          Key Telemetry Parameters
        </h2>
        <p className="text-xs text-slate-400 font-mono mt-1">
          Real-time space weather observations from NASA DONKI sensors
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* CARD 1: SOLAR FLARES */}
        <div className="group relative p-6 rounded-2xl bg-space-900/50 border border-white/[0.08] hover:border-amber-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                Solar Flares
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
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

            <div className="mb-6">
              <div className="text-3xl font-extrabold font-mono text-amber-400 tracking-tight">
                {flareSummary.classType}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Active Region: <span className="text-slate-200 font-mono font-medium">{flareSummary.activeRegion}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 pt-3 border-t border-white/[0.06]">
              <div className="flex justify-between">
                <span className="text-slate-400">Peak Time</span>
                <span className="text-amber-300">{flareSummary.peakTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Start</span>
                <span>{flareSummary.startTime}</span>
              </div>
            </div>
          </div>

          {/* Hover Explanation Tooltip */}
          <div className="pointer-events-none absolute left-0 right-0 -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[calc(100%+8px)] transition-all duration-200 z-30 px-4 py-3 rounded-xl bg-space-950/95 border border-amber-500/30 shadow-xl text-xs text-slate-300 backdrop-blur-md">
            <div className="font-semibold text-amber-400 mb-1 flex items-center gap-1.5 font-heading">
              <span>What are Solar Flares?</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              Intense bursts of electromagnetic radiation released from solar active regions (sunspots). Classified from A (weakest) to X (strongest), they can cause immediate high-frequency radio blackouts on Earth.
            </p>
          </div>
        </div>

        {/* CARD 2: CME ERUPTIONS */}
        <div className="group relative p-6 rounded-2xl bg-space-900/50 border border-white/[0.08] hover:border-cyan-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                Coronal Mass Ejection
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                cmeSummary.earthDirected
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
              }`}>
                {cmeSummary.earthDirected ? 'Earth Directed' : 'Heliospheric'}
              </span>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-extrabold font-mono text-cyan-400 tracking-tight">
                {cmeSummary.estimatedSpeed ? `${cmeSummary.estimatedSpeed} km/s` : `${cmeSummary.recentCount} Detected`}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Trajectory: <span className="text-slate-200 font-mono font-medium">{cmeSummary.direction}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 pt-3 border-t border-white/[0.06]">
              <div className="flex justify-between">
                <span className="text-slate-400">Observed</span>
                <span>{cmeSummary.startTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">14-Day Total</span>
                <span className="text-cyan-300">{cmeSummary.recentCount} events</span>
              </div>
            </div>
          </div>

          {/* Hover Explanation Tooltip */}
          <div className="pointer-events-none absolute left-0 right-0 -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[calc(100%+8px)] transition-all duration-200 z-30 px-4 py-3 rounded-xl bg-space-950/95 border border-cyan-500/30 shadow-xl text-xs text-slate-300 backdrop-blur-md">
            <div className="font-semibold text-cyan-400 mb-1 flex items-center gap-1.5 font-heading">
              <span>What is a Coronal Mass Ejection (CME)?</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              Massive clouds of solar plasma and magnetic fields ejected from the Sun into space at speeds up to millions of mph. If Earth-directed, they trigger geomagnetic storms and auroras 1 to 3 days later.
            </p>
          </div>
        </div>

        {/* CARD 3: GEOMAGNETIC STORMS */}
        <div className="group relative p-6 rounded-2xl bg-space-900/50 border border-white/[0.08] hover:border-purple-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                Geomagnetic Field
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                gstSummary.gScale !== 'None'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {gstSummary.gScale !== 'None' ? `${gstSummary.gScale} Active` : 'Quiet'}
              </span>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-extrabold font-mono text-purple-300 tracking-tight">
                {gstSummary.gScale !== 'None' ? gstSummary.gScale : 'Kp 0–3'}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Status: <span className="text-slate-200 font-mono font-medium">{gstSummary.description}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 pt-3 border-t border-white/[0.06]">
              <div className="flex justify-between">
                <span className="text-slate-400">Max Kp Index</span>
                <span className="text-purple-300">{gstSummary.kpMax}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Onset Time</span>
                <span>{gstSummary.startTime}</span>
              </div>
            </div>
          </div>

          {/* Hover Explanation Tooltip */}
          <div className="pointer-events-none absolute left-0 right-0 -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[calc(100%+8px)] transition-all duration-200 z-30 px-4 py-3 rounded-xl bg-space-950/95 border border-purple-500/30 shadow-xl text-xs text-slate-300 backdrop-blur-md">
            <div className="font-semibold text-purple-300 mb-1 flex items-center gap-1.5 font-heading">
              <span>What is a Geomagnetic Storm?</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              Disturbances in Earth's magnetosphere caused by incoming solar wind energy or CMEs. Measured on the G-scale (G1 to G5) using the Kp index; severe storms threaten power grids and satellite operations while creating vivid auroras.
            </p>
          </div>
        </div>

        {/* CARD 4: ENERGETIC PARTICLES (SEP) */}
        <div className="group relative p-6 rounded-2xl bg-space-900/50 border border-white/[0.08] hover:border-red-500/30 transition-all flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs font-mono tracking-wider text-slate-400 uppercase">
                Solar Proton Flux
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium ${
                sepSummary.recentCount > 0
                  ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}>
                {sepSummary.recentCount > 0 ? 'Active Stream' : 'Normal Flux'}
              </span>
            </div>

            <div className="mb-6">
              <div className="text-3xl font-extrabold font-mono text-red-400 tracking-tight">
                {sepSummary.recentCount > 0 ? `${sepSummary.recentCount} SEP Events` : 'Baseline'}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Radiation: <span className="text-slate-200 font-mono font-medium">{sepSummary.recentCount > 0 ? 'Proton Enhancement' : 'Nominal Background'}</span>
              </div>
            </div>

            <div className="space-y-2 text-xs font-mono text-slate-300 pt-3 border-t border-white/[0.06]">
              <div className="flex justify-between">
                <span className="text-slate-400">Sensor Type</span>
                <span>{sepSummary.instrumentList[0] || 'GOES Sensor'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Event Time</span>
                <span>{sepSummary.eventTime}</span>
              </div>
            </div>
          </div>

          {/* Hover Explanation Tooltip */}
          <div className="pointer-events-none absolute left-0 right-0 -bottom-2 translate-y-full opacity-0 group-hover:opacity-100 group-hover:translate-y-[calc(100%+8px)] transition-all duration-200 z-30 px-4 py-3 rounded-xl bg-space-950/95 border border-red-500/30 shadow-xl text-xs text-slate-300 backdrop-blur-md">
            <div className="font-semibold text-red-400 mb-1 flex items-center gap-1.5 font-heading">
              <span>What is Solar Proton Flux (SEP)?</span>
            </div>
            <p className="leading-relaxed text-[11px] text-slate-300">
              Streams of high-energy protons accelerated by solar flares and CMEs. High particle flux poses biological radiation hazards for astronauts and high-latitude flights, and can cause single-event upsets in satellite electronics.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
