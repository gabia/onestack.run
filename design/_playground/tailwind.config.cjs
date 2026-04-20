/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  safelist: [
    { pattern: /data-plid/ },
  ],
  theme: {
    extend: {
      colors: {
        primary: '#136dec',
      },
    },
  },
  plugins: [],
}
