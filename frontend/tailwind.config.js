/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  safelist: [
    'bg-gradient-to-r',
    'from-sky-200',
    'via-sky-400', 
    'to-indigo-400',
    'bg-clip-text',
    'text-transparent',
    'type-caret'
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
