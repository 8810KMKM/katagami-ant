import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { labelNameJp } from 'lib/format'
import { List } from '@material-ui/core'
import Label from 'components/lv3/Label'

const useStyles = makeStyles(theme => ({
  root: {},
}))

export default props => {
  const { labels, tileIsSelectable, setTileIsSelectable } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const classes = useStyles()

  console.log(selectedIndex)

  return (
    <div className={classes.root}>
      <List component="nav">
        {labels.map((label, i) => (
          <Label
            name={labelNameJp(label.name)}
            i={i}
            selectedIndex={selectedIndex}
            setSelectedIndex={setSelectedIndex}
            tileIsSelectable={tileIsSelectable}
            setTileIsSelectable={setTileIsSelectable}
          />
        ))}
      </List>
    </div>
  )
}
