/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./index.html', './App.tsx', './index.tsx', './pages/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './contexts/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          deep: '#0a010d',
          void: '#050107',
          magenta: '#ff00a0',
          accent: '#810955',
          glass: 'rgba(255, 255, 255, 0.02)',
          border: 'rgba(255, 255, 255, 0.08)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
      transitionProperty: {
        colors: 'color, background-color, border-color, text-decoration-color, fill, stroke',
      },
    },
  },
  plugins: [],
};
