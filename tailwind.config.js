/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        base: '#070A0B',
        surface: '#0D1214',
        elevated: '#121A1D',
        line: '#222B2F',
        tint: '#102621',
        accent: {
          DEFAULT: '#5DE4CC',
          ink: '#070A0B',
        },
        available: {
          DEFAULT: '#5DE383',
          bg: '#103D14',
        },
        fg: {
          DEFAULT: '#EEF3F2',
          muted: '#A0ADB1',
          subtle: '#788B92',
        },
      },
      fontFamily: {
        sans: ['"Geist Variable"', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"M PLUS 1 Code"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      borderRadius: {
        card: '14px',
      },
      maxWidth: {
        content: '1100px',
      },
      letterSpacing: {
        label: '0.12em',
        h1: '-2.5px',
        h2: '-0.8px',
      },
      keyframes: {
        ping2: {
          '0%': { transform: 'scale(1)', opacity: '0.7' },
          '80%, 100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      animation: {
        ping2: 'ping2 1.8s cubic-bezier(0,0,0.2,1) infinite',
      },
    },
  },
  plugins: [],
}
