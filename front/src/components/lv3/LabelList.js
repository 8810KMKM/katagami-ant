import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { labelNameJp } from 'libs/format'
import { List } from '@material-ui/core'
import Label from 'components/lv3/Label'

const useStyles = makeStyles(theme => ({
  root: {
    height: 400,
    overflow: 'scroll',
  },
}))

export default props => {
  const { labels } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const classes = useStyles()

  console.log(selectedIndex)

  return (
    <div className={classes.root}>
      <List component="nav">
        {labels.map((label, i) => {
          const name = labelNameJp(label.name)
          return (
            <Label
              {...{ i, name, selectedIndex, setSelectedIndex, ...props }}
            />
          )
        })}
      </List>
    </div>
  )
}
