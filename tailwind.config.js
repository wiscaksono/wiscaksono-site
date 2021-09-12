module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      poppins: ["Poppins", "Open-Sans"],
    },

    extend: {
      colors: {
        darkgray: "#8C8C8C",
        contactbg: "#333333",
        orangebg: "#FF5B38",
      },

      backgroundImage: (theme) => ({
        background: "url('/images/background.svg')",
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
