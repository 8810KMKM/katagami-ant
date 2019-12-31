import React from 'react'
import { TableRow, TableCell, TableBody } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles(theme => ({
  tableRow: {
    '& *': { fontWeight: 'normal' },
  },
  name: { width: 600 },
  done: { color: theme.palette.primary.main },
  yet: { color: theme.palette.secondary.main },
}))

export default props => {
  const { katagamis, emptyRows } = props
  const classes = useStyles()
  return (
    <TableBody>
      {katagamis.map(katagami => (
        <TableRow key={katagami.id} className={classes.tableRow}>
          <TableCell align="right">{katagami.id}</TableCell>
          <TableCell className={classes.name}>{katagami.name}</TableCell>
          <TableCell align="right">{katagami.annotation_num}</TableCell>
          {katagami.done_by_current_user ? (
            <TableCell align="center" className={classes.done}>
              完了
            </TableCell>
          ) : (
            <TableCell align="center" className={classes.yet}>
              未達成
            </TableCell>
          )}
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 55 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}
