/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  safelist: ["line-clamp-2"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["SpoqaHanSansNeo", "sans-serif"],
        body: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
