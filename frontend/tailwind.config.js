/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Cyberpunk palette
        cyber: {
          black: "#0f0f19",
          darkblue: "#181830",
          blue: "#222244",
          cyan: "#00ffff",
          magenta: "#ff00ff",
          red: "#ff2d6d",
          green: "#39ff14",
          yellow: "#ffdd00",
          purple: "#8a2be2",
        },
        // Primary color with shades
        primary: {
          DEFAULT: "#00ffff", // Neon cyan
          50: "#e6ffff",
          100: "#b3ffff",
          200: "#80ffff",
          300: "#4dffff",
          400: "#1affff",
          600: "#00cccc",
          700: "#009999",
          800: "#006666",
          900: "#003333",
        },
        // Secondary color with shades
        secondary: {
          DEFAULT: "#ff00ff", // Neon magenta
          50: "#ffe6ff",
          100: "#ffb3ff",
          200: "#ff80ff",
          300: "#ff4dff",
          400: "#ff1aff",
          600: "#cc00cc",
          700: "#990099",
          800: "#660066",
          900: "#330033",
        },
        // Dark theme backgrounds
        dark: {
          DEFAULT: "#121212",
          surface: "#181818",
          elevated: "#272727",
          border: "#333333",
          card: "#1e1e1e",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        cyber: [
          "Rajdhani",
          "Orbitron",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      boxShadow: {
        glow: "0 0 15px rgba(0, 255, 255, 0.5)",
        "glow-sm": "0 0 10px rgba(0, 255, 255, 0.3)",
        "glow-lg": "0 0 25px rgba(0, 255, 255, 0.7)",
        "glow-red": "0 0 15px rgba(255, 45, 109, 0.5)",
        "glow-green": "0 0 15px rgba(57, 255, 20, 0.5)",
        "glow-purple": "0 0 15px rgba(138, 43, 226, 0.5)",
        "glow-yellow": "0 0 15px rgba(255, 221, 0, 0.5)",
        "glow-magenta": "0 0 15px rgba(255, 0, 255, 0.5)",
      },
      animation: {
        slideIn: "slideIn 0.3s ease-out forwards",
        fadeIn: "fadeIn 0.3s ease-out forwards",
        "pulse-glow": "pulseGlow 2s infinite",
        float: "float 3s ease-in-out infinite",
        scan: "scan 2.5s ease-in-out infinite",
        glitch: "glitch 1s linear infinite",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        pulseGlow: {
          "0%": { boxShadow: "0 0 0 0 rgba(0, 255, 255, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(0, 255, 255, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(0, 255, 255, 0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { backgroundPosition: "0% 0%" },
          "50%": { backgroundPosition: "100% 100%" },
          "100%": { backgroundPosition: "0% 0%" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0)" },
          "20%": { transform: "translate(-2px, 2px)" },
          "40%": { transform: "translate(-2px, -2px)" },
          "60%": { transform: "translate(2px, 2px)" },
          "80%": { transform: "translate(2px, -2px)" },
        },
      },
      backgroundImage: {
        "cyber-grid":
          "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)",
        "cyber-gradient": "linear-gradient(45deg, #ff00ff, #00ffff)",
        "scanner-line":
          "linear-gradient(to bottom, transparent, #00ffff, transparent)",
      },
      backgroundSize: {
        "cyber-grid": "50px 50px",
      },
      textShadow: {
        glow: "0 0 5px rgba(0, 255, 255, 0.7)",
        "glow-sm": "0 0 2px rgba(0, 255, 255, 0.5)",
        "glow-lg": "0 0 8px rgba(0, 255, 255, 0.9)",
      },
      borderWidth: {
        1: "1px",
        3: "3px",
      },
    },
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    // Combined text shadow and gradient utilities
    function ({ addUtilities }) {
      const newUtilities = {
        ".text-shadow-glow": {
          textShadow: "0 0 5px rgba(0, 255, 255, 0.7)",
        },
        ".text-shadow-glow-sm": {
          textShadow: "0 0 2px rgba(0, 255, 255, 0.5)",
        },
        ".text-shadow-glow-lg": {
          textShadow: "0 0 8px rgba(0, 255, 255, 0.9)",
        },
        ".text-shadow-glow-magenta": {
          textShadow: "0 0 5px rgba(255, 0, 255, 0.7)",
        },
        ".text-shadow-none": {
          textShadow: "none",
        },
        ".text-gradient-cyan-blue": {
          background: "linear-gradient(to right, #00ffff, #0099ff)",
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          color: "transparent",
        },
        ".text-gradient-magenta-cyan": {
          background: "linear-gradient(to right, #ff00ff, #00ffff)",
          "-webkit-background-clip": "text",
          "background-clip": "text",
          "-webkit-text-fill-color": "transparent",
          color: "transparent",
        },
      };
      addUtilities(newUtilities);
    },
  ],
  darkMode: "class", // or 'media' if you prefer system settings
};