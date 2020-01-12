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
import { isAuthenticated, logout } from 'libs/auth'
import theme from 'libs/theme'
import Header from 'components/lv3/Header'
import TopPage from 'pages/TopPage'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import AnnotationPage from 'pages/AnnotationPage'
import ResultPage from 'pages/ResultPage'
import UserPage from 'pages/UserPage'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '80px auto',
  },
}))

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())
  // const user = currentUser()
  const classes = useStyles()

  const handleLogout = () => {
    logout()
    setIsLoggedIn(null)
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
              pathname: '/login',
              state: { from: location },
            }}
          />
        )}
      />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          theme={theme}
        />
        <Box className={classes.root}>
          <Switch>
            <AuthRoute path="/signup" component={SignupPage} />
            <AuthRoute path="/login" component={LoginPage} />
            <PrivateRoute
              path="/ant/:katagamiId/:userId/:num"
              component={AnnotationPage}
            />
            <PrivateRoute path="/results/:katagamiId" component={ResultPage} />
            <PrivateRoute path="/users/:userId/:email" component={UserPage} />
            <PrivateRoute path="/" component={TopPage} />
          </Switch>
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  )
}
