import React from 'react'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import LoginForm from 'components/lv2/LoginForm'
import { Button } from '@material-ui/core'
import { authenticate } from 'libs/auth'
import { signIn } from 'libs/api'

export default ({ setIsLoggedIn }) => {
  const handleAuth = ({ user }) => {
    if (user.id) {
      authenticate(user)
      setIsLoggedIn(user.id)
    }
  }

  const handleSignIn = () => {
    signIn({ handleAuth })
  }

  return (
    <Container>
      <HeadLine>サインイン</HeadLine>
      <Button variant="contained" color="primary" onClick={handleSignIn}>
        Sign in with Google
      </Button>
    </Container>
  )
}
