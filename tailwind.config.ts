import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        ninja: {
          blue: '#5FA8A8',
          dark: '#2C5F5F',
          light: '#F8F6F4',
          teal: '#7BC4C4',
          mint: '#D2E9E9',
        },
      },
    },
  },
  plugins: [],
};
export default config;
