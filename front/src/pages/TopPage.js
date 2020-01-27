import React from 'react'
import Container from 'components/lv1/Container'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'

export default props => {
  const { authorization, handleSignIn, auth } = props
  console.log(props)

  if (authorization) {
    handleSignIn(authorization)
  }

  return (
    <Container>
      <HeadLine>型紙一覧</HeadLine>
      <KatagamiList auth={authorization ? authorization : auth} />
    </Container>
  )
}
