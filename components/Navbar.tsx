'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { RefreshCw, ExternalLink } from 'lucide-react';

interface NavbarProps {
  lastUpdated?: string;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  isFallback?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  lastUpdated,
  isRefreshing = false,
  onRefresh,
  isFallback = false,
}) => {
  const pathname = usePathname();

  const navLinks = [
    { name: 'Dashboard', href: '/' },
    { name: 'Solar Activity', href: '/solar-activity' },
    { name: 'Events', href: '/events' },
    { name: 'Earth Impact', href: '/impact' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/[0.08] bg-space-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center group">
          <span className="font-heading font-extrabold text-base tracking-wider text-white hover:text-cyan-300 transition-colors">
            SOLAR<span className="text-cyan-400">WATCH</span>
          </span>
        </Link>

        {/* Clean Center Navigation Tabs with Framer Motion Sliding Pill */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-1.5 rounded-full text-xs font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav-pill"
                    className="absolute inset-0 rounded-full bg-cyan-500/20 border border-cyan-500/40 shadow-sm"
                    transition={{
                      type: 'spring',
                      stiffness: 380,
                      damping: 30,
                    }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Right Status & Actions */}
        <div className="flex items-center gap-2.5">
          {/* Subtle Live Telemetry Badge */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] text-xs font-mono">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
            </span>
            <span className="text-slate-300 text-[11px] hidden sm:inline">NASA Live</span>
          </div>

          {/* Refresh Action */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isRefreshing}
              className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-300 hover:bg-white/[0.06] transition-colors disabled:opacity-50"
              title="Refresh Telemetry"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
            </button>
          )}

          {/* External DONKI link */}
          <a
            href="https://donki.ccmc.gsfc.nasa.gov/DONKI/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full text-xs text-slate-400 hover:text-white hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all"
          >
            <span>DONKI</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      {/* Mobile Tab Bar */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-white/[0.06] bg-space-950/90 text-xs">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`px-2 py-1 rounded-md text-[11px] ${
              pathname === link.href ? 'text-cyan-400 font-bold' : 'text-slate-400'
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>
    </header>
  );
};
