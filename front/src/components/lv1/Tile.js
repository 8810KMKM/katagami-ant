import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

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
    backgroundColor: 'rgba(205, 220, 57, 0.8)'
  }
}));

export default function (props) {
  const {
    number,
    square,
    isSelected,
    handleToggleTile
  } = props;
  const classes = useStyles();

  return (
    <Grid
      item
      xs={12 / square}
      className={
        isSelected
          ? classes.tile + ' ' + classes.selected
          : classes.tile
      }
      onClick={() => handleToggleTile(number)}
    />
  );
}