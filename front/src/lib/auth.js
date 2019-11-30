export const authenticate = user => {
  localStorage.setItem('currentUser', user.id);
  localStorage.setItem('email', user.email);
}

export const IsAuthenticated = () => (
  localStorage.getItem('currentUser')
);

export const currentUser = () => (
  localStorage.getItem('currentUser')
);

export const logout = () => {
  if (currentUser) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('email');
  }
}
