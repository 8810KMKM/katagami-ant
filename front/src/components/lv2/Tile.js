import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from 'components/lv1/Container';
import { Grid } from '@material-ui/core';
import { pink, grey, lime } from '@material-ui/core/colors';

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid'
  },
  tile: {
    color: grey[50],
    border: '2px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  selected: {
    color: grey[50],
    border: '2px solid',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(97, 97, 97, 0.7)'
  }
}));

export default function (props) {
  const {
    number,
    square,
    handleToggleTile
  } = props;
  const [isSelected, setIsSelected] = useState(false);
  let color = '';
  const classes = useStyles();

  const handleToggle = () => {
    setIsSelected(!isSelected);
    // handleToggleTile(number);
  }

  return (
    <Grid
      item
      xs={12 / square}
      className={isSelected ? classes.selected : classes.tile}
      onClick={handleToggle}
    />
  );
}