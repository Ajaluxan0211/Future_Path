/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E8F5F0',
          100: '#C5E8D9',
          500: '#1D9E75',
          600: '#178A64',
          700: '#0F6E50',
          900: '#085041',
        },
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
}