/** @type {import('tailwindcss').Config} */
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
      fontFamily: {
        barlow: ['"Barlow Condensed"', 'sans-serif'],
        bungee: ['Bungee', 'cursive'],
      },
    },
  },
  plugins: [
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
