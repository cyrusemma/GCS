/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        crown: {
          blue: '#0D47A1',
          'blue-light': '#1565C0',
          'blue-dark': '#0A2E6E',
          gold: '#D4AF37',
          'gold-light': '#E8C84A',
          white: '#F5F7FA',
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'checkered': "repeating-conic-gradient(#D4AF37 0% 25%, #B8960C 25% 50%)",
      }
    },
  },
  plugins: [],
}
