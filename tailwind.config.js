/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#00449e', // blue
        accent: '#ff4136', // red
      },
      fontFamily: {
        mono: ['Courier Next', 'courier', 'monospace'],
      },
    },
  },
  plugins: [],
};
