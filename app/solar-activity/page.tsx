import React from 'react';
import { fetchSpaceWeatherData } from '@/lib/nasa/donki';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SolarActivityChart } from '@/components/SolarActivityChart';
import { Sun } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function SolarActivityPage() {
  const data = await fetchSpaceWeatherData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 font-mono mb-4">
            <Sun className="w-3.5 h-3.5 text-amber-400" />
            <span>SOLAR X-RAY & ACTIVE REGION TELEMETRY</span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-white tracking-tight">
            Solar Activity Spectrum
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">
            In-depth analysis of recent solar flare activity, active region magnetic reconnections, and X-ray emission flux recorded by orbiting GOES satellites.
          </p>
        </div>

        {/* Flare Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="text-xs font-mono text-slate-400 mb-1">Strongest Flare (7 Days)</div>
            <div className="text-3xl font-extrabold font-mono text-amber-400">
              {data.flareSummary.classType}
            </div>
            <div className="text-xs text-slate-300 mt-2">
              Source Region: <span className="font-mono text-cyan-300">{data.flareSummary.activeRegion}</span>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="text-xs font-mono text-slate-400 mb-1">Total Flare Count</div>
            <div className="text-3xl font-extrabold font-mono text-cyan-400">
              {data.flareSummary.totalCount7Days} <span className="text-sm font-normal text-slate-400">events</span>
            </div>
            <div className="text-xs text-slate-300 mt-2">
              Observed by NASA DONKI sensors
            </div>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-white/10">
            <div className="text-xs font-mono text-slate-400 mb-1">Peak Activity Time</div>
            <div className="text-xl font-bold font-mono text-amber-300">
              {data.flareSummary.peakTime}
            </div>
            <div className="text-xs text-slate-300 mt-2">
              Status: <span className="text-emerald-400 font-mono">Recorded</span>
            </div>
          </div>
        </div>

        {/* Interactive Chart */}
        <SolarActivityChart data={data.chartData} />

        {/* Flare Classification Guide */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 my-8">
          <h2 className="font-heading text-2xl font-bold text-white mb-4">
            Understanding Solar Flare Classes (Logarithmic Scale)
          </h2>
          <p className="text-xs text-slate-300 mb-6 leading-relaxed">
            Solar flares are classified according to their peak X-ray brightness in the 1 to 8 Angstrom wavelength range as measured by NOAA GOES spacecraft. Each letter class represents a 10-fold increase in energy output.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-space-950 border border-slate-700">
              <div className="text-slate-400 font-bold text-sm mb-1">A & B-Class</div>
              <div className="text-slate-300 text-[11px] mb-2">Background Flux</div>
              <p className="text-[10px] text-slate-400 font-sans">
                Lowest energy levels. Very common during solar minimum with negligible atmospheric effect on Earth.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-space-950 border border-cyan-500/30">
              <div className="text-cyan-400 font-bold text-sm mb-1">C-Class</div>
              <div className="text-cyan-300 text-[11px] mb-2">Small Flares</div>
              <p className="text-[10px] text-slate-400 font-sans">
                Minor solar events with little to no noticeable impact on terrestrial radio communications.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-space-950 border border-amber-500/30">
              <div className="text-amber-400 font-bold text-sm mb-1">M-Class</div>
              <div className="text-amber-300 text-[11px] mb-2">Medium Flares</div>
              <p className="text-[10px] text-slate-400 font-sans">
                Can cause brief high-frequency radio blackouts at Earth's polar regions and minor radiation storms.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-space-950 border border-red-500/30">
              <div className="text-red-400 font-bold text-sm mb-1">X-Class</div>
              <div className="text-red-300 text-[11px] mb-2">Extreme Flares</div>
              <p className="text-[10px] text-slate-400 font-sans">
                Major eruptions capable of triggering planet-wide radio blackouts and long-lasting radiation storms.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
