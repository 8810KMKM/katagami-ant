import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { labelNameJp } from 'libs/format'
import { List } from '@material-ui/core'
import Label from 'components/lv2/Label'
import { blueGrey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: blueGrey[50],
  },
}))

export default props => {
  const { labels } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <List component="nav">
        {labels.map((label, i) => {
          const name = labelNameJp(label.name)
          return (
            <Label
              key={i}
              {...{ i, name, selectedIndex, setSelectedIndex, ...props }}
            />
          )
        })}
      </List>
    </div>
  )
}
