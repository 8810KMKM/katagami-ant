import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';
import { pink } from '@material-ui/core/colors';
import Tile from 'components/lv2/Tile';

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
    color: pink[500],
    backgroundColor:  `rgba(255, 96, 144, 0.5)`,
    border: '1px dots',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }
}));

export default function (props) {
  const {
    katagamiUrl,
    katagamiWidth,
    katagamiHeight,
    dividing,
    handleToggleTile
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

  const Tiles = () => {
    const labels = [];
    for (let i = 1; i <= dividing; i++) {
      labels.push(
        <Tile
          key={i}
          number={i}
          square={tileSquare}
          handleToggleTile={handleToggleTile}
        />
      );
    }
    return labels;
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.katagami}>
        <Tiles />
      </Grid>
    </div>
  );
}
