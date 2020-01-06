import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import { Button, TextField } from '@material-ui/core'
import { login } from 'libs/api'
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
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

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
          margin="dense"
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
          value={password}
          error={errors.password !== undefined}
          helperText={errors.password}
          onFocus={handleClearErrors}
          onChange={e => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={!(email && password)}
          className={classes.button}
          onClick={() =>
            login({
              email,
              password,
              handleAuth,
            })
          }
        >
          ログイン
        </Button>
        <Link to="/signup">新規登録はこちら</Link>
      </div>
    </form>
  )
}
