'use client';

import React, { useState } from 'react';
import { ConditionsStatus } from '@/lib/nasa/types';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface SpaceWeatherConditionsProps {
  conditions: ConditionsStatus;
}

export const SpaceWeatherConditions: React.FC<SpaceWeatherConditionsProps> = ({ conditions }) => {
  const [showExplanation, setShowExplanation] = useState(false);

  const getStatusColor = (val: string) => {
    switch (val) {
      case 'LOW':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'MODERATE':
        return 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20';
      case 'ELEVATED':
        return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20';
      case 'HIGH':
        return 'bg-orange-500/10 text-orange-300 border-orange-500/20';
      case 'EXTREME':
        return 'bg-red-500/10 text-red-400 border-red-500/30 animate-pulse';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const domainCards = [
    {
      title: 'Solar Activity',
      value: conditions.solarActivity,
      desc: 'Active regions, flare frequency, and magnetic reconnections',
    },
    {
      title: 'Satellite Environment',
      value: conditions.satelliteEnv,
      desc: 'Orbital atmospheric drag & surface electrostatic charging',
    },
    {
      title: 'Radio Communication',
      value: conditions.radioComm,
      desc: 'Ionospheric absorption & high-frequency radio signal paths',
    },
    {
      title: 'Navigation (GPS)',
      value: conditions.navigation,
      desc: 'GNSS signal scintillations & phase delay fluctuations',
    },
    {
      title: 'Space Radiation',
      value: conditions.radiation,
      desc: 'Proton flux levels for high-altitude aviation & astronauts',
    },
  ];

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-space-900/40 border border-white/[0.08] my-14">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
            Environmental Condition Status
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Multi-domain space weather conditions derived from current NASA observations
          </p>
        </div>

        <button
          onClick={() => setShowExplanation(!showExplanation)}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-slate-300 hover:text-white hover:bg-white/[0.08] transition-colors"
        >
          <span>Methodology Guide</span>
          {showExplanation ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Explanation Panel */}
      {showExplanation && (
        <div className="mb-6 p-5 rounded-2xl bg-space-950/80 border border-white/[0.08] text-xs text-slate-300 space-y-3 font-sans">
          <h4 className="font-bold text-cyan-300 font-mono text-xs uppercase tracking-wider border-b border-white/[0.08] pb-2">
            Observation & Analysis Methodology
          </h4>
          <ul className="list-disc list-inside space-y-1.5 text-slate-300 font-light">
            <li>
              <strong className="font-medium text-white">Solar Activity:</strong> Scaled by peak X-ray flare classifications observed in recent orbits.
            </li>
            <li>
              <strong className="font-medium text-white">Satellite Environment:</strong> Tracks Solar Energetic Particle (SEP) flux and geomagnetic Kp indices.
            </li>
            <li>
              <strong className="font-medium text-white">Radio Communication:</strong> Correlated with GOES solar X-ray ionizing solar flux.
            </li>
            <li>
              <strong className="font-medium text-white">Navigation (GPS):</strong> Evaluated against Total Electron Content (TEC) ionospheric phase delays.
            </li>
            <li>
              <strong className="font-medium text-white">Space Radiation:</strong> Proton flux (&gt;10 MeV) levels relevant for astronaut safety and high-altitude flight.
            </li>
          </ul>
        </div>
      )}

      {/* 5 Domain Status Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {domainCards.map((domain) => {
          const statusClass = getStatusColor(domain.value);

          return (
            <div
              key={domain.title}
              className="bg-space-900/40 p-5 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all flex flex-col justify-between"
            >
              <div className="mb-4">
                <h4 className="text-sm font-semibold text-white mb-1.5">{domain.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-light">{domain.desc}</p>
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
