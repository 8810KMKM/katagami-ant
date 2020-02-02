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
import AuthPage from 'pages/AuthPage'

const useStyles = makeStyles(theme => ({
  root: { margin: '80px auto' },
}))

export default () => {
  const [cookies, setCookie, removeCookie] = useCookies([
    'auth',
    'canRecommend',
  ])
  const classes = useStyles()

  const handleSignIn = (auth, canRecommend) => {
    if (!cookies.auth) {
      const age = 3600 * 20
      setCookie('auth', auth, { path: '/', maxAge: age })
      setCookie('canRecommend', canRecommend, { path: '/', maxAge: age })
    }
  }

  const handleSignOut = () => {
    removeCookie('auth', { path: '/' })
    redirectToWelcome()
  }

  const handleDoRecommendAnnotation = () => {
    window.location.href = 'ant/recommend/2'
  }

  const handleCancelRecommend = () => {
    removeCookie('canRecommend', { path: '/' })
  }

  const PrivateRoute = ({ path, component }) => {
    const [cookies] = useCookies(['auth', 'canRecommend'])
    if (cookies.auth) {
      return (
        <Route
          path={path}
          render={({ match }) =>
            component({
              auth: cookies.auth,
              canRecommend: cookies.canRecommend === '1',
              handleCancelRecommend,
              handleDoRecommendAnnotation,
              ...match.params,
            })
          }
        />
      )
    }
    redirectToWelcome()
    return
  }

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <Header handleSignOut={handleSignOut} />
          <Box className={classes.root}>
            <Switch>
              <Route
                path="/auth/:authorization/:canRecommend"
                render={({ match }) => (
                  <AuthPage
                    {...{
                      handleSignIn,
                      auth: cookies.auth,
                      ...match.params,
                    }}
                  />
                )}
              />
              <PrivateRoute
                path="/ant/:katagamiId/:num"
                component={AnnotationPage}
              />
              <PrivateRoute
                path="/results/:katagamiId/:fixedId"
                component={ResultPage}
              />
              <PrivateRoute path="/users/:userId/" component={UserPage} />
              <PrivateRoute path="/" component={TopPage} />
            </Switch>
          </Box>
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  )
}
