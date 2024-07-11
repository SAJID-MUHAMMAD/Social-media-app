/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#32375C",
        "11175D": "#11175D",
      },
      fontFamily: {
        Inter: ["Inter", " sans-serif"],
        Nunito: ["Nunito", " sans-serif"],
      },
    },
  },
  plugins: [],
};
