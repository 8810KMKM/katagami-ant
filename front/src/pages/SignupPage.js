import React, { useState, useEffect } from 'react';
import {
  Redirect,
  useLocation,
  useHistory
} from 'react-router-dom';
import Container from 'components/lv1/Container';
import SignupForm from 'components/lv2/SignupForm';


export default function ({ auth, setAuth }) {
  let location = useLocation();
  let history = useHistory();
  let { from } = location.state || { from: { pathname: '/' } };

  useEffect(() => {
    console.log(location);
    console.log(history);
    if (auth) {
      setTimeout(history.replace(from), 100);
    }
  });

  return (
    auth ? (
      <Redirect to='/' />
    ) : (
        <Container>
          <h1>新規登録</h1>
          <hr />
          <SignupForm setAuth={setAuth} />
        </Container>
      )
  );
}
