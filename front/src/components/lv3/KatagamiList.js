import React, { useState, useEffect } from 'react';
import {
  GridList,
  GridListTile,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import KatagamiCard from 'components/lv2/KatagamiCard';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%'
  }
}));

export default function (props) {
  const {
    katagamis
  } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {katagamis.map(katagami => (
          <GridListTile>
            <KatagamiCard katagami={katagami} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}