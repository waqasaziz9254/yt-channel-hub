/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./context/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: "#080808",
          card: "#111111",
          card2: "#151515",
          border: "#232323",
        },
        brand: {
          red: "#e1122a",
          redBright: "#ff3b4e",
          redDim: "#8a0d1c",
        },
        ink: {
          DEFAULT: "#f5f5f7",
          dim: "#9a9aa1",
          faint: "#5c5c63",
        },
        accent: {
          green: "#2fbf71",
        },
      },
      fontFamily: {
        display: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(225, 18, 42, 0.45)",
        glowLg: "0 20px 60px -15px rgba(225, 18, 42, 0.55)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
};
