import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { WhyDoesThisMatter } from '@/components/WhyDoesThisMatter';
import { ShieldAlert, Globe } from 'lucide-react';

export default function ImpactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-xs text-blue-300 font-mono mb-4">
            <Globe className="w-3.5 h-3.5 text-blue-400" />
            <span>TERRESTRIAL & SPACE DOMAIN VULNERABILITIES</span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-white tracking-tight">
            Infrastructure & Mission Impact
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">
            Comprehensive breakdown of how space weather events affect satellite constellations, aviation navigation, power grids, HF communications, and astronaut safety.
          </p>
        </div>

        <WhyDoesThisMatter />
      </main>

      <Footer />
    </div>
  );
}
