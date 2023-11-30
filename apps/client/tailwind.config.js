/** @type {import('tailwindcss').Config} */
const { createGlobPatternsForDependencies } = require('@nx/react/tailwind');
const { join } = require('path');
const colors = require('tailwindcss/colors');
module.exports = {
  darkMode: ["class"],
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{js,ts,jsx,tsx,mdx}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.slate,
        success: colors.emerald,
        warning: colors.amber,
        error: colors.red,
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
