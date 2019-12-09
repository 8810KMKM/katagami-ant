import React from 'react'
import { Grid, AppBar, Toolbar } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import AppLogo from 'components/lv1/AppLogo'
import UserMenu from 'components/lv2/UserMenu'

const useStyles = makeStyles(theme => ({
  root: {
    alignItems: 'center',
  },
}))

export default function(props) {
  const { isLoggedIn, handleLogout } = props

  const classes = useStyles()

  return (
    <AppBar postion="static">
      <Toolbar>
        <Grid container className={classes.root}>
          <Grid item xs={11}>
            <AppLogo />
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
