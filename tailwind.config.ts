import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'grey': {
          15: "#262626",
          20: "#363636",
          30: "#575757",
          50: "#808080",
          90: "#E5E5E5",
        },
        'mint': {
          300: "#ABFFC3",
        },
      },
    },
  },
  plugins: [],
};
export default config;
