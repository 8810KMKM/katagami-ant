import React from 'react'
import { GridList, GridListTile } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import KatagamiCard from 'components/lv2/KatagamiCard'
import { currentUser } from 'libs/auth'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
  },
}))

export default function(props) {
  const { katagamis } = props
  const user = currentUser()
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={3}>
        {katagamis.map(katagami => (
          <GridListTile key={katagami.id}>
            <KatagamiCard katagami={katagami} userId={user.id} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  )
}
