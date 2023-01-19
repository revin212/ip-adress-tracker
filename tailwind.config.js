/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./*.html'],
  theme: {
    extend: {
      colors:{
        'main-very-dark-gray': 'hsl(0, 0%, 17%)',
        'main-dark-gray': 'hsl(0, 0%, 59%)',
      },
      fontFamily:{
        'main-font': ['Rubik', 'sans-serif'],
      },
  },
  plugins: [],
}
}
