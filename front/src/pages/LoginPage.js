import React from 'react';
import Container from 'components/lv1/Container';
import LoginForm from 'components/lv2/LoginForm';

export default function ({ setIsLoggedIn }) {
  return (
    <Container>
      <h1>ログイン</h1>
      <hr />
      <LoginForm setAuth={setIsLoggedIn} />
    </Container>
  );
}