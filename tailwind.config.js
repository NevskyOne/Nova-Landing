/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./app.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Comfortaa', 'sans-serif'],
        display: ['Dela Gothic One', 'sans-serif'],
      },
      colors: {
        nova: {
          bg: '#06080D',
          card: 'rgba(255, 255, 255, 0.02)',
          primary: '#22D3EE',
          secondary: '#818CF8',
          accent: '#C084FC',
          text: '#E2E8F0',
          muted: '#94A3B8',
        }
      },
      transitionTimingFunction: {
        'fluid': 'cubic-bezier(0.25, 1, 0.5, 1)',
      },
      animation: {
        'float': 'float 8s ease-in-out infinite',
        'float-delayed': 'float 8s ease-in-out 4s infinite',
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'twinkle': 'twinkle 4s ease-in-out infinite',
        'morph': 'morph 15s ease-in-out infinite alternate',
        'shine-logo': 'shine-logo 6s infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
      },
      keyframes: {
        float: {'0%, 100%': { transform: 'translateY(0)' },'50%': { transform: 'translateY(-20px)' }},
        twinkle: {'0%, 100%': { opacity: 0.2, transform: 'scale(0.8)' },'50%': { opacity: 0.9, transform: 'scale(1.2)' }},
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        },
        'shine-logo': {'0%, 80%': { left: '-100%', opacity: '0' },'85%': { opacity: '0.5' },'100%': { left: '200%', opacity: '0' }},
        'gradient-xy': {
          '0%, 100%': { 'background-size': '400% 400%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' }
        }
      }
    },
  },
  plugins: [],
}