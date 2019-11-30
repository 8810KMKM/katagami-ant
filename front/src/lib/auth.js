export const authenticate = (auth, email) => {
  if (auth) {
    localStorage.setItem('currentUser', auth);
    localStorage.setItem('email', email);
  }
}

export const currentUser = () => (
  localStorage.getItem('currentUser')
);

export const logout = () => {
  if (currentUser) {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('email');
  }
}
