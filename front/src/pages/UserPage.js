import React from 'react'
import Container from 'components/lv1/Container'
import KatagamiList from 'components/lv3/KatagamiList'

export default props => {
  const { userId, auth } = props

  return (
    <Container>
      <KatagamiList ownedUser={userId} auth={auth} />
    </Container>
  )
}
