import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles'
import { TableCell, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    cursor: 'pointer',
    padding: 4,
    width: 560,
    position: 'relative',
  },
  thumbnail: {
    opacity: props => (props.checked ? 1 : 0),
    position: 'absolute',
    zIndex: 5,
    top: -72,
    left: 320,
    width: 200,
    height: 'auto',
    objectFit: 'cover',
    transition: '0.3s',
    pointerEvents: 'none',
  },
}))

const ToggledThumbnail = props => {
  const { katagami, selectedId, handleOpen, handleClose } = props
  const checked = selectedId === katagami.id
  const classes = useStyles({ checked })

  return (
    <TableCell
      className={classes.root}
      onMouseOver={() => handleOpen(katagami.id)}
      onMouseLeave={handleClose}
    >
      <img
        src={katagami.url}
        alt={`katagami-${katagami.id}`}
        className={classes.thumbnail}
      />
      <Typography color={checked ? 'secondary' : 'primary'}>
        {katagami.name}
      </Typography>
    </TableCell>
  )
}

ToggledThumbnail.propTypes = {
  katagami: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }).isRequired,
  selectedId: PropTypes.number.isRequired,
  handleOpen: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default ToggledThumbnail
