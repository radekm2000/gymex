/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#262626",
          DEFAULT: "#202020",
          dark: "#151515",
        },
      },
      fontFamily: {
        display: "'Readex Pro', sans-serif",
      },
      fontWeight: {
        light: "300",
      },
    },
  },
  plugins: [],
};
