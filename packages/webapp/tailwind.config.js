/** @type {import('tailwindcss').Config} */
export const darkMode = ["class"];
export const content = [
  "./pages/**/*.{ts,tsx}",
  "./components/**/*.{ts,tsx}",
  "./app/**/*.{ts,tsx}",
  "./src/**/*.{ts,tsx}",
  "./index.html",
];
export const prefix = "";
export const theme = {
  container: {
    center: true,
    padding: "2rem",
    screens: {
      "2xl": "1400px",
    },
  },
  fontSize: {
    sm: "0.8rem",
    base: "1rem",
    xl: "1.25rem",
    "2xl": "1.563rem",
    "3xl": "1.953rem",
    "4xl": "2.441rem",
    "5xl": "3.052rem",
    veryLarge: "10rem",
    extraLarge: "15rem",
  },
  extend: {
    padding: {
      custom: "8px 14px",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },

    colors: {
      primary: {
        light: "#262626",
        DEFAULT: "#202020",
        dark: "#151515",
        darker: "#111111",
      },
      secondary: {
        ultraLight: "#c1e6f6",
        veryLight: "#4bbbe5",
        light: "#1684b3",
        DEFAULT: "#146d96",
        dark: "#164a64",
        customGray: "#898E87",
      },
      primaryButton: {
        light: "#5d5d5d",
        deleteLight: "#c04242",
        delete: "#ab3737",
        create: "#98FF98",
      },
      tertiary: {
        light: "#f58b1a",
        default: "#f7a540",
      },
      textInput: {
        light: "#d1d1d1",
        default: "#888888",
        exercisebg: "#ededed",
        expandedContent: "#dcdcdc",
        darker: "#4f4f4f",
      },
      expandedContent: {
        primaryText: "#292929",
        secondaryText: "#3d3d3d",
      },
      exerciseCard: {
        background: "#dfdfdf",
        primaryText: "#363636",
        secondaryText: "#545454",
      },
      border: {
        default: "rgb(40,40,40)",
        dark: "rgb(32,32,32)",
      },
    },
    fontFamily: {
      display: "'Readex Pro', sans-serif",
    },
  },
};
// eslint-disable-next-line no-undef
export const plugins = [require("tailwindcss-animate")];
