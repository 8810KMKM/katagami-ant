import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/lv1/Container'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const { katagamiId } = props.match.params

  const classes = useStyles()
  return (
    <Container>
      <div className={classes.root}>Hello, {katagamiId}</div>
    </Container>
  )
}
