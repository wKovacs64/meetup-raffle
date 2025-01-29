/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        ripple: {
          '0%': {
            top: 'calc(var(--size) * 0.45)',
            left: 'calc(var(--size) * 0.45)',
            width: 'calc(var(--size) * 0.1)',
            height: 'calc(var(--size) * 0.1)',
            opacity: '0',
          },
          '4.9%': {
            top: 'calc(var(--size) * 0.45)',
            left: 'calc(var(--size) * 0.45)',
            width: 'calc(var(--size) * 0.1)',
            height: 'calc(var(--size) * 0.1)',
            opacity: '0',
          },
          '5%': {
            top: 'calc(var(--size) * 0.45)',
            left: 'calc(var(--size) * 0.45)',
            width: 'calc(var(--size) * 0.1)',
            height: 'calc(var(--size) * 0.1)',
            opacity: '1',
          },
          '100%': {
            top: '0px',
            left: '0px',
            width: 'var(--size)',
            height: 'var(--size)',
            opacity: '0',
          },
        },
      },
      animation: {
        ripple: 'ripple 1.5s cubic-bezier(0, 0.2, 0.8, 1) infinite',
      },
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
