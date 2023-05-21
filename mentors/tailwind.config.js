/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '900px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        LightBlue: "#0BDAFE",
        MdBlue: "#2455FE",
        MdBlue500: "#15A4FE",
        DeepBlue: "#310BFE",
        x: '',
      },fontSize: {
        15: '15px',
        16: '16px',
        18: "18px",
        20: "20px",
      },
      padding: {
        15: "15px",
      },
    },
  },
  plugins: [],
}