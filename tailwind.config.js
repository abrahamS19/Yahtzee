const colors = require('tailwindcss/colors');
module.exports = {
  content: ['./src/**/*.{js,html}'],
  theme: {
    extend: {},
    colors: {
      ...colors,
    },
  },
  plugins: [],
};
