/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "base-gray": "#717880",
        "dark-gray": '#4E575F',
        "lighter-gray": '#F5F7F9',
        "light-gray": "#AEB4BC",
        "base-green": '#449672',
        "dark-green": '#2A6846'
      },
      maxWidth: {
        container: '1550px'
      }
    }
  },
  plugins: []
};
