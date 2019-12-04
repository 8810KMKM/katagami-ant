import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    width: 640
  },
  katagami: {
    backgroundImage: props => `url(${props.katagamiUrl})`,
    backgroundSize: 'cover',
    width: props => `${props.fixedWidth}px`,
    height: props => `${props.fixedHeight}px`
  },
  tile: {
    height: props => `${props.tileHeight}`
  }
}));

export default function (props) {
  const {
    katagamiUrl,
    katagamiWidth,
    katagamiHeight,
    dividing
  } = props;
  const fixedWidth = 640;
  const fixedHeight = katagamiHeight / katagamiWidth * fixedWidth;
  const tileSquare = Math.sqrt(dividing);
  const tileHeight = fixedHeight / tileSquare;
  const classes = useStyles({
    katagamiUrl,
    fixedWidth,
    fixedHeight,
    tileHeight
  });

  const Labels = () => {
    const labels = [];
    for (let i = 0; i < dividing; i++) {
      labels.push(<Grid xs={12/tileSquare}>{i}</Grid>);
    }
    return labels;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.katagami}>
        <Labels />
      </Grid>
    </div>
  );
}
