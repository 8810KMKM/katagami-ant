import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardActions, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: 360,
  },
}))

export default function(props) {
  const { katagami, userId } = props
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardContent>
        <p>Image {`${katagami.id}`}</p>
      </CardContent>
      <CardActions>
        <Link to={`/ant/${katagami.id}/${userId}`}>
          <Button>実行</Button>
        </Link>
        <Button>結果一覧</Button>
      </CardActions>
    </Card>
  )
}
