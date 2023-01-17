module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      'main-text-gray': 'hsla(0, 0%, 34%, 1)',
      'gray': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#bdb604',
      'gray-dark': '#273444',
      'gray-light': '#d3dce6',
      'white': '#ffffff',
    },
    fontFamily: {
      'sans': ['Inter var', 'ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['"Open Sans"'],
    },
  },
  plugins: [],
}
