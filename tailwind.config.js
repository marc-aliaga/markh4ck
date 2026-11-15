/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans"],
        orbitron: ["Orbitron", "sans-serif"],
      },
      screens: {
        mdd: "991px",
      },
    },
  },
  plugins: [],
};
