import type { Config } from "tailwindcss";
import { heroui } from "@heroui/react";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },
    light: {
      colors: {
        white: "#FFFFFF",
        background: "#FFFFFF", 
        foreground: "#11181C", 
        primary: {
          foreground: "#3f3f46",
          DEFAULT: "#3f3f46"
        },
      },
      extend: {
      boxShadow: {
        "inner-strong": "inset 0 6px 12px 2px rgba(0, 0, 0, 0.25)",
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
} satisfies Config;
