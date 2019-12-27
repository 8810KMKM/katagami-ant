const baseUrl = 'http://localhost:3001'

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

export const fetchUser = async (id, handleGetUser) => {
  await fetchGet({
    url: `${baseUrl}/users/${id}`,
    successAction: handleGetUser,
  })
}

export const fetchKatagamis = async props => {
  const { userId, page, handleGetKatagamis } = props
  const body = new FormData()
  body.append('user_id', userId)
  body.append('page', page)

  await fetchPost({
    url: `${baseUrl}/katagamis`,
    body: body,
    successAction: handleGetKatagamis,
  })
}

export const createAnnotation = async props => {
  const { katagamiId, userId, handleCreateAnnotation } = props

  await fetchPost({
    url: `${baseUrl}/annotations/${katagamiId}/${userId}`,
    body: new FormData(),
    successAction: handleCreateAnnotation,
  })
}

export const fetchLabels = async handleGetLabels => {
  await fetchGet({
    url: `${baseUrl}/labels`,
    successAction: handleGetLabels,
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

const fetchGet = async props => {
  const { url, successAction, failureAction } = props

  return await fetch(url)
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
