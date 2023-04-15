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
      "paper": {
        DEFAULT: "hsl(190, 10%, 100%)",
        dark: "hsl(190, 10%, 90%)",
        darker: "hsl(190, 15%, 85%)",
      },
      "ink": {
        DEFAULT: "hsl(190, 10%, 20%)",
        light: "hsl(190, 15%, 25%)",
      },
      "accent": {
        light: "hsl(190, 80%, 70%)",
        DEFAULT: "hsl(190, 80%, 50%)",
        dark: "hsl(190, 60%, 40%)",
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