import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: 24,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  select: { width: 240 },
}))

export default props => {
  const {
    sorting,
    selectIsOpen,
    handleChangeSorting,
    handleSelectOpen,
    handleSelectClose,
  } = props
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <FormControl>
        <InputLabel id="sorting-root-label" className={classes.input}>
          並び順
        </InputLabel>
        <Select
          labelId="sorting-root-label"
          id="sorting-root"
          className={classes.select}
          open={selectIsOpen}
          onOpen={handleSelectOpen}
          onClose={handleSelectClose}
          value={sorting}
          onChange={handleChangeSorting}
        >
          <MenuItem value="">
            <em>指定無し</em>
          </MenuItem>
          <MenuItem value="2">ユーザー数が少ない順</MenuItem>
          <MenuItem value="3">達成度が低い順</MenuItem>
        </Select>
      </FormControl>
    </div>
  )
}
