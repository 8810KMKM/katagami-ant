import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { grey } from '@material-ui/core/colors'
import { Typography } from '@material-ui/core'

const useStyle = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
  },
  logo: {
    fontFamily: 'Audiowide',
    fontSize: props => props.size,
    padding: props => props.size / 4,
    margin: 0,
    color: grey[50],
  },
}))

export default () => {
  const classes = useStyle({ size: 32 })

  return (
    <Link to="/" className={classes.link}>
      <Typography variant="h1" className={classes.logo}>
        Katagami Ant
      </Typography>
    </Link>
  )
}
