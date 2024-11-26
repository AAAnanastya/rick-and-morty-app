/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin');

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'scuba-blue': '#00b0c8',
        'yellow-green': '#bad049',
        'emerald-green': '#017e3c',
        'custom-yellow': '#f5e43e',
        'light-yellow': '#fff8ba',
        'deep-purple': '#2d1e40',
        'dark-green': '#1f3729',
        'deep-blue': '#101f3d',
        'dark-grey': '#1a1a1a',
        'ivory-white': '#FFFFF0',
      },
      backgroundImage: {
        'characters-page-bg': "url('./src/assets/bg-cosmos.jpg')",
        'episodes-page-bg': "url('./src/assets/episodes-background.jpg')",
        'locations-page-bg': "url('./src/assets/bg-cosmos-3.jpg')",
        'character-card-bg': "url('./src/assets//bg-cosmos-4.jpg')",
        'location-card-bg': "url('./src/assets//bg-cosmos-6.jpg')",
        'episode-card-bg': "url('./src/assets//bg-cosmos-5.jpg')",
      },
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        bungee: ['Bungee', 'cursive'],
      },
      textShadow: {
        dark: '0 2px 4px #101f3d',
        light: '0 2px 4px #bad049',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        {
          values: theme('textShadow'),
          variants: ['hover', 'focus'],
        }
      );
    }),
    function ({ addBase, addComponents }) {
      addBase({
        body: {
          'overscroll-behavior': 'none',
        },
      });
      addComponents({
        'input[type="search"]::-webkit-search-cancel-button': {
          display: 'none',
        },
      });
    },
  ],
};
