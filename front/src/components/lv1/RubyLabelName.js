import React from 'react'
import PropTypes from 'prop-types'
import { Typography, IconButton } from '@material-ui/core'
import { Info } from '@material-ui/icons'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  root: {
    width: 96,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  hint: {
    padding: 0,
    lineHeight: 16,
    marginLeft: 4,
  },
}))

const RubyLabelName = props => {
  const { name, isFocused, handleToggleHint } = props
  const classes = useStyles()

  return (
    <Typography className={classes.root}>
      <ruby>
        {name.kanji}
        <rt>{name.ruby}</rt>
      </ruby>
      <IconButton
        disabled={!isFocused}
        onClick={handleToggleHint}
        className={classes.hint}
      >
        <Info fontSize="small" />
      </IconButton>
    </Typography>
  )
}

RubyLabelName.propTypes = {
  name: PropTypes.shape({
    kanji: PropTypes.string.isRequired,
    ruby: PropTypes.string.isRequired,
  }).isRequired,
  isFocused: PropTypes.bool.isRequired,
  handleToggleHint: PropTypes.func.isRequired,
}

export default RubyLabelName
