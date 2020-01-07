import React from 'react'
import { Avatar, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { randomColor } from 'libs/color'

const useStyle = makeStyles({
  icon: {
    width: props => props.size,
    height: props => props.size,
    fontSize: props => props.size / 2,
    paddingTop: 2,
    margin: '0 auto',
    backgroundColor: props => props.color[500],
    color: props => props.color[50],
  },
})

export default props => {
  const { email, size } = props
  const classes = useStyle({
    color: randomColor(email),
    size: size,
  })

  return (
    <Avatar className={classes.icon}>
      <Typography variant="body2">{email[0].toUpperCase()}</Typography>
    </Avatar>
  )
}
