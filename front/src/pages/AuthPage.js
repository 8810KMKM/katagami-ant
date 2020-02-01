import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'

export default props => {
  const { authorization, handleSignIn, auth } = props
  const history = useHistory()

  if (auth) {
    history.replace({ pathname: '/' })
  } else {
    history.push('/')
    handleSignIn(authorization)
  }

  return <Redirect to={{ pathname: '/' }} />
}
