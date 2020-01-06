import React from 'react'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import SignupForm from 'components/lv2/SignupForm'

export default ({ setIsLoggedIn }) => {
  return (
    <Container>
      <HeadLine>新規登録</HeadLine>
      <SignupForm setAuth={setIsLoggedIn} />
    </Container>
  )
}
