import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { IconButton } from '@material-ui/core'
import { Edit, Cancel, Check } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  buttons: { width: 128 },
  single: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

const ActivatedAntButtons = props => {
  const {
    isEditingThis,
    isFocused,
    handleSave,
    handleEdit,
    handleCancelEdit,
  } = props
  const classes = useStyles()

  if (isEditingThis) {
    return (
      <div classes={classes.buttons}>
        <IconButton color="primary" onClick={handleSave}>
          <Check />
        </IconButton>
        <IconButton color="secondary" onClick={handleCancelEdit}>
          <Cancel />
        </IconButton>
      </div>
    )
  }
  return (
    <div className={classes.buttons + ' ' + classes.single}>
      <IconButton color="default" onClick={handleEdit} disabled={!isFocused}>
        <Edit />
      </IconButton>
    </div>
  )
}

ActivatedAntButtons.propTypes = {
  isEditingThis: PropTypes.bool,
  isFocused: PropTypes.bool,
  handleSave: PropTypes.func,
  handleEdit: PropTypes.func,
  handleCancelEdit: PropTypes.func,
}

export default ActivatedAntButtons
