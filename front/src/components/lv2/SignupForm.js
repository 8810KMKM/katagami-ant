import React from 'react';
import { Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: 400
  }
}));

export default function (props) {
  const {
    email,
    password,
    passwordConfirmation,
    errors,
    handleChangeEmail,
    handleChangePassword,
    handleChangePassWordConfirmation,
    handleClearErrors,
    handleSignup
  } = props;

  const classes = useStyles();

  return (
    <form autoComplete='off'>
      <div className={classes.root}>
        <TextField
          id='standard-basic email'
          label='メールアドレス'
          margin='dense'
          value={email}
          error={errors.email !== undefined}
          helperText={errors.email}
          onFocus={handleClearErrors}
          onChange={e => handleChangeEmail(e.target.value)}
        />
        <TextField
          id='standard-basic password'
          label='パスワード (6文字以上)'
          type='password'
          margin='normal'
          value={password}
          error={errors.password !== undefined}
          helperText={errors.password}
          onFocus={handleClearErrors}
          onChange={e => handleChangePassword(e.target.value)}
        />
        <TextField
          id='standard-basic password-conf'
          label='パスワード (再入力)'
          type='password'
          margin='normal'
          value={passwordConfirmation}
          error={errors.password_confirmation !== undefined}
          helperText={errors.password_confirmation}
          onFocus={handleClearErrors}
          onChange={e => handleChangePassWordConfirmation(e.target.value)}
        />
        <Button
          variant='contained'
          color='primary'
          disabled={!(email && password && passwordConfirmation)}
          className={classes.button}
          onClick={handleSignup}
        >
          新規登録
        </Button>
      </div>
    </form>
  );
}
