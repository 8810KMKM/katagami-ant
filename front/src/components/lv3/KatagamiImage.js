import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Tile from 'components/lv1/Tile'

const useStyles = makeStyles(theme => ({
  root: {
    width: props => `${props.fixedWidth}px`,
    pointerEvents: props => (props.tileIsSelectable ? '' : 'none'),
    cursor: 'pointer',
  },
  katagami: {
    backgroundImage: props => `url(${props.katagamiUrl})`,
    backgroundSize: 'cover',
    border: props => (props.tileIsSelectable ? '2px solid #673ab7' : 'none'),
    width: props => `${props.fixedWidth}px`,
    height: props => `${props.fixedHeight}px`,
  },
}))

const xDiv = division => {
  switch (division) {
    case 12:
      return 3
    case 24:
      return 4
    default:
      return 3
  }
}

const yDiv = division => {
  switch (division) {
    case 12:
      return 4
    case 24:
      return 6
    default:
      return 4
  }
}

export default props => {
  const {
    katagamiUrl,
    katagamiWidth,
    katagamiHeight,
    selectedTiles,
    handleToggleTile,
    tileIsSelectable,
    fixedWidth,
    division,
  } = props
  const fixedHeight = (katagamiHeight / katagamiWidth) * fixedWidth
  const dx = xDiv(division)
  const tileHeight = fixedHeight / yDiv(division)
  const savedTilesAreNotZero = selectedTiles.reduce((a, b) => a && b, true)
  const classes = useStyles({
    katagamiUrl,
    fixedWidth,
    fixedHeight,
    tileHeight,
    tileIsSelectable,
    savedTilesAreNotZero,
  })

  const TilesOnKatagami = () => {
    const labels = []
    for (let i = 1; i <= division; i++) {
      labels.push(
        <Tile
          key={i}
          number={i}
          square={dx}
          isSelected={selectedTiles[i - 1]}
          handleToggleTile={handleToggleTile}
        />
      )
    }
    return labels
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={0} className={classes.katagami}>
        <TilesOnKatagami />
      </Grid>
    </div>
  )
}
