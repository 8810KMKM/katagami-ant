import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Typography, Paper } from '@material-ui/core'
import { Info } from '@material-ui/icons'
import { Skeleton } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  root: {
    height: 160,
    width: 440,
    overflow: 'scroll',
    padding: 8,
    margin: '0 0 16px 60px',
    border: props =>
      props.activeIndex > -1
        ? `2px solid ${theme.palette.primary.light}`
        : 'none',
  },
}))

export default props => {
  const { users, activeIndex } = props
  const classes = useStyles({ activeIndex })

  return (
    <Paper className={classes.root}>
      <Typography>ラベル付けしたユーザー</Typography>
      <ul>
        {users.map(user => (
          <li key={user}>{user}</li>
        ))}
      </ul>
    </Paper>
  )
}
