import React, { useEffect } from 'react';
import {
  Redirect,
  useLocation,
  useHistory
} from 'react-router-dom';
import Container from 'components/lv1/Container';
import LoginForm from 'components/lv2/LoginForm';

export default function ({ auth, setAuth }) {
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    if (auth) {
      setTimeout(history.replace(from), 100);
    }
  });

  return (
    auth ? (
      <Redirect to='/' />
    ) : (
      <Container>
        <h1>ログイン</h1>
        <hr />
        <LoginForm setAuth={setAuth} />
      </Container>
    )
  );
}