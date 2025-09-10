/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-bg': '#0a0a0a',
        'cyber-text': '#e0e0e0',
        'cyber-primary': '#00f0ff',
        'cyber-secondary': '#f000ff',
        'cyber-accent': '#ff00ff',
      },
    },
  },
  plugins: [],
}
