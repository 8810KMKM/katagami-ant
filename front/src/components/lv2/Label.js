import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
  Typography,
} from '@material-ui/core'
import { RadioButtonUnchecked, RadioButtonChecked } from '@material-ui/icons'
import { convertBoolToNumOfTiles, convertNumToBoolOfTiles } from 'libs/format'
import {
  saveSelectedTiles,
  displayedTiles,
  saveDivision,
  getDivision,
} from 'libs/tile'
import RubyLabelName from 'components/lv1/RubyLabelName'
import ActivatedAntButtons from 'components/lv1/ActivatedAntButtons'

const useStyles = makeStyles(theme => ({
  tiles: { paddingTop: 6 },
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
    isEditing,
    setIsEditing,
    handleToggleHint,
    division,
    setDivision,
  } = props
  const classes = useStyles({ ruby: name.ruby })
  const isFocused = selectedIndex === i
  const isEditingThis = isFocused && isEditing
  const convertedSelectedTiles = convertBoolToNumOfTiles(selectedTiles)

  const handleSelectThis = () => {
    if (!(isEditing || isFocused)) {
      setTileIsSelectable(false)
      setSelectedTiles(convertNumToBoolOfTiles(displayedTiles(i)))
      setDivision(getDivision(i))
      setSelectedIndex(i)
    }
  }

  const handleSave = () => {
    setIsEditing(false)
    setTileIsSelectable(false)
    saveSelectedTiles(convertedSelectedTiles, i)
    saveDivision(division, i)
    setSelectedTiles(new Array(9).fill(false))
    setSelectedIndex(i + 1)
    setDivision(getDivision(i + 1))
  }

  const handleEdit = () => {
    setIsEditing(true)
    setTileIsSelectable(true)
    setSelectedTiles(convertNumToBoolOfTiles(displayedTiles(i)))
    setSelectedIndex(i)
  }

  const handleCancelEdit = () => {
    setSelectedTiles(new Array(9).fill(false))
    setTileIsSelectable(false)
    setIsEditing(false)
  }

  useEffect(() => {
    if (isEditingThis) {
      setSelectedTiles(convertNumToBoolOfTiles(displayedTiles(i)))
    }
  }, [isEditingThis, i, setSelectedTiles])

  const DisplayedTiles = () => (
    <Typography variant="body1" color="primary" className={classes.tiles}>
      {isEditingThis ? convertedSelectedTiles : displayedTiles(i)}
    </Typography>
  )

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
          <Grid item xs={4} className={classes.name}>
            <RubyLabelName {...{ name, isFocused, handleToggleHint }} />
          </Grid>
          <Grid item xs={4} className={classes.tile}>
            <DisplayedTiles />
          </Grid>
        </Grid>
      </ListItemText>
      <ActivatedAntButtons
        {...{
          isEditingThis,
          isFocused,
          handleSave,
          handleEdit,
          handleCancelEdit,
        }}
      />
    </ListItem>
  )
}
