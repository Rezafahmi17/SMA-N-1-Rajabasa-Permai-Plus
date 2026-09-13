/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  '#eef2f7',
          100: '#d0dcea',
          200: '#a8c0d6',
          300: '#7ba0be',
          400: '#4d7fa6',
          500: '#2c618c',
          600: '#1b3a5c',
          700: '#152e49',
          800: '#0f2237',
          900: '#090f1c',
        },
        gold: {
          300: '#f4d48a',
          400: '#e8bc5a',
          500: '#d4a24e',
          600: '#b8863a',
          700: '#9a6a25',
        },
        cream: '#f8f6f1',
        'cream-dark': '#f0ece3',
      },
      fontFamily: {
        serif: ['"Lora"', 'Georgia', 'serif'],
        sans:  ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in':    'fadeIn 0.6s ease-out both',
        'fade-up':    'fadeUp 0.7s ease-out both',
        'slide-down': 'slideDown 0.4s ease-out both',
        'float':      'float 6s ease-in-out infinite',
        'shimmer':    'shimmer 2s linear infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          from: { opacity: '0', transform: 'translateY(-12px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        'card':       '0 4px 24px -4px rgba(15, 34, 55, 0.12)',
        'card-hover': '0 12px 40px -4px rgba(15, 34, 55, 0.22)',
        'glow-gold':  '0 0 24px rgba(212, 162, 78, 0.35)',
      },
    },
  },
  plugins: [],
};
