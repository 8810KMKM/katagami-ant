import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { labelNameJp } from 'lib/format';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { Inbox, RadioButtonUnchecked, RadioButtonChecked } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
  root: {
  }
}));

export default function (props) {
  const {
    labels
  } = props;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <List component='nav'>
        {labels.map((label, i) =>
          <ListItem
            button
            selected={selectedIndex == i}
            onClick={() => setSelectedIndex(i)}
          >
            <ListItemIcon>
              {selectedIndex === i
                ? <RadioButtonChecked />
                : <RadioButtonUnchecked />
              }
            </ListItemIcon>
            <ListItemText>{labelNameJp(label.name)}</ListItemText>
          </ListItem>
        )}
      </List>
    </div>
  );
}