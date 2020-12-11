const { resolveProjectReferencePath } = require("typescript");

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      gridTemplateColumns: {
        'auto-fit-200': 'repeat(auto-fit, 200px)',
        'auto-fit-400': 'repeat(auto-fit, 400px)',
        'auto-fill-200': 'repeat(auto-fill, 200px)',
        'auto-fill-400': 'repeat(auto-fill, 400px)',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
