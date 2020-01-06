import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import { grey } from '@material-ui/core/colors'

const useStyle = makeStyles(theme => ({
  link: {
    textDecoration: 'none',
  },
  logo: {
    fontSize: props => props.size,
    padding: props => props.size / 4,
    margin: 0,
    color: grey[50],
  },
}))

export default () => {
  const classes = useStyle({ size: 24 })

  return (
    <Link to="/" className={classes.link}>
      <h1 className={classes.logo}>KATAGAMI Annotation Tool</h1>
    </Link>
  )
}
