import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/lv1/Container'
import LoadingModal from 'components/lv2/LoadingModal'
import HeadLine from 'components/lv1/HeadLine'
import { fetchUser } from 'libs/api'
import { Typography } from '@material-ui/core'
import KatagamiList from 'components/lv3/KatagamiList'
import { zeroPaddingOf } from 'libs/format'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const { userId } = props.match.params
  const zeroPaddingId = zeroPaddingOf(userId, 6)
  // const [isLoading, setIsLoading] = useState(false)

  const classes = useStyles()

  return (
    <Container>
      <HeadLine>ユーザー id : {zeroPaddingId}</HeadLine>
      <KatagamiList ownedUser={userId} />
    </Container>
  )
}
