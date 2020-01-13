import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  select: { width: 240 },
}))

export default props => {
  const {
    division,
    selectIsOpen,
    handleChangeDivision,
    handleSelectOpen,
    handleSelectClose,
    tileIsSelectable,
  } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel id="division-root-label" className={classes.input}>
          分割数
        </InputLabel>
        <Select
          labelId="division-root-label"
          id="division-root"
          className={classes.select}
          open={selectIsOpen}
          onOpen={handleSelectOpen}
          onClose={handleSelectClose}
          value={division}
          onChange={handleChangeDivision}
          disabled={!tileIsSelectable}
        >
          <MenuItem value={12}>4 × 3</MenuItem>
          <MenuItem value={24}>6 × 4</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
