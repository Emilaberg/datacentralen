/** @type {import('tailwindcss').Config} */
export default {
  content: ["./**/*.{html,js,ts,jsx,tsx,md}"],
  theme: {
    extend: {
      colors: {
        backgroundWhite: "#FBF5E6",
        footerTextColor: "#828282",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
