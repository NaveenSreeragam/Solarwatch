/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        space: {
          950: '#030712',
          900: '#070d1e',
          850: '#0b132b',
          800: '#1c2541',
          700: '#3a506b',
        },
        solar: {
          yellow: '#fbbf24',
          orange: '#f97316',
          red: '#ef4444',
          flare: '#ff5e00',
        },
        nebula: {
          blue: '#00d2ff',
          cyan: '#38bdf8',
          glow: '#1d4ed8',
          accent: '#60a5fa',
        },
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['var(--font-body)', 'Public Sans', 'system-ui', 'sans-serif'],
        mono: ['var(--font-body)', 'Public Sans', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'nebula-gradient': 'radial-gradient(circle at 50% 20%, rgba(14, 165, 233, 0.15) 0%, rgba(3, 7, 18, 0.95) 75%)',
        'card-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'glow-cyan': 'radial-gradient(circle, rgba(56, 189, 248, 0.25) 0%, transparent 70%)',
      },
      boxShadow: {
        'nebula': '0 0 30px -5px rgba(56, 189, 248, 0.25)',
        'solar-glow': '0 0 25px -5px rgba(249, 115, 22, 0.3)',
      },
    },
  },
  plugins: [],
}
