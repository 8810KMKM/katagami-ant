import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  tile: {
    pointerEvents: props => (props.stay && !props.isSelected ? 'none' : ''),
    color: grey[50],
    border: '1px solid',
    padding: '2px 4px',
    fontSize: 40,
  },
  selected: {
    backgroundColor: props =>
      props.stay && props.isSelected
        ? 'rgba(133, 97, 197, 0.7)'
        : 'rgba(0, 121, 107, 0.7)',
  },
}))

const Tile = props => {
  const {
    number,
    square,
    isSelected,
    handleToggleTile,
    isResultPage,
    stay,
    setStay,
  } = props
  const classes = useStyles({ stay, isSelected })

  if (isResultPage) {
    const handleToggleStay = () => {
      setStay(!stay)
    }
    return (
      <Grid
        item
        xs={12 / square}
        className={
          isSelected ? classes.tile + ' ' + classes.selected : classes.tile
        }
        onMouseEnter={() => handleToggleTile(number)}
        onClick={handleToggleStay}
      />
    )
  }

  return (
    <Grid
      item
      xs={12 / square}
      className={
        isSelected ? classes.tile + ' ' + classes.selected : classes.tile
      }
      onClick={() => handleToggleTile(number)}
    />
  )
}

Tile.propTypes = {
  number: PropTypes.number.isRequired,
  square: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  handleToggleTile: PropTypes.func.isRequired,
  isResultPage: PropTypes.bool.isRequired,
  stay: PropTypes.bool,
  setStay: PropTypes.func,
}

export default Tile
