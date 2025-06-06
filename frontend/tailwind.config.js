const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      sm: { max: '640px' },
      md: { max: '768px' },
      lg: { max: '1024px' },
      xl: { max: '1280px' },
    },
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'main-text-gray': 'hsla(0, 0%, 20%, 1)',
        'navy': '#0a192f',
        'blue-accent': ' hsl(200, 100%, 40%)',
        'light-navy': '#112240',
        'lightest-navy': '#233554',
        'slate': '#8892b0',
        'light-slate': '#a8b2d1',
        'lightest-slate': '#ccd6f6',
        'white': '#ffffff',
        'green': '#64ffda',
        'light-tan': 'hsla(40, 40%, 97%, 1)',
        'light-gray': '#EAEAEA',
        'tmbg': 'hsla(44, 50%, 98%, 0.7)',
        'notion-green': '#DAECDA',
        'notion-brown': '#F2E8D9',
        'notion-gray': '#EAEAEA',
        // Include specific colors instead of all colors to avoid deprecation warnings
        red: colors.red,
        yellow: colors.yellow,
        blue: colors.blue,
        purple: colors.purple,
        pink: colors.pink,
        indigo: colors.indigo,
        gray: colors.gray,
        neutral: colors.neutral,
        stone: colors.stone,
        slate: colors.slate,
        sky: colors.sky,
        emerald: colors.emerald,
        orange: colors.orange,
        amber: colors.amber,
        lime: colors.lime,
        teal: colors.teal,
        cyan: colors.cyan,
        rose: colors.rose,
        violet: colors.violet,
        fuchsia: colors.fuchsia,
        zinc: colors.zinc,
      },
    },
    fontFamily: {
      'sans': ['Inter var', 'ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
    fontSize: {
      "xxs": '0.65rem'
    },
    animation: {
      fade: 'fadeIn 1s ease-in-out',
      fadeSlow1: 'fadeIn 2s ease-in-out',
      fadeSlow2: 'fadeIn 5s ease-in-out',
      fadeSlow3: 'fadeIn 10s ease-in-out',
      fadeSlow4: 'fadeIn 15s ease-in-out',

    },

    // that is actual animation
    keyframes: theme => ({
      fadeIn: {
        '0%': { opacity: 0 },
        '100%': { color: 1 },
      },
    }),
  },
  plugins: [
    {
      'postcss-import': {},
      tailwindcss: {},
      autoprefixer: {},
    }
  ],
}
