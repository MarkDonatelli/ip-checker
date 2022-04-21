module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
      },
      colors: {
        primaryGray: 'hsl(0, 0%, 17%)',
        primaryGrayHover: 'hsl(0, 0%, 28%)',
        secondaryGray: 'hsl(0, 0%, 59%)',
      },
      backgroundImage: {
        'header-pattern': "url('/src/assets/images/pattern-bg.png')",
      },
    },
  },
  plugins: [],
};
