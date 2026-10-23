/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: 'var(--bg)',
        panel: 'var(--panel)',
        ink: 'var(--ink)',
        mute: 'var(--muted)',
        signal: 'var(--signal)',
        beam: 'var(--accent)',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', 'Georgia', 'sans-serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
        mono: ['"Hanken Grotesk"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
