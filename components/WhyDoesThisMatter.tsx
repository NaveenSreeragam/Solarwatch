'use client';

import React from 'react';
import { Satellite, Radio, Compass, Zap, ShieldAlert, AlertCircle, ArrowUpRight } from 'lucide-react';

export const WhyDoesThisMatter: React.FC = () => {
  const impacts = [
    {
      title: 'Satellites & Orbital Fleets',
      icon: Satellite,
      color: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30 text-cyan-400',
      tag: '01 // ORBITAL RISKS',
      summary: 'Spacecraft surface charging, single-event microchip upsets, and upper atmospheric heating causing satellite orbital decay.',
      details: [
        'Geomagnetic heating expands Earth’s thermosphere, increasing atmospheric drag on LEO satellites.',
        'Relativistic electron flux causes electrostatic discharge (ESD) in sensitive space electronics.',
        'Solar array degradation accelerates during high-intensity solar energetic particle events.',
      ],
    },
    {
      title: 'HF Radio & Communications',
      icon: Radio,
      color: 'from-amber-500/20 to-orange-600/10 border-amber-500/30 text-amber-400',
      tag: '02 // SPECTRUM BLACKOUT',
      summary: 'Solar X-ray bursts ionize Earth’s D-region ionosphere, causing complete high-frequency (HF) radio blackouts.',
      details: [
        'Commercial aviation relying on polar HF radio routes experience loss of transoceanic contact.',
        'Emergency response communications using shortwave HF frequency bands are disrupted.',
        'Satellite-to-ground telemetry experiences signal degradation and phase jitter.',
      ],
    },
    {
      title: 'GPS & GNSS Navigation',
      icon: Compass,
      color: 'from-blue-500/20 to-indigo-600/10 border-blue-500/30 text-blue-400',
      tag: '03 // FREQUENCY scintillation',
      summary: 'Ionospheric Total Electron Content (TEC) fluctuations cause satellite signal delays, positioning errors, and loss of lock.',
      details: [
        'Precision agriculture, maritime navigation, and autonomous machinery lose sub-meter accuracy.',
        'Commercial aviation GPS receivers experience dilution of precision during strong storms.',
        'Ionospheric plasma bubbles introduce signal phase scintillations across equatorial & polar latitudes.',
      ],
    },
    {
      title: 'Terrestrial Power Grids',
      icon: Zap,
      color: 'from-purple-500/20 to-pink-600/10 border-purple-500/30 text-purple-400',
      tag: '04 // GIC INDUCTION',
      summary: 'Fluctuating magnetic fields induce currents in long-distance high-voltage power transmission grids.',
      details: [
        'Geomagnetically Induced Currents (GIC) cause transformer core saturation and overheating.',
        'Voltage instability and harmonic distortion can trigger cascading regional electrical grid blackouts.',
        'Subsea fiber optic cables and pipeline cathodic protection systems experience stray voltage loads.',
      ],
    },
    {
      title: 'Astronauts & Polar Aviation',
      icon: ShieldAlert,
      color: 'from-red-500/20 to-rose-600/10 border-red-500/30 text-red-400',
      tag: '05 // DOSIMETRY HAZARD',
      summary: 'High-energy solar protons pose radiation hazard to astronauts during spacewalks and crew on high-altitude polar flights.',
      details: [
        'ISS astronauts require shelter in heavily shielded module sections during severe solar energetic particle events.',
        'Artemis lunar crew require real-time radiation forecasting beyond Earth’s protective magnetosphere.',
        'Commercial airlines reroute polar flights to lower latitudes to limit flight crew cosmic radiation exposure.',
      ],
    },
  ];

  return (
    <section className="my-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-2">
            <span>✦ REAL-WORLD INFRASTRUCTURE IMPACT</span>
          </div>
          <h2 className="font-heading text-3xl font-extrabold text-white tracking-tight">
            Why Does Space Weather Matter?
          </h2>
        </div>
        <p className="text-xs text-slate-400 font-mono max-w-md">
          How solar eruptions thousands of kilometers away affect human technology, orbital assets, and electrical power on Earth.
        </p>
      </div>

      {/* Grid of 5 Impact Cards matching NebulaOS layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {impacts.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={`glass-panel p-6 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden ${
                idx === 0 ? 'lg:col-span-2' : ''
              }`}
            >
              {/* Card top section */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-2xl bg-gradient-to-br border ${item.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest block">
                      Domain {idx + 1}
                    </span>
                    <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
                  {item.summary}
                </p>

                <div className="space-y-2 text-xs font-mono bg-space-950/60 p-4 rounded-2xl border border-white/5">
                  <div className="text-[10px] text-cyan-400 uppercase font-bold tracking-wider mb-2">
                    Key Vulnerabilities:
                  </div>
                  {item.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-slate-300">
                      <span className="text-cyan-400 shrink-0">›</span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400">
                <span>Space Weather Vulnerability</span>
                <span className="text-cyan-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Learn more <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
