import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Paper } from '@material-ui/core'
import { Group } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    // opacity: props => (props.isActive ? 1 : 0),
    transition: '0.3s',
    height: props => (props.isActive ? 200 : 0),
    width: 456,
    overflow: 'scroll',
    padding: props => (props.isActive ? '16px 0' : 0),
    margin: '8px 0 16px 60px',
    color: '#004a3f',
    backgroundColor: '#eceff1',
  },
  user: {
    cursor: 'pointer',
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  title: {
    marginLeft: 16,
    display: 'flex',
    alignItems: 'center',
    color: '#004a3f',
  },
  icon: { margin: '4px 2px 0 0' },
}))

export default props => {
  const { users, activeIndex } = props
  const isActive = activeIndex > -1
  const classes = useStyles({ isActive })

  const handleLinkToUser = id => {
    window.location.href = `/users/${id}`
  }

  return (
    <Paper className={classes.root}>
      <Typography className={classes.title}>
        <span className={classes.icon}>
          <Group />
        </span>
        ラベル付けしたユーザー
      </Typography>
      {isActive && (
        <ul>
          {users.map(user => {
            const [id, email] = user.split(' ')
            return (
              <li
                key={id}
                className={classes.user}
                onClick={() => handleLinkToUser(id, email)}
              >
                {email}
              </li>
            )
          })}
        </ul>
      )}
    </Paper>
  )
}
