import React from 'react'
import Container from 'components/lv1/Container'
import UserDetail from 'components/lv3/UserDetail'

export default props => {
  return (
    <Container>
      <UserDetail {...props} />
    </Container>
  )
}
