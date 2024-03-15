/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: theme => ({
                 'hero': "url('/login3.jpg')",
                 'footer-texture': "url('/img/footer-texture.png')",
                })
    },
  },
  plugins: [],
}

