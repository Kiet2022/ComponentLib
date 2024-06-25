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
      width: {
        "156": "156px",
      },
      colors: {
        "grey-15": "#262626",
        "grey-20": "#363636",
        "grey-30": "#575757",
        "grey-90": "#E5E5E5",
        "grey-md": "#808080",
        "mint-300": "#ABFFC3",
      },
    },
  },
  plugins: [],
};
export default config;
