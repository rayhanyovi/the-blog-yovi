import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        moveRightLeft: {
          "0%": { transform: "translateX(50px) translateY(0)" }, // Start at right
          "12.5%": { transform: "translateX(35px) translateY(35px)" }, // Bottom-right
          "25%": { transform: "translateX(0) translateY(50px)" }, // Bottom
          "37.5%": { transform: "translateX(-35px) translateY(35px)" }, // Bottom-left
          "50%": { transform: "translateX(-50px) translateY(0)" }, // Left
          "62.5%": { transform: "translateX(-35px) translateY(-35px)" }, // Top-left
          "75%": { transform: "translateX(0) translateY(-50px)" }, // Top
          "87.5%": { transform: "translateX(35px) translateY(-35px)" }, // Top-right
          "100%": { transform: "translateX(50px) translateY(0)" }, // Back to right
        },
      },
      animation: {
        moveRightLeft: "moveRightLeft 40s infinite",
      },
      colors: {
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
      },
    },
  },
  plugins: [],
};

export default config;
