/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#08080a',
          900: '#0d0d10',
          850: '#121216',
          800: '#18181d',
          750: '#1e1e24',
          700: '#26262d',
          600: '#34343c',
          500: '#4a4a53',
          400: '#6b6b75',
          300: '#9a9aa3',
          200: '#c6c6cc',
          100: '#e8e8ec',
        },
        brand: {
          50: '#fff1f1',
          100: '#ffdfdf',
          200: '#ffc5c5',
          300: '#ff9d9d',
          400: '#ff6868',
          500: '#f23a3a',
          600: '#dc1f1f',
          700: '#b81515',
          800: '#971515',
          900: '#7c1818',
          950: '#420808',
        },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,0.08), 0 8px 24px -12px rgba(0,0,0,0.25)',
        'card-hover': '0 4px 8px rgba(0,0,0,0.12), 0 20px 40px -16px rgba(0,0,0,0.35)',
        glow: '0 0 0 1px rgba(242,58,58,0.4), 0 8px 32px -8px rgba(242,58,58,0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'scale-in': 'scale-in 0.2s ease-out both',
      },
    },
  },
  plugins: [],
};
