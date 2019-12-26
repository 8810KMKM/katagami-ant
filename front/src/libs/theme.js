import { createMuiTheme } from '@material-ui/core/styles'

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
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 12,
  },
  button: {
    fontSize: 16,
  },
}

const themeName = 'Hayato OKUMA Katagami annotation tool theme'

export default createMuiTheme({ palette, typography, themeName })
