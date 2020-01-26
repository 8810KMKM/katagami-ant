import React, { useEffect } from 'react'
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
  useLocation,
  useHistory,
} from 'react-router-dom'
import Container from 'components/lv1/Container'
import KatagamiList from 'components/lv3/KatagamiList'
import HeadLine from 'components/lv1/HeadLine'

export default props => {
  const { handleSignIn } = props

  if (props.match) {
    const { authorization } = props.match.params
    handleSignIn(authorization)
  }

  return (
    <Container>
      <HeadLine>型紙一覧</HeadLine>
      <KatagamiList />
    </Container>
  )
}
