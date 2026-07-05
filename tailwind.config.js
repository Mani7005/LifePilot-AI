/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#04070F",
          900: "#070B16",
          850: "#0A0F1E",
          800: "#0E1428",
          700: "#141B33",
          600: "#1B2440",
        },
        sbi: {
          blue: "#0D47F0",
          cyan: "#22D3EE",
          violet: "#7C6CF0",
          gold: "#F2B441",
        },
        mist: {
          100: "#F5F7FF",
          200: "#E7ECFB",
          300: "#C7D0EC",
          400: "#8C97BE",
        },
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["'Inter'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      backgroundImage: {
        "grid-glow":
          "radial-gradient(circle at 50% 0%, rgba(34,211,238,0.14), transparent 55%)",
        aurora:
          "radial-gradient(ellipse 80% 60% at 20% -10%, rgba(13,71,240,0.35), transparent 60%), radial-gradient(ellipse 60% 50% at 90% 10%, rgba(124,108,240,0.28), transparent 60%), radial-gradient(ellipse 60% 60% at 50% 100%, rgba(34,211,238,0.18), transparent 60%)",
      },
      boxShadow: {
        glow: "0 0 40px rgba(34,211,238,0.25)",
        "glow-blue": "0 0 50px rgba(13,71,240,0.35)",
        card: "0 8px 40px -12px rgba(0,0,0,0.5)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "pulse-glow": {
          "0%,100%": { opacity: 0.6, transform: "scale(1)" },
          "50%": { opacity: 1, transform: "scale(1.06)" },
        },
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "spin-slow": "spin-slow 14s linear infinite",
        "spin-slower": "spin-slow 26s linear infinite",
        marquee: "marquee 30s linear infinite",
        shimmer: "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
