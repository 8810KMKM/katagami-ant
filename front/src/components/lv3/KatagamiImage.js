import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { pink } from '@material-ui/core/colors'
import Tile from 'components/lv1/Tile'

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
    dividing,
    isSelecteds,
    handleToggleTile,
    tileIsSelectable,
  } = props
  const fixedWidth = 640
  const fixedHeight = (katagamiHeight / katagamiWidth) * fixedWidth
  const tileSquare = Math.sqrt(dividing)
  const tileHeight = fixedHeight / tileSquare
  const classes = useStyles({
    katagamiUrl,
    fixedWidth,
    fixedHeight,
    tileHeight,
  })

  const TilesOnKatagami = () => {
    const labels = []
    for (let i = 0; i < dividing; i++) {
      labels.push(
        <Tile
          key={i}
          number={i}
          square={tileSquare}
          isSelected={isSelecteds[i]}
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
