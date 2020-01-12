import React from 'react'
import { zeroPaddingOf } from 'libs/format'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import KatagamiList from 'components/lv3/KatagamiList'

export default props => {
  const { userId, email } = props.match.params
  const zeroPaddingId = zeroPaddingOf(userId, 3)

  return (
    <Container>
      <HeadLine>
        {zeroPaddingId} : {email}
      </HeadLine>
      <KatagamiList ownedUser={userId} />
    </Container>
  )
}
