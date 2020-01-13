import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Fade, Paper, Typography, IconButton, Grid } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  root: {
    marginTop: 24,
  },
  content: {
    backgroundColor: '#eceff1',
    padding: 16,
    height: 274,
  },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: { padding: 4 },
}))

export default props => {
  const { check, index, handleClose } = props
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Fade in={check}>
        <Paper elevation={2} className={classes.content}>
          <div className={classes.buttonWrapper}>
            <IconButton onClick={handleClose} className={classes.button}>
              <Close />
            </IconButton>
          </div>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>{index}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>{index}のヒントで.</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </div>
  )
}
