/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        "light-gray": '#F5F7F9',
        "base-gray": '#4A4F56',
        "base-green": '#449672'
      },
      maxWidth: {
        container: '1550px'
      }
    }
  },
  plugins: []
};
