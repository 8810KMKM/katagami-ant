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
import { indigo } from '@material-ui/core/colors'
import { convertBoolToNumOfTiles, convertNumToBoolOfTiles } from 'libs/format'
import { saveSelectedTiles, savedTiles } from 'libs/tile'

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

  const handleSave = () => {
    setIsEditing(false)
    setTileIsSelectable(false)
    saveSelectedTiles(convertedSelectedTiles, i)
    setSelectedTiles(new Array(9).fill(false))
    setSelectedIndex(i + 1)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setTileIsSelectable(true)
    setSelectedTiles(convertNumToBoolOfTiles(savedTiles(i)))
    setSelectedIndex(i)
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
          <Button color="primary" onClick={handleSave}>
            <Check />
          </Button>
          <Button color="secondary" onClick={handleCancelEdit}>
            <Cancel />
          </Button>
        </div>
      )
    }
    return (
      <Button color="default" onClick={handleEdit} disabled={!isFocused}>
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
          <Grid item xs={4}>
            {name}
          </Grid>
          <Grid item xs={4} className={classes.tile}>
            {isEditing ? convertedSelectedTiles : savedTiles(i)}
          </Grid>
        </Grid>
      </ListItemText>
      <ActivatedButtons />
    </ListItem>
  )
}
