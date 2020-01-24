import React from 'react'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import LoginForm from 'components/lv2/LoginForm'
import { Button } from '@material-ui/core'

export default ({ setIsLoggedIn }) => {
  return (
    <Container>
      <HeadLine>サインイン</HeadLine>
      <Button variant="contained" color="primary">
        Sign in with Google
      </Button>
    </Container>
  )
}
