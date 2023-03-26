const colors = require("tailwindcss/colors")

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,vue,css}",
  ],
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      "white": "#ffffff",
      "chalk": {
        DEFAULT: colors.slate["50"],
        dark: colors.slate["200"],
        darker: colors.slate["400"],
      },
      "wall": {
        DEFAULT: colors.slate["800"],
        light: colors.slate["700"],
      },
      "accent": {
        light: colors.sky["200"],
        DEFAULT: colors.sky["300"],
        dark: colors.sky["400"],
      },
      "cell-1": {
        DEFAULT: colors.emerald["700"],
        bg: colors.emerald["200"],
      },
      "cell-2": {
        DEFAULT: colors.violet["700"],
        bg: colors.violet["200"],
      },
      "cell-3": {
        DEFAULT: colors.pink["700"],
        bg: colors.pink["200"],
      },
      "cell-4": {
        DEFAULT: colors.lime["700"],
        bg: colors.lime["200"],
      },
      "cell-5": {
        DEFAULT: colors.amber["700"],
        bg: colors.amber["200"],
      },
      "cell-6": {
        DEFAULT: colors.red["500"],
        bg: colors.red["200"],
      },
    },
    extend: {},
  },
  plugins: [],
}