module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors:{
        primary: '#ef1522'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
