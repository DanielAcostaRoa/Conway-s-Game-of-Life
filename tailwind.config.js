/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
const plugin = require('tailwindcss/plugin')

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/assets/**/*.{js,ts,jsx,tsx,css}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: colors.gray,
      green: colors.green,
      purple: colors.purple,
      yellow: colors.yellow,
      pink: colors.fuchsia,
      red: colors.red,
      blue: colors.blue,
      esmerald: colors.emerald,
      lime: colors.lime,
      orange: colors.orange,
    }
  }
}