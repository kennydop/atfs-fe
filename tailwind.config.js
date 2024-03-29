/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#836FFF",
        secondary: "#15F5BA",
        tertiary: "#211951",
        bg: "#F0F3FF",
        text: "#3a3b3c",
      },
    },
  },
  plugins: [],
};
