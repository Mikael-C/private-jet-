import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary dark navy — headers, heroes, dark sections
        navy: {
          DEFAULT: "#0F1420",
          50: "#E8E9EC",
          100: "#C5C8D1",
          200: "#8B91A4",
          300: "#515A77",
          400: "#2A3351",
          500: "#0F1420",
          600: "#0B101A",
          700: "#080C14",
          800: "#05080D",
          900: "#020307",
        },
        // Warm cream — alternate section backgrounds
        cream: {
          DEFAULT: "#F5F2EC",
          50: "#FDFCFA",
          100: "#F9F7F3",
          200: "#F5F2EC",
          300: "#EDE9DF",
          400: "#E0DAD0",
          500: "#D1C9BC",
        },
        // Gold accent
        gold: {
          DEFAULT: "#C9A052",
          light: "#E8D5A3",
          dark: "#9A7A35",
          50: "#FBF7EA",
          100: "#F5EDD0",
          200: "#EDDCAA",
          300: "#E8D5A3",
          400: "#D4B86A",
          500: "#C9A052",
          600: "#A08030",
          700: "#7A6124",
          800: "#544318",
          900: "#2E240D",
        },
        // Keep legacy jet colors for backward compat
        jet: {
          950: "#050810",
          900: "#0A0E1A",
          800: "#111827",
          700: "#1A1F35",
          600: "#252B45",
          500: "#374166",
        },
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "Manrope", "sans-serif"],
        display: ["var(--font-manrope)", "Manrope", "sans-serif"],
        body: ["var(--font-manrope)", "Manrope", "sans-serif"],
        manrope: ["var(--font-manrope)", "Manrope", "sans-serif"],
      },
      fontSize: {
        "display-xl": ["5rem", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-lg": ["4rem", { lineHeight: "1.07", letterSpacing: "-0.02em" }],
        "display-md": ["3rem", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["2.25rem", { lineHeight: "1.15", letterSpacing: "-0.01em" }],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "slide-up": "slide-up 0.8s ease-out",
        "fade-in": "fade-in 0.6s ease-out",
        "fade-in-up": "fade-in-up 0.7s ease-out",
        "scale-in": "scale-in 0.5s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "chat-in": "chat-in 0.3s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-16px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(201,160,82,0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(201,160,82,0.6)" },
        },
        "slide-up": {
          "0%": { transform: "translateY(32px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "chat-in": {
          "0%": { transform: "translateY(8px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        gold: "0 4px 30px rgba(201,160,82,0.15)",
        "gold-lg": "0 8px 40px rgba(201,160,82,0.25)",
        card: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.08)",
        "card-hover": "0 4px 24px rgba(0,0,0,0.12), 0 8px 40px rgba(0,0,0,0.08)",
        nav: "0 1px 0 rgba(0,0,0,0.1)",
        sm: "0 1px 2px rgba(0,0,0,0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
