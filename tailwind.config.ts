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
        sand: "#F3F0EA",
        paper: "#FFFDFC",
        ink: "#252321",
        teal: "#302C28",
        tomato: "#B58A4A",
        mustard: "#D8C09A",
        success: "#657264",
        line: "#DDD7CE",
      },
    },
  },
  plugins: [],
};
export default config;
