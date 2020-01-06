import React from 'react'
import { Container } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: grey[50],
    color: grey[800],
    padding: '40px 40px 64px 40px',
  },
}))

export default props => {
  const classes = useStyles()
  return <Container className={classes.container}>{props.children}</Container>
}
