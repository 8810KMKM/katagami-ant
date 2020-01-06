import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: { marginBottom: 40 },
}))

export default props => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h1">{props.children}</Typography>
      <hr />
    </div>
  )
}
