import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { labelNameJp } from 'lib/format';

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid'
  }
}));

export default function (props) {
  const {
    labels
  } = props;
  const classes = useStyles();

  return (
    <ul>
      {labels.map(label =>
        <li>{labelNameJp(label.name)}</li>
      )}
    </ul>
  );
}