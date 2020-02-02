import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { labelNameJp } from 'libs/format'
import { List } from '@material-ui/core'
import { blueGrey } from '@material-ui/core/colors'
import LabelHint from 'components/lv1/LabelHint'
import Label from 'components/lv2/Label'

const useStyles = makeStyles(theme => ({
  list: { backgroundColor: blueGrey[50] },
}))

export default props => {
  const { labels } = props
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [hintIsOpen, setHintIsOpen] = useState(false)
  const classes = useStyles()

  const handleToggleHint = () => {
    setHintIsOpen(!hintIsOpen)
  }

  const handleCloseHint = () => {
    setHintIsOpen(false)
  }

  return (
    <div>
      <div className={classes.list}>
        <List component="nav">
          {labels.map((label, i) => {
            const name = labelNameJp(label.name)
            return (
              <Label
                key={i}
                {...{
                  i,
                  name,
                  selectedIndex,
                  setSelectedIndex,
                  handleToggleHint,
                  ...props,
                }}
              />
            )
          })}
        </List>
      </div>
      <LabelHint
        check={hintIsOpen}
        index={
          labels.length > 0 && selectedIndex < labels.length
            ? labels[selectedIndex].id - 1
            : 0
        }
        handleClose={handleCloseHint}
      />
    </div>
  )
}
