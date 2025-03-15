import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: "768px",
        lg: "1200px",
      },
      colors: {
        white: "#FFFFFF",
        background: "#FFFFFF",
        foreground: "#11181C",
        primary: {
          DEFAULT: "#3f3f46",
          foreground: "#3f3f46",
        },
      },
      boxShadow: {
        "inner-strong": "inset 0 6px 12px 2px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  plugins: [heroui()],
} satisfies Config;