/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // maps the class `font-loadfont` to our custom font
        loadfont: ['loadfont', 'ui-sans-serif', 'system-ui'],
      },
    },
  },
  plugins: [],
}