'use client';

import React, { useState } from 'react';
import { ConditionsStatus } from '@/lib/nasa/types';
import { ShieldCheck, Info, ChevronDown, ChevronUp, Satellite, Radio, Compass, ShieldAlert, Sun } from 'lucide-react';

interface SpaceWeatherConditionsProps {
  conditions: ConditionsStatus;
}

export const SpaceWeatherConditions: React.FC<SpaceWeatherConditionsProps> = ({ conditions }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getStatusColor = (val: string) => {
    switch (val) {
      case 'LOW':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'MODERATE':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'ELEVATED':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'HIGH':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'EXTREME':
        return 'bg-red-500/20 text-red-400 border-red-500/30 animate-pulse';
      default:
        return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const domainCards = [
    {
      title: 'Solar Activity',
      icon: Sun,
      value: conditions.solarActivity,
      desc: 'Active regions, flare frequency, and plasma dynamics',
    },
    {
      title: 'Satellite Environment',
      icon: Satellite,
      value: conditions.satelliteEnv,
      desc: 'Orbital atmospheric drag & surface electrostatic charging',
    },
    {
      title: 'Radio Communication',
      icon: Radio,
      value: conditions.radioComm,
      desc: 'HF radio absorption & ionospheric D-region ionization',
    },
    {
      title: 'Navigation (GPS)',
      icon: Compass,
      value: conditions.navigation,
      desc: 'GNSS signal scintillations & TEC phase errors',
    },
    {
      title: 'Space Radiation',
      icon: ShieldAlert,
      value: conditions.radiation,
      desc: 'Proton flux levels for high-altitude flight & astronauts',
    },
  ];

  return (
    <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 my-8 shadow-2xl relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/5 blur-3xl pointer-events-none" />

      {/* Reticles */}
      <div className="absolute top-3 left-3 font-mono text-[9px] text-cyan-400/30">+ RISK EVAL MATRIX</div>
      <div className="absolute top-3 right-3 font-mono text-[9px] text-cyan-400/30">+ DOMAIN INDEX 05</div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-cyan-400" />
            <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
              Current Space Weather Conditions
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time multi-domain environmental status assessment
          </p>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-space-950 border border-cyan-500/30 text-xs font-mono text-cyan-300 hover:bg-cyan-500/10 transition-colors"
        >
          <Info className="w-4 h-4 text-cyan-400" />
          <span>How is this calculated?</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Disclaimer banner required by prompt */}
      <div className="mb-6 p-3 rounded-xl bg-cyan-950/30 border border-cyan-500/20 text-xs text-cyan-200 flex items-start gap-2">
        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <strong>Educational Disclaimer:</strong> These status levels represent an automated educational interpretation based on recent space-weather observations. They are not official NOAA or NASA operational warnings or emergency risk ratings.
        </div>
      </div>

      {/* Expandable Explanation Panel */}
      {showExplanation && (
        <div className="mb-6 p-5 rounded-2xl bg-space-950/90 border border-white/10 text-xs text-slate-300 space-y-3 font-mono">
          <h4 className="font-bold text-cyan-300 text-sm border-b border-white/10 pb-2">
            Algorithm & NASA Threshold Methodology:
          </h4>
          <ul className="list-disc list-inside space-y-2 text-slate-300">
            <li>
              <strong className="text-amber-300">Solar Activity:</strong> Scaled by peak flare classes recorded in the last 72 hours (X-class → EXTREME, M-class → HIGH, C-class → ELEVATED).
            </li>
            <li>
              <strong className="text-cyan-300">Satellite Environment:</strong> Evaluates Solar Energetic Particle (SEP) proton events and geomagnetic Kp disturbance index affecting satellite drag and surface charging.
            </li>
            <li>
              <strong className="text-purple-300">Radio Communication:</strong> Based on GOES solar X-ray flux causing ionospheric D-region radio blackouts (R1 to R5 scale).
            </li>
            <li>
              <strong className="text-emerald-300">Navigation (GPS):</strong> Evaluated via geomagnetic storm intensity (G1 to G5) causing Total Electron Content (TEC) ionospheric fluctuations.
            </li>
            <li>
              <strong className="text-red-300">Radiation Environment:</strong> Measures high-energy proton flux (&gt;10 MeV) levels critical for polar aviation and extravehicular astronaut activities.
            </li>
          </ul>
        </div>
      )}

      {/* 5 Domain Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {domainCards.map((domain) => {
          const Icon = domain.icon;
          const statusClass = getStatusColor(domain.value);

          return (
            <div
              key={domain.title}
              className="bg-space-950/70 p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-white/5 text-cyan-400">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">{domain.title}</h4>
                <p className="text-[10px] text-slate-400 leading-tight mb-4">{domain.desc}</p>
              </div>

              <div>
                <div className={`w-full py-2 px-3 rounded-xl border text-center font-mono text-xs font-bold tracking-wider ${statusClass}`}>
                  {domain.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
