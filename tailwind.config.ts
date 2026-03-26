import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#0A0A0A',
          blue: {
            50: '#EBF0FF',
            100: '#D6E0FF',
            200: '#ADC1FF',
            300: '#85A3FF',
            400: '#5C84FF',
            500: '#1E3A8A',
            600: '#1A3378',
            700: '#152B66',
            800: '#112254',
            900: '#0C1A42',
          },
          silver: {
            50: '#FAFAFA',
            100: '#F4F4F5',
            200: '#E4E4E7',
            300: '#D4D4D8',
            400: '#A1A1AA',
            500: '#71717A',
            600: '#52525B',
            700: '#3F3F46',
            800: '#27272A',
            900: '#18181B',
          },
        },
        surface: {
          primary: '#FFFFFF',
          secondary: '#F4F4F5',
          dark: '#0A0A0A',
          'dark-alt': '#18181B',
        },
        accent: {
          blue: '#1E3A8A',
          'blue-hover': '#1A3378',
          'blue-light': '#5C84FF',
        },
        status: {
          success: '#16A34A',
          warning: '#D97706',
          error: '#DC2626',
          info: '#2563EB',
        },
      },
      fontFamily: {
        heading: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'card': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        'elevated': '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        ticker: 'ticker 35s linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
