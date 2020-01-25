const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL

// User
export const signIn = async props => {
  const { handleAuth } = props

  await fetchGet({
    url: `${baseUrl}/users/sign_in`,
    successAction: handleAuth,
  })
}

export const signup = async props => {
  const { email, password, passwordConfirmation, handleAuth } = props

  const body = new FormData()
  body.append('email', email)
  body.append('password', password)
  body.append('password_confirmation', passwordConfirmation)

  await fetchPost({
    url: `${baseUrl}/signup`,
    body: body,
    successAction: handleAuth,
  })
}

export const login = async props => {
  const { email, password, handleAuth } = props

  const body = new FormData()
  body.append('email', email)
  body.append('password', password)

  await fetchPost({
    url: `${baseUrl}/login`,
    body: body,
    successAction: handleAuth,
  })
}

export const fetchUser = async props => {
  const { userId, handleGetUser } = props
  await fetchGet({
    url: `${baseUrl}/users/${userId}`,
    successAction: handleGetUser,
  })
}

// Katagami
export const fetchKatagamis = async props => {
  const { page, per, ownedUserId, sorting, handleGetKatagamis } = props

  await fetchGet({
    url: `${baseUrl}/katagamis/${ownedUserId}/${page}/${per}/${sorting}`,
    successAction: handleGetKatagamis,
  })
}

export const fetchKatagamiResult = async props => {
  const { katagamiId, handleGetKatagamiResult } = props
  await fetchGet({
    url: `${baseUrl}/katagamis/${katagamiId}`,
    successAction: handleGetKatagamiResult,
  })
}

// Annotation
export const createAnnotation = async props => {
  const { katagamiId, handleCreateAnnotation } = props

  await fetchPost({
    url: `${baseUrl}/annotations/${katagamiId}`,
    body: new FormData(),
    successAction: handleCreateAnnotation,
  })
}

export const postHasLabels = async props => {
  const { annotationId, hasLabels, handleCompleteAnnotation } = props

  const body = new FormData()
  body.append('annotation_id', annotationId)
  body.append('has_labels', hasLabels)

  await fetchPost({
    url: `${baseUrl}/annotations/add_has_labels`,
    body: body,
    successAction: handleCompleteAnnotation,
  })
}

// Label
export const fetchLabels = async props => {
  const { katagamiId, num, handleGetLabels } = props
  await fetchGet({
    url: `${baseUrl}/labels/target/${katagamiId}/${num}`,
    successAction: handleGetLabels,
  })
}

const fetchGet = async props => {
  const { url, successAction, failureAction } = props

  return await fetch(url, {
    mode: 'cors',
  })
    .then(response => response.json())
    .then(responseJson => {
      // console.log(responseJson);
      if (successAction) {
        successAction(responseJson)
      }
    })
    .catch(error => {
      console.error(error)
      if (failureAction) {
        failureAction()
      }
    })
}

const fetchPost = async props => {
  const { url, body, successAction, failureAction } = props

  const method = 'POST'

  return await fetch(url, {
    method,
    body,
  })
    .then(response => response.json())
    .then(responseJson => {
      // console.log(responseJson);
      if (successAction) {
        successAction(responseJson)
      }
      // // console.log('fetch is finished');
    })
    .catch(error => {
      console.error(error)
      if (failureAction) {
        failureAction()
      }
    })
}
