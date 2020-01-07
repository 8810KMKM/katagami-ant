import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'
import ResultGraph from 'components/lv2/ResultGraph'
import { graphDataOf } from 'libs/format'
import UserList from 'components/lv2/UserList'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.main,
  },
}))

export default props => {
  const {
    hasLabels,
    wholeLabels,
    position,
    users,
    activeIndex,
    handleSelectUsers,
  } = props

  const [hasLabel] = hasLabels.filter(
    hasLabel => hasLabel.position === parseInt(position, 10)
  )
  const data = graphDataOf(hasLabel, wholeLabels)
  const classes = useStyles()

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid item xs={4}>
        <UserList {...{ users }} />
      </Grid>
      <Grid item xs={8}>
        <ResultGraph {...{ data, activeIndex, handleSelectUsers }} />
      </Grid>
    </Grid>
  )
}
