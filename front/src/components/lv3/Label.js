import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import { ListItem, ListItemIcon, ListItemText, Button } from '@material-ui/core'
import { RadioButtonUnchecked, RadioButtonChecked } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const {
    name,
    i,
    selectedIndex,
    setSelectedIndex,
    tileIsSelectable,
    setTileIsSelectable,
  } = props
  const classes = useStyles()
  const isFocused = selectedIndex === i

  const handleTileSelectabe = () => {
    setTileIsSelectable(true)
  }

  const handleTileUnselectabe = () => {
    setTileIsSelectable(false)
  }

  const handleSelectThis = () => {
    setSelectedIndex(i)
  }

  const handleMoveToNext = () => {
    setTimeout(setSelectedIndex(i + 1), 1000)
  }

  return (
    <ListItem selected={selectedIndex == i}>
      <ListItemIcon onClick={handleSelectThis}>
        {isFocused ? (
          <RadioButtonChecked color="primary" />
        ) : (
          <RadioButtonUnchecked />
        )}
      </ListItemIcon>
      <ListItemText>{name}</ListItemText>
      {isFocused && tileIsSelectable ? (
        <div>
          <Button color="primary" onClick={handleTileSelectabe}>
            保存
          </Button>
          <Button color="secondary" onClick={handleTileUnselectabe}>
            戻る
          </Button>
        </div>
      ) : (
        <div>
          <Button color="primary" onClick={handleTileSelectabe}>
            あり
          </Button>
          <Button color="secondary" onClick={handleMoveToNext}>
            なし
          </Button>
        </div>
      )}
    </ListItem>
  )
}
