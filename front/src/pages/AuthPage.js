import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'

export default props => {
  const { authorization, handleSignIn, auth, canRecommend } = props
  const history = useHistory()

  console.log(canRecommend)

  if (auth) {
    history.replace({ pathname: '/' })
  } else {
    history.push('/')
    handleSignIn(authorization)
  }

  return <Redirect to={{ pathname: '/' }} />
}
