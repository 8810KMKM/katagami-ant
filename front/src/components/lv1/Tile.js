import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
  tile: {
    color: grey[50],
    border: '1px solid',
    padding: '2px 4px',
    fontSize: 40,
  },
  selected: {
    backgroundColor: 'rgba(133, 97, 197, 0.7)',
  },
}))

export default props => {
  const { number, square, isSelected, handleToggleTile } = props
  const classes = useStyles()

  return (
    <Grid
      item
      xs={12 / square}
      className={
        isSelected ? classes.tile + ' ' + classes.selected : classes.tile
      }
      onClick={() => handleToggleTile(number)}
    />
  )
}
