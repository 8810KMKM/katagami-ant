import React, { useState } from 'react';
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';
import TopPage from 'pages/TopPage';
import SignupPage from 'pages/SignupPage';
import LoginPage from 'pages/LoginPage';
import { currentUser, logout } from 'lib/auth';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '120px auto'
  }
}));

export default function () {
  const [isLoggedIn, setIsLoggedIn] = useState(currentUser());
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    setIsLoggedIn(null);
  }

  const PrivateRoute = ({ path, component }) => {
    return (
      isLoggedIn ? (
        <Route path={path} component={component} />
      ) : (
        <Route
          render={({ location }) => (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location }
              }}
            />
          )}
        />
      )
    );
  }

  return (
    <BrowserRouter>
      <Box className={classes.root}>
        <Switch>
          <Route path='/signup' render={() =>
            <SignupPage
              auth={isLoggedIn}
              setAuth={setIsLoggedIn}
            />}
          />
          <Route path='/login' render={() =>
            <LoginPage
              auth={isLoggedIn}
              setAuth={setIsLoggedIn}
            />}
          />
          <PrivateRoute path='/' component={TopPage} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}
