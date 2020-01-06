import React from 'react'
import { TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Create, Equalizer } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  tableRow: {
    '& *': { fontWeight: 'normal' },
  },
  done: { color: theme.palette.primary.main },
  yet: { color: theme.palette.secondary.main },
  button: { padding: 4 },
}))

export default props => {
  const { katagamis, emptyRows, handleSelectId } = props
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
              実行済
            </TableCell>
          ) : (
            <TableCell align="center" className={classes.yet}>
              未実行
            </TableCell>
          )}
          <TableCell align="center">
            <IconButton className={classes.button}>
              <Equalizer />
            </IconButton>
          </TableCell>
          <TableCell>
            <IconButton
              color="primary"
              className={classes.button}
              onClick={() => handleSelectId(katagami.id)}
            >
              <Create />
            </IconButton>
          </TableCell>
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
