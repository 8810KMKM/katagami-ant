import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import { CookiesProvider, useCookies } from 'react-cookie'
import theme from 'libs/theme'
import { redirectToWelcome } from 'libs/api'
import Header from 'components/lv3/Header'
import TopPage from 'pages/TopPage'
import AnnotationPage from 'pages/AnnotationPage'
import ResultPage from 'pages/ResultPage'
import UserPage from 'pages/UserPage'

const useStyles = makeStyles(theme => ({
  root: { margin: '80px auto' },
}))

export default () => {
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const classes = useStyles()

  const handleSignIn = auth => {
    if (!cookies.auth) {
      let expires = new Date()
      expires.setDate(expires.getDate() + 1)
      setCookies('auth', auth, { path: '/', expires: expires })
    }
  }

  const handleSignOut = () => {
    removeCookies('auth')
    redirectToWelcome()
  }

  const PrivateRoute = ({ path, component }) => {
    console.log(path)
    if (cookies.auth) {
      return (
        <Route
          path={path}
          render={({ match }) =>
            component({ auth: cookies.auth, ...match.params })
          }
        />
      )
    }
    redirectToWelcome()
  }

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <Header handleSignOut={handleSignOut} />
          <Box className={classes.root}>
            <Switch>
              <PrivateRoute
                path="/ant/:katagamiId/:num"
                component={AnnotationPage}
              />
              <PrivateRoute
                path="/results/:katagamiId"
                component={ResultPage}
              />
              <PrivateRoute path="/users/:userId/" component={UserPage} />
              <Route
                path="/:authorization"
                render={({ match }) => (
                  <TopPage
                    {...{
                      handleSignIn: handleSignIn,
                      auth: cookies.auth,
                      ...match.params,
                    }}
                  />
                )}
              />
              <PrivateRoute path="/" component={TopPage} />
            </Switch>
          </Box>
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  )
}
