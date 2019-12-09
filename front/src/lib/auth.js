// ログインしたユーザーの情報を時間と一緒に保存
export const authenticate = user => {
  localStorage.setItem('currentUser', user.id)
  localStorage.setItem('email', user.email)
  localStorage.setItem('saved', new Date().getTime())
}

// ログイン済み かつ情報が有効期限内であれば真(user.id)
export const isAuthenticated = () => {
  const id = localStorage.getItem('currentUser')
  if (!id || isExpired()) {
    logout()
    return null
  }
  return id
}

// 有効期限内であればユーザー情報を返す
export const currentUser = () => {
  return {
    id: localStorage.getItem('currentUser'),
    email: localStorage.getItem('email'),
  }
}

// ログイン情報を強制的にクリア
export const logout = () => {
  localStorage.clear()
}

// ログイン情報の有効期限を設定(6時間)
const isExpired = () => {
  const expirationHours = 6
  const saved = localStorage.getItem('saved')
  // console.log(new Date().getTime() - saved);
  return (
    saved && new Date().getTime() - saved > expirationHours * 60 * 60 * 1000
  )
}
