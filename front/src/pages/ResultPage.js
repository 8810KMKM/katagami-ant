import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import { zeroPaddingOf } from 'libs/format'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const { katagamiId } = props.match.params
  const zeroPaddingId = zeroPaddingOf(katagamiId, 6)

  const classes = useStyles()
  return (
    <Container>
      <HeadLine>型紙 id : {zeroPaddingId}</HeadLine>
    </Container>
  )
}
