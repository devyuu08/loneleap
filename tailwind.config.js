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
    },
  },
  plugins: [],
};
