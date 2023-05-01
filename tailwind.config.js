// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme:{
    textColor:{
      'yellowgreen':'#B4E900'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],

}
