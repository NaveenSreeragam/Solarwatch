'use client';

import React, { useState } from 'react';
import { SpaceWeatherEvent } from '@/lib/nasa/types';
import { Sun, Wind, Compass, ShieldAlert, Globe2, ExternalLink, Calendar, Filter, Clock } from 'lucide-react';
import { formatDate } from '@/lib/nasa/transformers';

interface EventsTimelineProps {
  events: SpaceWeatherEvent[];
}

export const EventsTimeline: React.FC<EventsTimelineProps> = ({ events }) => {
  const [filterType, setFilterType] = useState<string>('ALL');

  const [indicatorStyle, setIndicatorStyle] = React.useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const filterNavRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!filterNavRef.current) return;
    const activeBtn = filterNavRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        opacity: 1,
      });
    }
  }, [filterType]);

  const filterOptions = [
    { label: 'All Events', value: 'ALL' },
    { label: '☀ Flares', value: 'FLARE' },
    { label: '🌞 CME', value: 'CME' },
    { label: '⚡ Storms', value: 'GST' },
    { label: '☢ SEP', value: 'SEP' },
    { label: '🌐 Shock', value: 'IPS' },
  ];

  const getEventIcon = (type: SpaceWeatherEvent['type']) => {
    switch (type) {
      case 'FLARE':
        return <Sun className="w-5 h-5 text-amber-400" />;
      case 'CME':
        return <Wind className="w-5 h-5 text-cyan-400" />;
      case 'GST':
        return <Compass className="w-5 h-5 text-purple-400" />;
      case 'SEP':
        return <ShieldAlert className="w-5 h-5 text-red-400" />;
      case 'IPS':
        return <Globe2 className="w-5 h-5 text-blue-400" />;
      default:
        return <Sun className="w-5 h-5 text-slate-400" />;
    }
  };

  const getEventBadge = (type: SpaceWeatherEvent['type']) => {
    switch (type) {
      case 'FLARE':
        return 'bg-amber-500/20 text-amber-300 border-amber-500/30';
      case 'CME':
        return 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30';
      case 'GST':
        return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'SEP':
        return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'IPS':
        return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
    }
  };

  const getSeverityBadge = (severity: SpaceWeatherEvent['severity']) => {
    switch (severity) {
      case 'Extreme':
        return 'bg-red-600/30 text-red-300 border-red-500/40';
      case 'High':
        return 'bg-orange-500/30 text-orange-300 border-orange-500/40';
      case 'Elevated':
        return 'bg-yellow-500/30 text-yellow-300 border-yellow-500/40';
      case 'Moderate':
        return 'bg-cyan-500/30 text-cyan-300 border-cyan-500/40';
      default:
        return 'bg-slate-700/40 text-slate-300 border-slate-600';
    }
  };

  return (
    <section className="p-6 sm:p-8 rounded-3xl bg-space-900/40 border border-white/[0.08] my-14">
      {/* Header & Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
            Event Stream
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Chronological log of solar flares, CMEs, and geomagnetic disturbances
          </p>
        </div>

        {/* Filter Buttons with Sliding Pill */}
        <div ref={filterNavRef} className="relative flex flex-wrap items-center gap-1.5">
          {/* Sliding Highlight Pill */}
          <div
            className="absolute top-0 bottom-0 rounded-xl bg-cyan-500/20 border border-cyan-500/40 shadow-sm pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {filterOptions.map((item) => {
            const isActive = filterType === item.value;
            return (
              <button
                key={item.value}
                onClick={() => setFilterType(item.value)}
                data-active={isActive}
                className={`relative z-10 px-3 py-1.5 rounded-xl text-xs font-mono transition-colors duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Event Timeline Cards */}
      {(() => {
        const filteredEvents = events.filter((ev) => {
          if (filterType === 'ALL') return true;
          return ev.type === filterType;
        });

        if (filteredEvents.length === 0) {
          return (
            <div className="py-12 text-center text-slate-400 font-mono text-xs">
              No recent events detected for filter: <strong>{filterType}</strong>
            </div>
          );
        }

        return (
          <div className="space-y-3">
            {filteredEvents.map((ev) => {
              return (
                <div
                  key={ev.id}
                  className="bg-space-900/30 p-5 rounded-2xl border border-white/[0.06] hover:border-white/[0.12] transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <span className="text-sm font-semibold text-white">
                        {ev.title}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-medium border ${getSeverityBadge(ev.severity)}`}>
                        {ev.severity}
                      </span>
                      {ev.details.earthDirected && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-medium bg-amber-500/20 text-amber-300 border border-amber-500/30">
                          Earth Directed
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed max-w-3xl mb-2">
                      {ev.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        {formatDate(ev.timestamp)}
                      </span>
                      {ev.details.location && (
                        <span>Location: {ev.details.location}</span>
                      )}
                      {ev.details.speed && (
                        <span className="text-cyan-300">Speed: {ev.details.speed} km/s</span>
                      )}
                      {ev.details.activeRegion && (
                        <span className="text-amber-300">Region: AR{ev.details.activeRegion}</span>
                      )}
                    </div>
                  </div>

                  {ev.details.rawLink && (
                    <a
                      href={ev.details.rawLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="self-end md:self-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-cyan-300 border border-white/10 transition-colors"
                    >
                      <span>NASA DONKI</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        );
      })()}
    </section>
  );
};
