import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "alphaton-dark": "rgb(10,10,10)",
        "alphaton-purple": "rgb(43,30,59)",
        "alphaton-blue": "rgb(62,123,250)",
        "alphaton-purple-light": "rgb(110,69,226)",
      },
      backgroundImage: {
        "gradient-hero": "linear-gradient(180deg, rgb(10,10,10) 27%, rgb(43,30,59) 100%)",
        "gradient-cta": "linear-gradient(59deg, rgb(62,123,250) 0%, rgb(110,69,226) 100%)",
        "gradient-investor": "linear-gradient(180deg, rgb(43,30,59) 0%, rgb(10,10,10) 56%)",
      },
      spacing: {
        "30": "7.5rem",
      },
    },
  },
  plugins: [],
};
export default config;

