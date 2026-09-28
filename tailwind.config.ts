import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        jet: {
          950: '#050810',
          900: '#0A0E1A',
          800: '#111827',
          700: '#1A1F35',
          600: '#252B45',
          500: '#374166',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light: '#E8D5A3',
          dark: '#A08530',
          50: '#FBF7EA',
          100: '#F5EDD0',
          200: '#EDDCAA',
          300: '#E8D5A3',
          400: '#D4B86A',
          500: '#C9A84C',
          600: '#A08530',
          700: '#7A6524',
          800: '#544618',
          900: '#2E260D',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        body: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-slow': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'shimmer': 'shimmer 3s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'slide-up': 'slide-up 0.8s ease-out',
        'slide-down': 'slide-down 0.5s ease-out',
        'fade-in': 'fade-in 1s ease-out',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
        'scale-in': 'scale-in 0.5s ease-out',
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
        'star-twinkle': 'star-twinkle 4s ease-in-out infinite',
        'count-up': 'count-up 2s ease-out',
        'draw-line': 'draw-line 1.5s ease-out forwards',
        'plane-fly': 'plane-fly 2s ease-in-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(201, 168, 76, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(201, 168, 76, 0.6)' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(40px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'gradient-x': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'star-twinkle': {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' },
        },
        'draw-line': {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
        'plane-fly': {
          '0%': { transform: 'translateX(-100%) translateY(50px) rotate(-5deg)', opacity: '0' },
          '50%': { opacity: '1' },
          '100%': { transform: 'translateX(0) translateY(0) rotate(0deg)', opacity: '1' },
        },
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #C9A84C, #F0D78C, #C9A84C)',
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(201,168,76,0.4), transparent)',
        'dark-gradient': 'linear-gradient(180deg, #0A0E1A, #111827)',
        'hero-gradient': 'radial-gradient(ellipse at center top, #1A1F35, #0A0E1A 70%)',
        'card-gradient': 'linear-gradient(180deg, rgba(26,31,53,0.8), rgba(10,14,26,0.95))',
        'glass': 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
      },
      boxShadow: {
        'gold': '0 4px 30px rgba(201, 168, 76, 0.15)',
        'gold-lg': '0 8px 40px rgba(201, 168, 76, 0.25)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.5)',
        'inner-glow': 'inset 0 1px 0 rgba(255,255,255,0.05)',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [],
};
export default config;
