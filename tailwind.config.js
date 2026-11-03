/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#0F2850',
          darkNavy: '#0A192F',
          royalBlue: '#1E3A8A',
          sapphire: '#2563EB',
          gold: '#F59E0B',
          amberDark: '#D97706',
          emeraldDark: '#065F46',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Merriweather', 'Georgia', 'Cambria', 'serif'],
      },
    },
  },
  plugins: [],
};
