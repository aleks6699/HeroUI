export const content = [
  './app/**/*.{js,ts,jsx,tsx}',
  './components/**/*.{js,ts,jsx,tsx}',
  './src/**/*.{js,ts,jsx,tsx}',
  './public/**/*.{html}',
];
export const theme = {
  extend: {
    animation: {
      'fade-in': 'fadeIn 0.4s ease-out',
      'fade-in-up': 'fadeInUp 0.5s ease-out',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
      fadeInUp: {
        '0%': { opacity: '0', transform: 'translateY(20px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
    },
  },
};
export const plugins = [];
