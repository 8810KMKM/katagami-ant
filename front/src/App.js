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
import { currentUser, logout } from 'lib/auth';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '120px auto'
  }
}));

export default function () {
  const [isloggedIn, setIsLoggedIn] = useState(currentUser);
  const classes = useStyles();

  const handleLogout = () => {
    logout();
    setIsLoggedIn(null);
  }

  const PrivateRoute = ({ path, component }) => {
    return (
      isloggedIn ? (
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
              auth={isloggedIn}
              setAuth={setIsLoggedIn}
            />}
          />
          {/* <Route path='/login' render={() =>
            <LoginPage
              auth={loggedIn}
              setAuth={setLoggedIn}
            />}
          /> */}
          <Route path='/' component={TopPage} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}
