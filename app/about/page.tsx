import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EducationSection } from '@/components/EducationSection';
import { Sun, Database, ShieldAlert, Code, Globe, Info, ExternalLink } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-mono mb-4">
            <Info className="w-3.5 h-3.5 text-cyan-400" />
            <span>PROJECT SPECIFICATION & NASA ATTRIBUTION</span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-white tracking-tight">
            About SolarWatch
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">
            An interactive Space Weather Intelligence Dashboard designed for the NASA Space Apps Challenge, transforming complex space physics data into actionable mission insights.
          </p>
        </div>

        {/* Mandatory Disclaimer Callout */}
        <div className="glass-panel p-6 rounded-3xl border border-cyan-500/30 bg-cyan-950/20 mb-8 shadow-xl">
          <div className="flex items-start gap-3">
            <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
            <div className="space-y-2 text-xs text-slate-200">
              <h3 className="font-bold text-white text-sm uppercase tracking-wider font-mono">
                Official Project Status & Disclaimer
              </h3>
              <p>
                <strong>SolarWatch is an independent educational project and is not an official NASA product.</strong>
              </p>
              <p className="text-slate-300">
                All data, observations, and telemetry are fetched from NASA public APIs and NASA CCMC DONKI databases. The risk ratings, status matrices, and impact summaries displayed on SolarWatch are designed solely for educational, visual demonstration, and space apps challenge context.
              </p>
            </div>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Card 1: What SolarWatch Does */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
                <Sun className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-xl font-bold text-white">What SolarWatch Does</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed space-y-3 font-sans">
              SolarWatch implements an <strong>OBSERVE → ANALYZE → EXPLAIN → UNDERSTAND IMPACT</strong> workflow. It monitors solar activity (flares, CMEs, geomagnetic storms, energetic particles) directly from spaceborne observatories and presents them in a modern scientific mission-control dashboard.
            </p>
          </div>

          {/* Card 2: NASA DONKI */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                <Database className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-xl font-bold text-white">NASA DONKI Integration</h2>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans mb-3">
              SolarWatch connects to NASA’s <strong>Database Of Notifications, Knowledge, Information (DONKI)</strong> hosted by the Community Coordinated Modeling Center (CCMC) at NASA Goddard Space Flight Center.
            </p>
            <div className="p-3 rounded-xl bg-space-950 border border-white/5 text-[11px] font-mono text-cyan-300">
              Endpoints used: /FLR (Solar Flares), /CME (Coronal Mass Ejections), /GST (Geomagnetic Storms), /SEP (Energetic Particles), /IPS (Shocks).
            </div>
          </div>

          {/* Card 3: Data Architecture */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
                <Code className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-xl font-bold text-white">Data Architecture</h2>
            </div>
            <div className="text-xs font-mono text-slate-300 space-y-2 bg-space-950 p-4 rounded-2xl border border-white/5">
              <div>NASA DONKI Public APIs</div>
              <div className="text-cyan-400">↓</div>
              <div>Next.js Server API Layer (/api/space-weather)</div>
              <div className="text-cyan-400">↓</div>
              <div>TypeScript Data Normalization & Transformers</div>
              <div className="text-cyan-400">↓</div>
              <div>React Mission Control Components & Recharts</div>
            </div>
          </div>

          {/* Card 4: Data Limitations */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30 text-blue-400">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="font-heading text-xl font-bold text-white">Data Limitations</h2>
            </div>
            <ul className="text-xs text-slate-300 leading-relaxed space-y-2 font-sans list-disc list-inside">
              <li>Space weather events depend on satellite downlink latency (GOES, SOHO, STEREO, DSCOVR).</li>
              <li>NASA DONKI data is intended for research interpretation and historical event cataloging.</li>
              <li>When live NASA telemetry is unavailable due to DEMO key rate limits, SolarWatch displays standardized NASA baseline telemetry instead of empty pages.</li>
            </ul>
          </div>
        </div>

        {/* Education Section */}
        <EducationSection />
      </main>

      <Footer />
    </div>
  );
}
