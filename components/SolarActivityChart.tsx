'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { ChartDataPoint, FlareCategory } from '@/lib/nasa/types';
import { Activity, Info, Filter, ExternalLink } from 'lucide-react';

interface SolarActivityChartProps {
  data: ChartDataPoint[];
}

export const SolarActivityChart: React.FC<SolarActivityChartProps> = ({ data }) => {
  const [selectedFilter, setSelectedFilter] = useState<FlareCategory | 'ALL'>('ALL');

  const [indicatorStyle, setIndicatorStyle] = React.useState<{ left: number; width: number; opacity: number }>({
    left: 0,
    width: 0,
    opacity: 0,
  });
  const chartFilterRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!chartFilterRef.current) return;
    const activeBtn = chartFilterRef.current.querySelector('[data-active="true"]') as HTMLElement | null;
    if (activeBtn) {
      setIndicatorStyle({
        left: activeBtn.offsetLeft,
        width: activeBtn.offsetWidth,
        opacity: 1,
      });
    }
  }, [selectedFilter]);

  const filteredData = data.filter((item) => {
    if (selectedFilter === 'ALL') return true;
    return item.category === selectedFilter;
  });

  const categoryColors: Record<FlareCategory, string> = {
    A: '#94a3b8',
    B: '#38bdf8',
    C: '#22d3ee',
    M: '#fbbf24',
    X: '#ef4444',
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const item: ChartDataPoint = payload[0].payload;
      const color = categoryColors[item.category] || '#38bdf8';

      return (
        <div className="bg-space-950/95 border border-cyan-500/40 p-4 rounded-xl shadow-2xl backdrop-blur-md max-w-xs text-xs font-mono">
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full inline-block"
                style={{ backgroundColor: color }}
              />
              Flare {item.flareClass}
            </span>
            <span
              className="px-2 py-0.5 rounded text-[10px] font-bold text-black"
              style={{ backgroundColor: color }}
            >
              Class {item.category}
            </span>
          </div>

          <div className="space-y-1.5 text-slate-300">
            <div className="flex justify-between">
              <span className="text-slate-400">Date:</span>
              <span className="text-white font-semibold">{item.date}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Peak Time:</span>
              <span className="text-cyan-300">{item.time} UTC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Active Region:</span>
              <span className="text-amber-300 font-semibold">{item.activeRegion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Numeric Scale:</span>
              <span className="text-slate-200">{item.numericIntensity.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t border-white/10 text-[10px] text-slate-400 flex items-center gap-1">
            <Info className="w-3 h-3 text-cyan-400" />
            <span>Click node to inspect DONKI record</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-space-900/40 border border-white/[0.08] shadow-2xl my-14">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h3 className="font-heading text-2xl font-bold text-white tracking-tight">
            Solar Activity & Flare Spectrum
          </h3>
          <p className="text-xs text-slate-400 font-mono mt-1">
            X-ray flare intensity timeline measured by GOES monitors
          </p>
        </div>

        {/* Filter Pill Controls with Sliding Pill */}
        <div ref={chartFilterRef} className="relative flex items-center gap-1">
          {/* Sliding Highlight Pill */}
          <div
            className="absolute top-0 bottom-0 rounded-lg bg-cyan-500/20 border border-cyan-500/40 shadow-sm pointer-events-none transition-all duration-300 ease-out"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
            }}
          />

          <Filter className="w-3.5 h-3.5 text-slate-500 mr-1" />
          {(['ALL', 'C', 'M', 'X'] as const).map((cat) => {
            const isActive = selectedFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedFilter(cat)}
                data-active={isActive}
                className={`relative z-10 px-3 py-1 rounded-lg text-xs font-mono transition-colors duration-200 ${
                  isActive
                    ? 'text-cyan-300 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {cat === 'ALL' ? 'All Classes' : `${cat}-Class`}
              </button>
            );
          })}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="h-80 w-full pt-4">
        {filteredData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-xs font-mono text-slate-400">
            No flare events match the selected filter ({selectedFilter})
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={filteredData} margin={{ top: 15, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="solarGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="50%" stopColor="#fbbf24" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#030712" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
              <XAxis
                dataKey="date"
                stroke="#64748b"
                tick={{ fontSize: 11, fontFamily: 'monospace' }}
              />
              <YAxis
                scale="log"
                domain={[10, 100000]}
                allowDataOverflow
                stroke="#64748b"
                tick={{ fontSize: 10, fontFamily: 'monospace' }}
                label={{
                  value: 'Flare Class / Peak X-Ray Flux (W/m²)',
                  angle: -90,
                  position: 'insideLeft',
                  offset: -10,
                  style: { textAnchor: 'middle', fill: '#94a3b8', fontSize: 11, fontFamily: 'monospace' },
                }}
                tickFormatter={(val) => {
                  if (val >= 10000) return 'X (≥10⁻⁴)';
                  if (val >= 1000) return 'M (10⁻⁵)';
                  if (val >= 100) return 'C (10⁻⁶)';
                  if (val >= 10) return 'B (10⁻⁷)';
                  return '';
                }}
              />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine
                y={10000}
                stroke="#ef4444"
                strokeDasharray="4 4"
                label={{
                  value: 'X-Class Threshold',
                  fill: '#ef4444',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  position: 'top',
                  dy: -4,
                }}
              />
              <ReferenceLine
                y={1000}
                stroke="#fbbf24"
                strokeDasharray="4 4"
                label={{
                  value: 'M-Class Threshold',
                  fill: '#fbbf24',
                  fontSize: 11,
                  fontFamily: 'monospace',
                  fontWeight: 600,
                  position: 'top',
                  dy: -4,
                }}
              />
              <Area
                type="monotone"
                dataKey="numericIntensity"
                stroke="#38bdf8"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#solarGradient)"
                dot={(props: any) => {
                  const { cx, cy, payload } = props;
                  const color = categoryColors[payload.category as FlareCategory] || '#38bdf8';
                  return (
                    <circle
                      key={props.index}
                      cx={cx}
                      cy={cy}
                      r={payload.category === 'X' ? 6 : payload.category === 'M' ? 5 : 4}
                      fill={color}
                      stroke="#030712"
                      strokeWidth={2}
                      className="cursor-pointer hover:scale-150 transition-transform"
                    />
                  );
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* Legend & Details Footer */}
      <div className="mt-4 pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 inline-block" /> C-Class (Moderate)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" /> M-Class (Strong)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block" /> X-Class (Extreme)
          </span>
        </div>
        <div className="text-[11px] text-slate-400">
          Source: NASA GOES X-ray Flux Monitors
        </div>
      </div>
    </div>
  );
};
