import React, { useState } from 'react'
// import { makeStyles } from '@material-ui/styles'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
} from '@material-ui/core'
import { RadioButtonUnchecked, RadioButtonChecked } from '@material-ui/icons'
import { selectedTileNumbers, selectedTilesArray } from 'libs/format'
import { saveSelectedTiles, savedTiles, tilesAreSaved } from 'libs/tile'

// const useStyles = makeStyles(theme => ({}))

export default props => {
  const {
    name,
    i,
    selectedIndex,
    setSelectedIndex,
    tileIsSelectable,
    selectedTiles,
    setSelectedTiles,
    setTileIsSelectable,
  } = props
  // const classes = useStyles()
  const isFocused = selectedIndex === i
  const [isSaved, setIsSaved] = useState(tilesAreSaved(i))
  const convertedSelectedTiles = selectedTileNumbers(selectedTiles)

  const displayedTiles = () => {
    if (isSaved) {
      return savedTiles(i)
    }
    if (isFocused) {
      return convertedSelectedTiles
    }
    return '-'
  }

  const ActivatedButtons = () => {
    if (isSaved) {
      return (
        <Button color="default" onClick={handleEditSelectedTiles}>
          編集
        </Button>
      )
    }
    if (isFocused && tileIsSelectable) {
      return (
        <div>
          <Button color="primary" onClick={handleSaveSelectedTiles}>
            保存
          </Button>
          <Button color="secondary" onClick={handleTileUnselectabe}>
            戻る
          </Button>
        </div>
      )
    }
    return (
      <div>
        <Button color="primary" onClick={handleTileSelectabe}>
          あり
        </Button>
        <Button color="secondary" onClick={handleMoveToNext}>
          なし
        </Button>
      </div>
    )
  }

  const handleTileSelectabe = () => {
    setTileIsSelectable(true)
  }

  const handleTileUnselectabe = () => {
    setTileIsSelectable(false)
  }

  const handleSelectThis = () => {
    setTileIsSelectable(isSaved)
    setSelectedIndex(i)
  }

  const handleMoveToNext = () => {
    setTileIsSelectable(false)
    setIsSaved(true)
    setSelectedIndex(i + 1)
  }

  const handleSaveSelectedTiles = () => {
    saveSelectedTiles(convertedSelectedTiles, i)
    setSelectedTiles(new Array(9).fill(false))
    setIsSaved(true)
    handleMoveToNext()
  }

  const handleEditSelectedTiles = () => {
    setSelectedTiles(selectedTilesArray(savedTiles(i)))
    setTileIsSelectable(true)
    setSelectedIndex(i)
    setIsSaved(false)
  }

  return (
    <ListItem selected={isFocused}>
      <ListItemIcon onClick={handleSelectThis}>
        {isFocused ? (
          <RadioButtonChecked color="primary" />
        ) : (
          <RadioButtonUnchecked />
        )}
      </ListItemIcon>
      <ListItemText>
        <Grid container>
          <Grid item xs={6}>
            {name}
          </Grid>
          <Grid item xs={6}>
            {displayedTiles()}
          </Grid>
        </Grid>
      </ListItemText>
      <ActivatedButtons />
    </ListItem>
  )
}
