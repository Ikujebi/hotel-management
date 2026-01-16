import type { Config } from 'tailwindcss';
const { fontFamily } = require('tailwindcss/defaultTheme');

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx,css}',
    './src/app/web/**/*.{js,ts,jsx,tsx,mdx,css}',
  ],
  theme: {
    // Screens go here, outside extend
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        primary: '#038C7F',
        secondary: '#F2C641',
        tertiary: {
          dark: '#F27405',
          light: '#F2C641',
        },
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};

export default config;
