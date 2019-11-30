export const authenticate = user => {
  localStorage.setItem('currentUser', user.id);
  localStorage.setItem('email', user.email);
}

export const IsAuthenticated = () => (
  localStorage.getItem('currentUser')
);

export const isAuthenticated = () => (
  localStorage.getItem('currentUser')
);

export const logout = () => {
  localStorage.clear();
}
