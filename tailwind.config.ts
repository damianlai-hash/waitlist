import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bookzyr brand palette (sourced from www.bookzyr.com)
        bg: "var(--bg)",
        surface: "var(--surface)",
        "surface-2": "var(--surface-2)",
        "surface-3": "var(--surface-3)",
        border: "var(--border)",
        ink: "var(--text)",
        muted: "var(--text-muted)",
        coral: {
          DEFAULT: "#FF6B5B",
          light: "#FF8B70",
          dark: "#E8584A",
        },
        gold: "#E8B86A",
        leaf: "#6CC289",
        violet: "#B98AC9",
        sky: "#4A9FBF",
        navy: {
          DEFAULT: "#1A2942",
          dark: "#0E1A2B",
          mid: "#2A3852",
        },
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        display: [
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
      },
      borderRadius: {
        xl: "0.875rem",
        "2xl": "1.125rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(14,26,43,0.04), 0 8px 24px rgba(14,26,43,0.06)",
        pop: "0 12px 40px rgba(14,26,43,0.16)",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(4px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.18s ease-out",
        "slide-in": "slide-in 0.22s cubic-bezier(0.16,1,0.3,1)",
      },
    },
  },
  plugins: [],
};

export default config;
