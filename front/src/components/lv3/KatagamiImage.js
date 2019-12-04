import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from 'components/lv1/Container';

const useStyles = makeStyles(theme => ({
  katagami: {
    width: '640px',
    height: 'auto'
  }
}));

export default function (props) {
  const {
    katagamiUrl
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        src={katagamiUrl}
        alt={`Image ${katagamiId}`}
        className={classes.katagami}
      />
    </div>
  );
}
