import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'

export default props => {
  const { authorization, canRecommend, handleSignIn, auth } = props
  const history = useHistory()

  if (auth) {
    history.replace({ pathname: '/' })
  } else {
    history.push('/')
    handleSignIn(authorization, canRecommend)
  }

  return <Redirect to={{ pathname: '/' }} />
}
