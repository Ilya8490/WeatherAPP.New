/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        slateNight: "#07111F",
        skyGlow: "#77C6FF",
        mist: "#CFE9FF",
        aurora: "#9EE7D7",
        shell: "#F5F8FC",
      },
      boxShadow: {
        panel: "0 18px 48px rgba(7, 17, 31, 0.16)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(119, 198, 255, 0.24), transparent 32%), radial-gradient(circle at 80% 20%, rgba(158, 231, 215, 0.22), transparent 24%)",
      },
      fontFamily: {
        sans: ["Sora", "system-ui", "sans-serif"],
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
