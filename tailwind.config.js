/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- ACEASTA ESTE LINIA CRITICĂ
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}