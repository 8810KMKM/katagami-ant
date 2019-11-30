import React from 'react';
import Container from 'components/lv1/Container';
import SignupForm from 'components/lv2/SignupForm';


export default function ({ setIsLoggedIn }) {
  return (
    <Container>
      <h1>新規登録</h1>
      <hr />
      <SignupForm setAuth={setIsLoggedIn} />
    </Container>
  );
}
