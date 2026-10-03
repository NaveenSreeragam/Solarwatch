import type { Metadata } from 'next';
import { Inter, Public_Sans, DM_Mono } from 'next/font/google';
import './globals.css';

// Primary Typography Stack setup using next/font/google
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
});

const publicSans = Public_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

const dmMono = DM_Mono({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'SolarWatch — NASA Space Weather Intelligence Dashboard',
  description:
    'Real-time space weather intelligence monitoring solar flares, coronal mass ejections (CMEs), geomagnetic storms, and energetic particle events powered by NASA DONKI telemetry.',
  keywords: [
    'SolarWatch',
    'NASA Space Apps Challenge',
    'Space Weather',
    'Solar Flare',
    'Coronal Mass Ejection',
    'CME',
    'Geomagnetic Storm',
    'DONKI API',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${publicSans.variable} ${dmMono.variable}`}
    >
      <body className="min-h-screen bg-space-950 text-slate-100 font-sans antialiased selection:bg-cyan-500 selection:text-black">
        {/* Full background image styling using Luminous Blue Nebula Vortex */}
        <div
          className="fixed inset-0 pointer-events-none z-0 opacity-30 mix-blend-screen bg-cover bg-center"
          style={{
            backgroundImage: `url("/Luminous%20Blue%20Nebula%20Vortex.png")`,
          }}
        />
        {/* Gradient dark overlays */}
        <div className="fixed inset-0 pointer-events-none z-0 bg-gradient-to-b from-space-950/80 via-transparent to-space-950/90" />

        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
