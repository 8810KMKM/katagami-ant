import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  Grid,
} from '@material-ui/core'
import {
  RadioButtonUnchecked,
  RadioButtonChecked,
  Edit,
  Cancel,
  Check,
} from '@material-ui/icons'
import { convertBoolToNumOfTiles, convertNumToBoolOfTiles } from 'libs/format'
import { saveSelectedTiles, savedTiles, tilesAreSaved } from 'libs/tile'
import { indigo } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  tile: {
    color: indigo[600],
  },
}))

export default props => {
  const {
    name,
    i,
    selectedIndex,
    setSelectedIndex,
    selectedTiles,
    setSelectedTiles,
    setTileIsSelectable,
  } = props
  const classes = useStyles()
  const isFocused = selectedIndex === i
  const [isEditing, setIsEditing] = useState(false)
  const convertedSelectedTiles = convertBoolToNumOfTiles(selectedTiles)

  const handleSelectThis = () => {
    setTileIsSelectable(false)
    setSelectedIndex(i)
  }

  const handleMoveToNext = () => {
    setTileIsSelectable(false)
    setSelectedIndex(i + 1)
  }

  const handleSaveSelectedTiles = () => {
    setIsEditing(false)
    setTileIsSelectable(false)
    saveSelectedTiles(convertedSelectedTiles, i)
    setSelectedTiles(new Array(9).fill(false))
    // handleMoveToNext()
  }

  const handleEditSelectedTiles = () => {
    setIsEditing(true)
    setTileIsSelectable(true)
    setSelectedIndex(i)
    setSelectedTiles(convertNumToBoolOfTiles(savedTiles(i)))
  }

  const handleCancelEdit = () => {
    setSelectedTiles(new Array(9).fill(false))
    setTileIsSelectable(false)
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditing) {
      setSelectedTiles(convertNumToBoolOfTiles(savedTiles(i)))
    }
  }, [isEditing])

  const ActivatedButtons = () => {
    if (isEditing) {
      return (
        <div>
          <Button color="primary" onClick={handleSaveSelectedTiles}>
            <Check />
          </Button>
          <Button color="secondary" onClick={handleCancelEdit}>
            <Cancel />
          </Button>
        </div>
      )
    }
    return (
      <Button color="default" onClick={handleEditSelectedTiles}>
        <Edit />
      </Button>
    )
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
          <Grid item xs={6} className={classes.tile}>
            {isEditing ? convertedSelectedTiles : savedTiles(i)}
          </Grid>
        </Grid>
      </ListItemText>
      <ActivatedButtons />
    </ListItem>
  )
}
