import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Fade, Paper, Typography, IconButton } from '@material-ui/core'
import { Close } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 24,
  },
  content: {
    padding: 16,
    height: 274,
  },
}))

export default props => {
  const { check, index, handleClose } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Fade in={check}>
        <Paper elevation={2} className={classes.content}>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
          <Typography>{index}のヒントです.</Typography>
        </Paper>
      </Fade>
    </div>
  )
}
