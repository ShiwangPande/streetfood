module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'damion': ['Damion', 'cursive'],
      },
      colors: {
        'blue-400': '#60a5fa',
        'red-400': '#f87171',
        'indigo-400': '#818cf8',
        // Add more custom colors if needed
      },
      animation: {
        popup: 'popup 0.8s ease-in-out', // Adjust animation timing function if needed
      },
      keyframes: {
        popup: {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '10%': { transform: 'scale(1.1, 1.1)' },
          '30%, 64%': { transform: 'scale(0.9, 0.9)' },
          '50%, 57%': { transform: 'scale(1, 1)' },
        },
      },
    },
  },
}
