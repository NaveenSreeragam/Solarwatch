'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { ShieldAlert, RefreshCw, Home } from 'lucide-react';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled app error:', error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="p-4 rounded-3xl bg-red-500/10 border border-red-500/30 text-red-400 mb-6">
          <ShieldAlert className="w-12 h-12" />
        </div>

        <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Telemetry Transmission Interrupt
        </h1>

        <p className="text-slate-300 text-sm max-w-md font-sans mb-8">
          NASA data stream encountered an unexpected exception. SolarWatch automatically isolated the signal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs tracking-wider transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            <span>RETRY TELEMETRY LINK</span>
          </button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-space-900 border border-white/10 text-white font-bold text-xs tracking-wider transition-all hover:bg-white/10"
          >
            <Home className="w-4 h-4" />
            <span>MAIN DASHBOARD</span>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
