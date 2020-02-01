import React from 'react'
import { useHistory, Redirect } from 'react-router-dom'

export default props => {
  const { authorization, handleSignIn, auth } = props

  if (auth) {
    const history = useHistory()
    history.replace({ pathname: '/' })
  } else {
    handleSignIn(authorization)
  }

  return <Redirect to={{ pathname: '/' }} />
}
