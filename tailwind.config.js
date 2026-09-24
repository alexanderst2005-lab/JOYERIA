/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          950: '#080808',
          900: '#0F0F10',
          850: '#161618',
          800: '#1F1F23',
          700: '#2E2E33',
          600: '#484851',
          500: '#71717A',
          400: '#A1A1AA',
          300: '#D4D4D8',
          200: '#E4E4E7',
          100: '#F4F4F5',
          50: '#FAFAFA',
        },
        ivory: {
          50: '#FDFBF7',
          100: '#F7F5EE',
          200: '#EFECE1',
          300: '#E2DDCF',
        },
        gold: {
          300: '#F5DE9C',
          400: '#E6CA72',
          500: '#C8A24A',
          600: '#B08833',
          700: '#8A671F',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Didot', 'Bodoni MT', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      letterSpacing: {
        luxury: '0.25em',
        editorial: '0.18em',
      }
    },
  },
  plugins: [],
}
