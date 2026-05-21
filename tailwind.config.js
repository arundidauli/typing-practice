/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        void: '#0b0f14',
        surface: '#111820',
        panel: '#17202b',
        border: '#293241',
        neon: '#4f8cff',
        neonLight: '#7dd3fc',
        neonGlow: '#93c5fd',
        accent: '#14b8a6',
        accentLight: '#5eead4',
        danger: '#f43f5e',
        warn: '#f59e0b',
        success: '#10b981',
        muted: '#4b5563',
        dim: '#6b7280',
        primary: '#e5e7eb',
        secondary: '#9ca3af',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'cursor-blink': 'cursorBlink 1s step-end infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(124, 58, 237, 0.8), 0 0 80px rgba(124, 58, 237, 0.3)' },
        },
        cursorBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'neon': '0 0 20px rgba(79, 140, 255, 0.22)',
        'neon-lg': '0 0 36px rgba(79, 140, 255, 0.26)',
        'glass': '0 8px 28px rgba(0, 0, 0, 0.28), inset 0 1px 0 rgba(255,255,255,0.04)',
        'card': '0 18px 44px rgba(0, 0, 0, 0.28)',
      },
    },
  },
  plugins: [],
}
