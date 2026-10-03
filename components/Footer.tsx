'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-white/10 bg-space-950/90 text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-16 font-sans">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
        {/* Brand info */}
        <div className="md:col-span-2 space-y-4">
          <span className="font-heading font-extrabold text-lg text-white tracking-wider">
            SOLAR<span className="text-cyan-400">WATCH</span>
          </span>
          <p className="text-xs text-slate-300 leading-relaxed max-w-md">
            Interactive Space Weather Intelligence Dashboard created for NASA Space Apps Challenge. Processing live heliospheric telemetry from NASA DONKI and orbiting spacecraft sensors.
          </p>

          <div className="p-3 rounded-xl bg-space-900/80 border border-white/10 text-[11px] text-slate-400 max-w-md">
            <strong className="text-cyan-400">Official Disclaimer:</strong> SolarWatch is an independent educational project developed for the NASA Space Apps Challenge and is not an official NASA or NOAA application.
          </div>
        </div>

        {/* Links Column 1 */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            NASA Data Sources
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <a
                href="https://donki.ccmc.gsfc.nasa.gov/DONKI/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <span>NASA DONKI API</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <span>NASA Open APIs</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a
                href="https://ccmc.gsfc.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <span>NASA GSFC CCMC</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
            <li>
              <a
                href="https://www.swpc.noaa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
              >
                <span>NOAA Space Weather</span>
                <ExternalLink className="w-3 h-3 text-slate-500" />
              </a>
            </li>
          </ul>
        </div>

        {/* Links Column 2 */}
        <div>
          <h4 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-4">
            Navigation
          </h4>
          <ul className="space-y-2 text-xs font-mono">
            <li>
              <Link href="/" className="hover:text-cyan-400 transition-colors">
                Main Dashboard
              </Link>
            </li>
            <li>
              <Link href="/solar-activity" className="hover:text-cyan-400 transition-colors">
                Solar Activity Spectrum
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-cyan-400 transition-colors">
                Event Timeline Feed
              </Link>
            </li>
            <li>
              <Link href="/impact" className="hover:text-cyan-400 transition-colors">
                Infrastructure Impact
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-cyan-400 transition-colors">
                About & Methodology
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-slate-500">
        <div>
          © {new Date().getFullYear()} SolarWatch Project. NASA Space Apps Challenge Submission.
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <span>Powered by Next.js & React</span>
        </div>
      </div>
    </footer>
  );
};
