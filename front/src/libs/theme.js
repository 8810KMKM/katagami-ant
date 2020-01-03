import { createMuiTheme } from '@material-ui/core/styles'
import { jaJP } from '@material-ui/core/locale'

const palette = {
  primary: { main: '#00796B' },
  secondary: { main: '#673AB7' },
  error: { main: '#ef5350' },
  warning: { main: '#cddc39' },
  info: { main: '#004d40' },
  success: { main: '#26c6da' },
}

const typography = {
  h1: {
    fontSize: 32,
    fontWeight: 700,
    color: palette.primary.main,
  },
  h2: {
    fontSize: 24,
    fontWeight: 700,
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
}

const themeName = 'Hayato OKUMA Katagami annotation tool theme'

export default createMuiTheme({ palette, typography, themeName }, jaJP)
