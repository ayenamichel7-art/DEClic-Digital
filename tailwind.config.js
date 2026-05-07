/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./*.html', './api/**/*.js', './lib/**/*.js'],
  theme: {
    extend: {
      colors: {
        brand: {
          pink: '#E91E63',
          dark: '#0D1117',
        }
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        declic: {
          'primary': '#E91E63',
          'secondary': '#0D1117',
          'accent': '#F06292',
          'neutral': '#1f2937',
          'base-100': '#ffffff',
          'info': '#3abff8',
          'success': '#36d399',
          'warning': '#fbbd23',
          'error': '#f87272',
        },
      },
      'light',
      'dark',
    ],
  },
};
