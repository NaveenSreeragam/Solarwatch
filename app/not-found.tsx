import React from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { AlertTriangle, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="p-4 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 mb-6">
          <AlertTriangle className="w-12 h-12" />
        </div>

        <h1 className="font-heading text-4xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
          404 — Orbit Off Track
        </h1>

        <p className="text-slate-300 text-sm max-w-md font-sans mb-8">
          The requested space weather telemetry page or trajectory could not be located in the solar watch catalog.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider transition-all"
        >
          <Home className="w-4 h-4" />
          <span>RETURN TO MISSION CONTROL</span>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
