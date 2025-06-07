/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: [{ pattern: /^line-clamp-/ }],
  theme: {
    extend: {
      fontFamily: {
        heading: ["SpoqaHanSansNeo", "sans-serif"],
        body: ["Pretendard", "sans-serif"],
      },
      colors: {
        primary: "#000000",
        secondary: "#6D8591",
        danger: "#ef4444",
      },
      spacing: {
        btnX: "1.5rem",
        btnY: "0.75rem",
      },
      borderRadius: {
        xl: "1rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};
