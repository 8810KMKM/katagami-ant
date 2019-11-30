export const authenticate = user => {
  localStorage.setItem('currentUser', user.id);
  localStorage.setItem('email', user.email);
}

export const isAuthenticated = () => (
  localStorage.getItem('currentUser')
);

export const currentUser = () => {
  return ({
    id: localStorage.getItem('currentUser'),
    email: localStorage.getItem('email')
  });
}

export const logout = () => {
  localStorage.clear();
}
