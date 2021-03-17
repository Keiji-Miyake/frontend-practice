module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        cyan: '#9cdbff',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
