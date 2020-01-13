import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'
import { graphDataOf } from 'libs/format'
import UserList from 'components/lv2/UserList'
import ResultGraph from 'components/lv2/ResultGraph'
import { DIVISIONS } from 'datas/tile'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.main,
  },
  title: { margin: '0 0 16px 60px' },
}))

export default props => {
  const {
    hasLabels,
    division,
    wholeLabels,
    position,
    users,
    activeIndex,
    handleSelectUsers,
  } = props

  const _has_labels = hasLabels[DIVISIONS.indexOf(division)]

  const [hasLabel] = _has_labels
    ? _has_labels.filter(
        hasLabel => hasLabel.position === parseInt(position, 10)
      )
    : []
  console.log(hasLabel)
  const data = graphDataOf(hasLabel, wholeLabels)
  const classes = useStyles()

  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        {`分割[${position}]のラベル付け分布`}
      </Typography>
      <Grid container direction="column" className={classes.root}>
        <Grid item xs={4}>
          <UserList {...{ users, activeIndex }} />
        </Grid>
        <Grid item xs={8}>
          <ResultGraph {...{ data, activeIndex, handleSelectUsers }} />
        </Grid>
      </Grid>
    </div>
  )
}
