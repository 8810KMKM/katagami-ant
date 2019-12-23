import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import Tile from 'components/lv1/Tile'

const xor = (a, b) => (a & !b) | (!a & b)

const useStyles = makeStyles(theme => ({
  root: {
    width: props => `${props.fixedWidth}px`,
    pointerEvents: props => (props.tileIsSelectable ? '' : 'none'),
  },
  katagami: {
    backgroundImage: props => `url(${props.katagamiUrl})`,
    filter: props => (props.tileIsSelectable ? '' : 'grayscale(100%)'),
    backgroundSize: 'cover',
    width: props => `${props.fixedWidth}px`,
    height: props => `${props.fixedHeight}px`,
  },
}))

export default function(props) {
  const {
    katagamiUrl,
    katagamiWidth,
    katagamiHeight,
    tileNumber,
    selectedTiles,
    handleToggleTile,
    tileIsSelectable,
  } = props
  const fixedWidth = 640
  const fixedHeight = (katagamiHeight / katagamiWidth) * fixedWidth
  const tileSquare = Math.sqrt(tileNumber)
  const tileHeight = fixedHeight / tileSquare
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
    for (let i = 0; i < tileNumber; i++) {
      labels.push(
        <Tile
          key={i}
          number={i}
          square={tileSquare}
          isSelected={selectedTiles[i]}
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
