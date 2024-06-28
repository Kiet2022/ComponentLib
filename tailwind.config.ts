import type { Config } from "tailwindcss";
import { PluginCreator } from 'tailwindcss/types/config';

const myPlugin: PluginCreator = ({ addVariant }) => {
  addVariant('search-cancel', '&::-webkit-search-cancel-button');
};
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
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
  plugins: [myPlugin  ],
};
export default config;
