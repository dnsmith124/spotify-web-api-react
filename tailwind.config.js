/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'yellow-light': '#f6e7ae',
        'yellow-dark': '#f39c12',
        'spotify-green': '#1db954',
        'spotify-black': '#191414',
        'spotify-dark-gray': "#202020",
        'spotify-hover-gray': "#383234",
        'spotify-dark-red': '#4F1E18',
      },
    }
  },
  plugins: [],
}

