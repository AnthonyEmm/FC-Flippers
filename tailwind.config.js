export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ["Exo", "sans-serif"],
      },
      keyframes: {
        bounce: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15%)" },
        },
      },
      animation: {
        bounceOnce: "bounce 1s ease-in-out 3",
      },
      scrollBehavior: {
        smooth: "smooth",
      },
    },
  },
  plugins: [],
};
