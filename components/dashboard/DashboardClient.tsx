'use client';

import React, { useState } from 'react';
import { SolarWatchPayload } from '@/lib/nasa/types';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { ParametersGrid } from '@/components/ParametersGrid';
import { SpaceWeatherConditions } from '@/components/SpaceWeatherConditions';
import { SolarActivityChart } from '@/components/SolarActivityChart';
import { EventsTimeline } from '@/components/EventsTimeline';
import { WhyDoesThisMatter } from '@/components/WhyDoesThisMatter';
import { EducationSection } from '@/components/EducationSection';
import { Footer } from '@/components/Footer';
import { formatDate } from '@/lib/nasa/transformers';

interface DashboardClientProps {
  initialData: SolarWatchPayload;
}

export const DashboardClient: React.FC<DashboardClientProps> = ({ initialData }) => {
  const [data, setData] = useState<SolarWatchPayload>(initialData);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchFreshData = async () => {
    try {
      const res = await fetch('/api/space-weather');
      if (res.ok) {
        const freshData = await res.json();
        setData(freshData);
      }
    } catch (err) {
      console.error('Failed to refresh space weather telemetry:', err);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await fetchFreshData();
    setIsRefreshing(false);
  };

  // Automatic hourly synchronization (runs once every 60 minutes)
  React.useEffect(() => {
    const hourlyInterval = setInterval(() => {
      fetchFreshData();
    }, 60 * 60 * 1000); // Exactly 1 hour

    return () => clearInterval(hourlyInterval);
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        lastUpdated={formatDate(data.fetchedAt)}
        isRefreshing={isRefreshing}
        onRefresh={handleRefresh}
        isFallback={data.isFallbackData}
        isDataDelayed={data.isDataDelayed}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* HERO SECTION */}
        <Hero
          summaryText={data.summaryText}
          conditions={data.conditions}
          flareCount={data.flareSummary.totalCount7Days}
          cmeCount={data.cmeSummary.recentCount}
          stormCount={data.gstSummary.latestStorm ? 1 : 0}
          isFallback={data.isFallbackData}
        />

        {/* 4 KEY PARAMETERS */}
        <ParametersGrid
          flareSummary={data.flareSummary}
          cmeSummary={data.cmeSummary}
          gstSummary={data.gstSummary}
          sepSummary={data.sepSummary}
        />

        {/* CURRENT SPACE WEATHER STATUS MATRIX */}
        <SpaceWeatherConditions conditions={data.conditions} />

        {/* SOLAR ACTIVITY RECHARTS CHART */}
        <SolarActivityChart data={data.chartData} />

        {/* EVENT TIMELINE */}
        <EventsTimeline events={data.events} />

        {/* WHY DOES THIS MATTER */}
        <WhyDoesThisMatter />

        {/* SPACE WEATHER EDUCATION */}
        <EducationSection />
      </main>

      <Footer />
    </div>
  );
};
