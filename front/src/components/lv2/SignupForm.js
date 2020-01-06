import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { signup } from 'libs/api'
import { authenticate } from 'libs/auth'

const useStyles = makeStyles(theme => ({
  root: {
    width: 400,
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    margin: '24px 0 40px',
  },
}))

export default props => {
  const { setAuth } = props
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [errors, setErrors] = useState({})
  const classes = useStyles()

  const handleAuth = ({ user, errors }) => {
    if (user.id) {
      authenticate(user)
      setAuth(user.id)
    } else {
      setErrors(errors)
    }
  }

  const handleClearErrors = () => {
    setErrors({})
  }

  return (
    <form autoComplete="off">
      <div className={classes.root}>
        <TextField
          id="standard-basic email"
          label="メールアドレス"
          margin="normal"
          value={email}
          error={errors.email !== undefined}
          helperText={errors.email}
          onFocus={handleClearErrors}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          id="standard-basic password"
          label="パスワード"
          type="password"
          margin="normal"
          placeholder="6文字以上の半角文字(数字, アルファベット)"
          value={password}
          error={errors.password !== undefined}
          helperText={errors.password}
          onFocus={handleClearErrors}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          id="standard-basic password-conf"
          label="パスワード (再入力)"
          type="password"
          margin="normal"
          value={passwordConfirmation}
          error={errors.password_confirmation !== undefined}
          helperText={errors.password_confirmation}
          onFocus={handleClearErrors}
          onChange={e => setPasswordConfirmation(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!(email && password && passwordConfirmation)}
          className={classes.button}
          onClick={() =>
            signup({
              email,
              password,
              passwordConfirmation,
              handleAuth,
            })
          }
        >
          新規登録
        </Button>
        <Link to="/login">ログインはこちら</Link>
      </div>
    </form>
  )
}
