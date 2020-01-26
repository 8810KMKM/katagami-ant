import React from 'react'
import Container from 'components/lv1/Container'
import KatagamiList from 'components/lv3/KatagamiList'
import UserDetail from 'components/lv2/UserDetail'

export default props => {
  const { userId, auth } = props

  return (
    <Container>
      <UserDetail {...props} />
      {/* <KatagamiList ownedUser={userId} auth={auth} /> */}
    </Container>
  )
}
