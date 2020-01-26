import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom'
import { makeStyles, ThemeProvider } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import { CookiesProvider, useCookies } from 'react-cookie'
import { isAuthenticated, logout } from 'libs/auth'
import theme from 'libs/theme'
import Header from 'components/lv3/Header'
import TopPage from 'pages/TopPage'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import AnnotationPage from 'pages/AnnotationPage'
import ResultPage from 'pages/ResultPage'
import UserPage from 'pages/UserPage'
import SignInPage from 'pages/SignInPage'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '80px auto',
  },
}))

export default () => {
  const [cookies, setCookies, removeCookies] = useCookies(['auth'])
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())
  // const user = currentUser()
  const classes = useStyles()

  const handleLogout = () => {
    logout()
    setIsLoggedIn(null)
  }

  const handleSignOut = () => {
    removeCookies('auth')
    window.location.href = 'http://localhost:3001/welcome'
  }

  const handleSignIn = auth => {
    if (!cookies.auth) {
      let expires = new Date()
      expires.setDate(expires.getDate() + 1)
      setCookies('auth', auth, { path: '/', expires: expires })
    }
  }

  const MyRoute = ({ path, component }) => {
    if (cookies.auth) {
      return (
        <Route
          path={path}
          render={props => component({ ...props, auth: cookies.auth })}
        />
      )
    }
    window.location.href = 'http://localhost:3001/welcome'
  }

  const AuthRoute = ({ path, component }) => {
    let location = useLocation()
    let history = useHistory()
    let { from } = location.state || { from: { pathname: '/' } }

    useEffect(() => {
      if (isLoggedIn) {
        setTimeout(history.replace(from), 100)
      }
    })

    return <Route path={path} render={() => component({ setIsLoggedIn })} />
  }

  const PrivateRoute = ({ path, component }) => {
    // console.log(path);
    return isLoggedIn ? (
      <Route path={path} component={component} />
    ) : (
      <Route
        render={({ location }) => (
          <Redirect
            to={{
              pathname: '/sign_in',
              state: { from: location },
            }}
          />
        )}
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <CookiesProvider>
        <BrowserRouter>
          <Header
            isLoggedIn={isLoggedIn}
            handleLogout={handleLogout}
            theme={theme}
          />
          <Box className={classes.root}>
            <Switch>
              <Route
                path="/:authorization"
                render={props => (
                  <TopPage
                    {...props}
                    handleSignIn={handleSignIn}
                    auth={cookies.auth}
                  />
                )}
              />
              <MyRoute path="/" component={TopPage} />
              {/* <AuthRoute path="/sign_in" component={SignInPage} />
            <AuthRoute path="/signup" component={SignupPage} />
            <AuthRoute path="/login" component={LoginPage} /> */}
              <PrivateRoute
                path="/ant/:katagamiId/:userId/:num"
                component={AnnotationPage}
              />
              <PrivateRoute
                path="/results/:katagamiId"
                component={ResultPage}
              />
              <PrivateRoute path="/users/:userId/:email" component={UserPage} />
            </Switch>
          </Box>
        </BrowserRouter>
      </CookiesProvider>
    </ThemeProvider>
  )
}
