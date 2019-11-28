import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch,
} from 'react-router-dom';
import TopPage from 'pages/TopPage';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    margin: '120px auto'
  }
}));

export default function () {
  const classes = useStyles();

  return (
    <BrowserRouter>
      <Box className={classes.root}>
        <Switch>
          <Route path='/' component={TopPage} />
        </Switch>
      </Box>
    </BrowserRouter>
  );
}
