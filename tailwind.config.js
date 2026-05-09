/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        penguin: {
          yellow: 'color-mix(in srgb, var(--penguin-yellow), transparent calc(100% - (<alpha-value> * 100%)))',
          black: 'color-mix(in srgb, var(--penguin-black), transparent calc(100% - (<alpha-value> * 100%)))',
          white: '#FFFFFF',
          gray: 'color-mix(in srgb, var(--penguin-gray), transparent calc(100% - (<alpha-value> * 100%)))',
        }
      },
      animation: {
        'gradient-x': 'gradient-x 3s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};
