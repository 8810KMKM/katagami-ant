import React, { useState, useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom'
import { makeStyles } from '@material-ui/styles'
import { Box } from '@material-ui/core'
import TopPage from 'pages/TopPage'
import SignupPage from 'pages/SignupPage'
import LoginPage from 'pages/LoginPage'
import AnnotationPage from 'pages/AnnotationPage'
import Header from 'components/lv3/Header'
import { isAuthenticated, logout, currentUser } from 'lib/auth'

const useStyles = makeStyles(theme => ({
  root: {
    margin: '80px auto',
  },
}))

export default function() {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated())
  const user = currentUser()
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
    <BrowserRouter>
      <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Box className={classes.root}>
        <Switch>
          <Route path="/ant/:katagamiId/:userId" component={AnnotationPage} />
          <AuthRoute path="/signup" component={SignupPage} />
          <AuthRoute path="/login" component={LoginPage} />
          <PrivateRoute path="/" component={TopPage} />
        </Switch>
      </Box>
    </BrowserRouter>
  )
}
