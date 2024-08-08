/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    "./src/**/*.{html,js}",
    "./node_modules/preline/dist/preline.js",
    "./node_modules/flowbite/**/*.js"
  ],
  
  darkMode: 'class',
  variants: {
    textColor: ['responsive', 'hover', 'focus', 'focus-within'],
  },
  
  theme: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/forms'),
    require('preline/plugin'),
    require('flowbite/plugin'),
  ],
}