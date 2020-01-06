import React from 'react'
import { Grid, AppBar, Toolbar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AppLogo from 'components/lv1/AppLogo'
import UserMenu from 'components/lv2/UserMenu'
import { useLocation } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
  },
  skeletonWrapper: {
    backgroundColor: theme.palette.warning.main,
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    margin: 0,
  },
  skeleton: {
    backgroundColor: theme.palette.secondary.main,
    height: 66,
    width: '100vw',
    display: 'flex',
    alignItems: 'center',
    margin: 0,
  },
}))

export default function(props) {
  const { isLoggedIn, handleLogout } = props

  let location = useLocation()
  const isAnnotationPage = location.pathname.split('/')[1] === 'ant'
  const classes = useStyles()

  return (
    <AppBar postion="static" color={isAnnotationPage ? 'secondary' : 'primary'}>
      <Toolbar>
        <Grid container className={classes.root}>
          <Grid item xs={11}>
            {isAnnotationPage ? (
              <Typography variant="body2">
                アノテーション実行中です.
                ブラウザの「戻るボタン」等でページを離れると実行中のデータは保存されません.)
              </Typography>
            ) : (
              <AppLogo />
            )}
          </Grid>
          {isLoggedIn && (
            <Grid item xs={1}>
              <UserMenu handleLogout={handleLogout} />
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  )
}
