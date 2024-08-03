/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow:{
        'movements-header': '0 -8px 16px rgb(96,165,250)'
      }
    },
  },
  plugins: [],
}

