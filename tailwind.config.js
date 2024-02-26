/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        
        navy : {
          950: '#265073',
        },
        teal: {
          750: '#2D9596',
          550: '#9AD0C2',
        },
        gray: {
          150: '#F1FADA',
        }
      },
    },
    backgroundImage: {
      'main-bg': "url('/src/images/background.jpeg')"
    },
  },
  plugins: [],
}

