import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0a1f33",
          light: "#173654",
          deep: "#081a2b",
        },
        accent: {
          DEFAULT: "#fe6b00",
          hover: "#e66000",
          deep: "#a04100",
          deepHover: "#8a3800",
        },
        onNavy: {
          bright: "#f4f8ff",
          DEFAULT: "#c3d1e3",
          muted: "#9fb3c8",
          faint: "#8fa4bb",
        },
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        display: ['"Space Grotesk"', "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
        arabic: ['"Noto Sans Arabic"', "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
