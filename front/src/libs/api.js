const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_DEV_API_URL

// Auth失効時のリダイレクト
export const redirectToWelcome = () =>
  (window.location.href = `${baseUrl}/welcome`)

// User
export const fetchUser = async props => {
  const { auth, userId, handleGetUser } = props
  await fetchGet({
    auth: auth,
    url: `${baseUrl}/users/${userId}`,
    successAction: handleGetUser,
  })
}

// Katagami
export const fetchKatagamis = async props => {
  const { auth, page, per, ownedUserId, sorting, handleGetKatagamis } = props

  await fetchGet({
    auth: auth,
    url: `${baseUrl}/katagamis/${ownedUserId}/${page}/${per}/${sorting}`,
    successAction: handleGetKatagamis,
  })
}

export const fetchKatagamiResult = async props => {
  const { auth, katagamiId, handleGetKatagamiResult } = props
  await fetchGet({
    auth: auth,
    url: `${baseUrl}/katagamis/${katagamiId}`,
    successAction: handleGetKatagamiResult,
  })
}

// Annotation
export const createAnnotation = async props => {
  const { auth, katagamiId, handleCreateAnnotation } = props

  await fetchPost({
    auth: auth,
    url: `${baseUrl}/annotations/${katagamiId}`,
    body: new FormData(),
    successAction: handleCreateAnnotation,
  })
}

export const postHasLabels = async props => {
  const { auth, annotationId, hasLabels, handleCompleteAnnotation } = props

  console.log(props)
  const body = new FormData()
  body.append('annotation_id', annotationId)
  body.append('has_labels', hasLabels)

  await fetchPost({
    auth: auth,
    url: `${baseUrl}/annotations/add_has_labels`,
    body: body,
    successAction: handleCompleteAnnotation,
  })
}

// Label
export const fetchLabels = async props => {
  const { auth, katagamiId, num, handleGetLabels } = props
  await fetchGet({
    auth: auth,
    url: `${baseUrl}/labels/target/${katagamiId}/${num}`,
    successAction: handleGetLabels,
  })
}

const fetchGet = async props => {
  const { auth, url, successAction, failureAction } = props

  console.log(auth)

  return await fetch(url, {
    mode: 'cors',
    headers: {
      Authorization: auth,
    },
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
  const { auth, url, body, successAction, failureAction } = props

  return await fetch(url, {
    method: 'POST',
    body: body,
    mode: 'cors',
    headers: {
      Authorization: auth,
    },
  })
    .then(response => response.json())
    .then(responseJson => {
      // console.log(responseJson);
      if (successAction) {
        successAction(responseJson)
      }
      // console.log('fetch is finished');
    })
    .catch(error => {
      console.error(error)
      if (failureAction) {
        failureAction()
      }
    })
}
