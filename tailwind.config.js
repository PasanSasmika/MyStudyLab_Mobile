/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: We point to both App.tsx and the src folder
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}