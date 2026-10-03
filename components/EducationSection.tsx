'use client';

import React from 'react';
import { BookOpen, Sun, Wind, Compass, ShieldAlert, Sparkles, HelpCircle } from 'lucide-react';

export const EducationSection: React.FC = () => {
  const topics = [
    {
      term: 'What is Space Weather?',
      icon: Sparkles,
      color: 'text-cyan-400',
      definition:
        'Changing environmental conditions in space caused primarily by solar activity. Just as Earth experiences atmospheric weather (rain, wind, heat), the space surrounding Earth experiences dynamic plasma streams, magnetic storms, and electromagnetic radiation bursts.',
    },
    {
      term: 'Solar Flare',
      icon: Sun,
      color: 'text-amber-400',
      definition:
        'A sudden intense burst of electromagnetic radiation (light, UV, X-rays) from active solar region magnetic field reconnections. Travelling at the speed of light, flares reach Earth in just 8 minutes.',
    },
    {
      term: 'Coronal Mass Ejection (CME)',
      icon: Wind,
      color: 'text-cyan-300',
      definition:
        'A gigantic cloud of solar plasma and embedded magnetic field hurled into space at speeds up to thousands of kilometers per second. CMEs take 1 to 3 days to travel from the Sun to Earth.',
    },
    {
      term: 'Geomagnetic Storm',
      icon: Compass,
      color: 'text-purple-400',
      definition:
        'A temporary disturbance of Earth’s magnetosphere caused by a solar wind shockwave or CME collision. Earth’s magnetic field lines compress and vibrate, producing brilliant auroras and inducing electrical currents on Earth.',
    },
    {
      term: 'Solar Energetic Particles (SEP)',
      icon: ShieldAlert,
      color: 'text-red-400',
      definition:
        'High-energy protons and ions accelerated by solar flares or CME shock fronts. These relativistic particles travel near light speed and pose ionizing radiation hazards to satellites and astronauts.',
    },
    {
      term: 'Solar Wind',
      icon: Sparkles,
      color: 'text-blue-300',
      definition:
        'A continuous, supersonic stream of charged particles (electrons and protons) flowing outward from the Sun’s upper atmosphere (corona) across the entire solar system.',
    },
  ];

  return (
    <section className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 my-12 shadow-2xl relative">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="w-5 h-5 text-amber-400" />
        <span className="text-xs font-mono text-amber-300 uppercase tracking-wider">
          Space Weather Education
        </span>
      </div>
      <h2 className="font-heading text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
        Fundamental Concepts & Terminology
      </h2>
      <p className="text-xs text-slate-400 font-mono mb-8 max-w-2xl">
        Beginner-friendly explanations of core space physics phenomena monitored by NASA.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((t) => {
          const Icon = t.icon;
          return (
            <div
              key={t.term}
              className="bg-space-950/80 p-5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className={`p-2 rounded-xl bg-white/5 ${t.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-base font-bold text-white">{t.term}</h3>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {t.definition}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
