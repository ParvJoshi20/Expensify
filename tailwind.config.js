/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'neon-green': '#39FF14',
        'purple': {
          400: '#9B59B6',
          500: '#8E44AD',
          300: '#BB8FCE',
          200: '#D7BDE2'
        }
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'poppins': ['Poppins', 'sans-serif']
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'slideInUp': 'slideInUp 0.5s ease-out'
      }
    },
  },
  plugins: [],
};