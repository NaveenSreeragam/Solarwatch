'use client';

import React from 'react';
import { Sparkles, Globe, Activity, ShieldAlert, ArrowRight, Zap, Orbit } from 'lucide-react';
import { ConditionsStatus } from '@/lib/nasa/types';

interface HeroProps {
  summaryText: string;
  conditions: ConditionsStatus;
  flareCount: number;
  cmeCount: number;
  stormCount: number;
  isFallback?: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  summaryText,
  conditions,
  flareCount,
  cmeCount,
  stormCount,
  isFallback = false,
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-cyan-500/20 bg-space-950 text-white shadow-2xl my-6">
      {/* Ambient Solar Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen pointer-events-none"
      >
        <source src="/solar%20video.mp4" type="video/mp4" />
      </video>
      {/* Radiant Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-space-950/95 via-space-950/75 to-transparent z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-space-950/90 via-transparent to-space-950/40 z-0" />

      {/* Decorative Corner Reticles (NebulaOS visual signature) */}
      <div className="absolute top-3 left-3 font-mono text-[10px] text-cyan-400/40 select-none z-10">+ RETICLE 01 // SOLAR Telemetry</div>
      <div className="absolute top-3 right-3 font-mono text-[10px] text-cyan-400/40 select-none z-10">+ NASA DONKI MONITOR</div>
      <div className="absolute bottom-3 left-3 font-mono text-[10px] text-cyan-400/30 select-none z-10">+ HELIOSPHERIC OBSERVATORY</div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 py-12 md:py-16">
        {/* Subtitle Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 backdrop-blur-md mb-6 text-xs text-cyan-300 font-mono">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>✦ SPACE WEATHER INTELLIGENCE DASHBOARD</span>
        </div>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-4">
          What is the Sun <br className="hidden sm:inline" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-orange-400 to-cyan-400">
            doing right now?
          </span>
        </h1>

        {/* Supporting Paragraph */}
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mb-8 leading-relaxed">
          Monitor recent solar activity and understand how space weather can affect Earth, orbital satellites, communication systems, power infrastructure, and human spaceflight.
        </p>

        {/* Dynamic Space-Weather Summary Card */}
        <div className="glass-panel p-5 rounded-2xl border border-cyan-500/30 mb-8 max-w-3xl shadow-nebula">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Dynamic Telemetry Summary</span>
            {isFallback && (
              <span className="ml-auto text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/20">
                NASA Standard Baseline
              </span>
            )}
          </div>
          <p className="text-sm text-slate-200 leading-relaxed font-sans italic">
            "{summaryText}"
          </p>
        </div>

        {/* Quick Stats Grid matching NebulaOS info density */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          <div className="bg-space-900/70 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="text-xs text-slate-400 font-mono mb-1">Solar Activity</div>
            <div className="flex items-baseline gap-2">
              <span className={`text-xl font-bold font-mono ${
                conditions.solarActivity === 'EXTREME' || conditions.solarActivity === 'HIGH'
                  ? 'text-amber-400'
                  : 'text-cyan-400'
              }`}>
                {conditions.solarActivity}
              </span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Based on flare class</div>
          </div>

          <div className="bg-space-900/70 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="text-xs text-slate-400 font-mono mb-1">Recent Flares</div>
            <div className="text-xl font-bold font-mono text-amber-400">
              {flareCount} <span className="text-xs text-slate-400 font-normal">events</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Last 7-14 days</div>
          </div>

          <div className="bg-space-900/70 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="text-xs text-slate-400 font-mono mb-1">CME Eruptions</div>
            <div className="text-xl font-bold font-mono text-cyan-400">
              {cmeCount} <span className="text-xs text-slate-400 font-normal">detected</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Coronal Mass Ejections</div>
          </div>

          <div className="bg-space-900/70 backdrop-blur-md p-4 rounded-xl border border-white/10 hover:border-cyan-500/30 transition-all">
            <div className="text-xs text-slate-400 font-mono mb-1">Geomagnetic Storms</div>
            <div className="text-xl font-bold font-mono text-cyan-300">
              {stormCount} <span className="text-xs text-slate-400 font-normal">active</span>
            </div>
            <div className="text-[10px] text-slate-500 mt-1">Magnetosphere shifts</div>
          </div>
        </div>
      </div>
    </div>
  );
};
