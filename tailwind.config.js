module.exports = {
  theme: {
    fontFamily: {
      sans: [
        'Montserrat',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji',
      ],
    },
    extend: {
      colors: {
        primary: '#EB5757',
        secondary: '#fed7d7',
      },
    },
  },
  variants: {},
  plugins: [],
  purge: {
    options: {
      content: ['./public/**/*.html', './src/**/*.vue'],
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
      ],
    },
  },
}
