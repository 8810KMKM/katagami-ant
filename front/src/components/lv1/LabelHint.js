import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Fade, Paper, Typography, IconButton, Grid } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { labelInfo } from 'datas/labels'

const useStyles = makeStyles(theme => ({
  root: { marginTop: 24 },
  contentWrapper: {
    backgroundColor: '#eceff1',
    padding: 16,
    height: 240,
  },
  content: { padding: '4px 16px 4px 0' },
  image: {
    width: '100%',
    maxHeight: 163,
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
  const hintData = labelInfo[index ? index - 1 : 0]
  return (
    <div className={classes.root}>
      <Fade in={check}>
        <Paper elevation={2} className={classes.contentWrapper}>
          <div className={classes.buttonWrapper}>
            <IconButton onClick={handleClose} className={classes.button}>
              <Close />
            </IconButton>
          </div>
          <Grid container spacing={2} className={classes.content}>
            <Grid item xs={6}>
              <img
                className={classes.image}
                src={hintData.sampleImage}
                alt={hintData.sampleImage}
              />
            </Grid>
            <Grid item xs={6}>
              <Typography variant="caption">{hintData.description}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Fade>
    </div>
  )
}
