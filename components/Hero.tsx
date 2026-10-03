'use client';

import React from 'react';
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
}) => {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-space-950 text-white shadow-2xl my-8">
      {/* Ambient Solar Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-45 mix-blend-screen pointer-events-none"
      >
        <source src="/solar%20video.mp4" type="video/mp4" />
      </video>
      {/* Radiant Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-space-950/95 via-space-950/80 to-space-950/40 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-space-950/95 via-transparent to-space-950/30 z-0" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 py-14 sm:py-20">
        {/* Clean Kicker */}
        <p className="text-xs font-mono tracking-widest text-cyan-400 uppercase mb-4">
          Space Weather Intelligence Dashboard
        </p>

        {/* Main Headline */}
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 max-w-3xl">
          What is the Sun{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 via-orange-400 to-cyan-400">
            doing right now?
          </span>
        </h1>

        {/* Supporting Paragraph */}
        <p className="font-sans text-base sm:text-lg text-slate-300 max-w-2xl mb-10 leading-relaxed font-light">
          Monitor recent solar activity and understand how space weather can affect Earth, orbital satellites, communication systems, power infrastructure, and human spaceflight.
        </p>

        {/* Dynamic Telemetry Summary Card */}
        <div className="p-6 rounded-2xl bg-space-900/60 border border-white/[0.08] backdrop-blur-md mb-10 max-w-3xl">
          <div className="text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider">
            Telemetry Summary
          </div>
          <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
            "{summaryText}"
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl">
          <div className="p-4 rounded-xl bg-space-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono mb-1">Solar Activity</div>
            <div className={`text-2xl font-bold font-mono tracking-tight ${
              conditions.solarActivity === 'EXTREME' || conditions.solarActivity === 'HIGH'
                ? 'text-amber-400'
                : 'text-cyan-400'
            }`}>
              {conditions.solarActivity}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Flare classification</div>
          </div>

          <div className="p-4 rounded-xl bg-space-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono mb-1">Recent Flares</div>
            <div className="text-2xl font-bold font-mono tracking-tight text-amber-400">
              {flareCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Observed events</div>
          </div>

          <div className="p-4 rounded-xl bg-space-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono mb-1">CME Eruptions</div>
            <div className="text-2xl font-bold font-mono tracking-tight text-cyan-400">
              {cmeCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Coronal mass ejections</div>
          </div>

          <div className="p-4 rounded-xl bg-space-900/40 border border-white/[0.06] backdrop-blur-sm">
            <div className="text-xs text-slate-400 font-mono mb-1">Geomagnetic Storms</div>
            <div className="text-2xl font-bold font-mono tracking-tight text-slate-200">
              {stormCount}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">Active disturbances</div>
          </div>
        </div>
      </div>
    </div>
  );
};
