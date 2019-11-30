import React from 'react';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { randomColor } from 'lib/color';

const useStyle = makeStyles({
  icon: {
    width: props => props.size,
    height: props => props.size,
    fontSize: props => props.size / 2,
    paddingTop: 2,
    margin: '0 auto',
    backgroundColor: props => props.color[500],
    color: props => props.color[50]
  },
});

export default function ({ email, id, size }) {
  const classes = useStyle({
    color: randomColor(email),
    size: size
  });

  return (
    <Avatar className={classes.icon}>
      {email[0].toUpperCase()}
    </Avatar>
  );
}
