import React from 'react'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import LoginForm from 'components/lv2/LoginForm'

export default ({ setIsLoggedIn }) => {
  return (
    <Container>
      <HeadLine>ログイン</HeadLine>
      <LoginForm setAuth={setIsLoggedIn} />
    </Container>
  )
}
