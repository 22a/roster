import nightwind from 'nightwind';
import tailwindForms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    nightwind: {
      transitionDuration: false, // default '300ms'
    },
  },
  plugins: [tailwindForms, nightwind],
  darkMode: 'class',
};
