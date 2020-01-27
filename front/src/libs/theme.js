import { createMuiTheme } from '@material-ui/core/styles'
import { jaJP } from '@material-ui/core/locale'
import KoruriTtf from 'fonts/Koruri-Regular.ttf'
import AudiowideTtf from 'fonts/Audiowide-Regular.ttf'

const palette = {
  primary: { main: '#00796B' },
  secondary: { main: '#673AB7' },
  error: { main: '#ef5350' },
  warning: { main: '#cddc39' },
  info: { main: '#004d40' },
  success: { main: '#26c6da' },
}

const koruri = {
  fontFamily: 'Koruri',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Koruri'),
    local('Koruri-Regular'),
    url(${KoruriTtf}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const audiowide = {
  fontFamily: 'Audiowide',
  fontStyle: 'normal',
  fontDisplay: 'swap',
  fontWeight: 400,
  src: `
    local('Audiowide'),
    local('Audiowide-Regular'),
    url(${AudiowideTtf}) format('ttf')
  `,
  unicodeRange:
    'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF',
}

const typography = {
  fontFamily: 'Koruri, Arial',
  h1: {
    fontSize: 32,
    fontWeight: 700,
    color: palette.primary.main,
  },
  h2: {
    fontSize: 24,
    fontWeight: 700,
    marginBottom: 8,
    color: palette.primary.main,
  },
  body1: {
    fontSize: 16,
    color: '#030303',
  },
  body2: {
    fontSize: 16,
    fontWeight: 700,
    color: '#fafafa',
  },
  button: {
    fontSize: 16,
    color: '#fafafa',
  },
  caption: {
    fontSize: 12,
    color: palette.info.main,
  },
}

const themeName = 'Hayato OKUMA Katagami annotation tool theme'

export default createMuiTheme(
  {
    palette,
    typography,
    themeName,
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': [koruri, audiowide],
        },
      },
    },
  },
  jaJP
)
