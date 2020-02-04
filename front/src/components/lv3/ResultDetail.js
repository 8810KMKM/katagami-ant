import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Grid, Typography } from '@material-ui/core'
import { graphDataOf } from 'libs/format'
import UserList from 'components/lv2/UserList'
import ResultGraph from 'components/lv2/ResultGraph'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.main,
  },
  title: { margin: '0 0 40px 60px' },
}))

const ResultDetail = props => {
  const {
    hasLabels,
    division,
    wholeLabels,
    position,
    users,
    activeIndex,
    handleSelectUsers,
    stay,
  } = props

  const _hasLabels = hasLabels[division.toString()]

  const [hasLabel] = _hasLabels
    ? _hasLabels.filter(
        hasLabel => hasLabel.position === parseInt(position, 10)
      )
    : []
  const data = graphDataOf(hasLabel, wholeLabels)
  const classes = useStyles()

  return (
    <div>
      <Typography variant="h2" className={classes.title}>
        {`分割[${position}]のラベル付け分布`}
      </Typography>
      <Grid container direction="column" className={classes.root}>
        <Grid item xs={10}>
          <ResultGraph
            {...{
              data,
              handleSelectUsers,
              activeIndex,
              stay,
            }}
          />
        </Grid>
        <Grid item xs={2}>
          <UserList {...{ users, activeIndex }} />
        </Grid>
      </Grid>
    </div>
  )
}

ResultDetail.propTypes = {
  hasLabels: PropTypes.PropTypes.object.isRequired,
  wholeLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
  users: PropTypes.arrayOf(PropTypes.string).isRequired,
  division: PropTypes.number.isRequired,
  position: PropTypes.string.isRequired,
  activeIndex: PropTypes.number.isRequired,
  handleSelectUsers: PropTypes.func.isRequired,
  stay: PropTypes.bool.isRequired,
}

export default ResultDetail
