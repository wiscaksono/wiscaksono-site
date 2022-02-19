module.exports = {
  content: ["./*.html"],
  theme: {
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
  plugins: [require("@tailwindcss/aspect-ratio")],
};
