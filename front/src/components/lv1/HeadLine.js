import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: { marginBottom: 40 },
  icon: { margin: '8px 8px 0 0' },
  inner: {
    display: 'flex',
    alignItems: 'center',
  },
}))

const HeadLine = props => {
  const { title, Icon } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Typography variant="h1" className={classes.inner}>
        <span className={classes.icon}>{Icon}</span>
        {title}
      </Typography>
      <hr />
    </div>
  )
}

HeadLine.propTypes = {
  title: PropTypes.string.isRequired,
  Icon: PropTypes.object,
}

export default HeadLine
