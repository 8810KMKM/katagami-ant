import React, { useState, useEffect } from 'react';
import {
  GridListTile,
  Card,
  CardContent,
  CardActions,
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 360
  }
}));

export default function (props) {
  const {
    katagami
  } = props;
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <p>Image {`${katagami.id}`}</p>
      </CardContent>
      <CardActions>
        <Button>実行</Button>
        <Button>結果一覧</Button>
      </CardActions>
    </Card>
  );
}