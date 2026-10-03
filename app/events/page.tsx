import React from 'react';
import { fetchSpaceWeatherData } from '@/lib/nasa/donki';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { EventsTimeline } from '@/components/EventsTimeline';
import { Clock } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function EventsPage() {
  const data = await fetchSpaceWeatherData();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs text-cyan-300 font-mono mb-4">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>NASA DONKI EVENT FEED</span>
          </div>
          <h1 className="font-heading text-4xl font-extrabold text-white tracking-tight">
            Space Weather Event Stream
          </h1>
          <p className="text-slate-300 text-sm mt-2 max-w-2xl font-sans">
            Complete list of recent space weather notifications reported by NASA’s Database Of Notifications, Knowledge, Information (DONKI).
          </p>
        </div>

        <EventsTimeline events={data.events} />
      </main>

      <Footer />
    </div>
  );
}
