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
  const { katagamis, emptyRows, handleSelectId, isInUserPage } = props
  const classes = useStyles()

  const UserStatus = ({ status }) =>
    status === 10 ? (
      <TableCell align="center" className={classes.done}>
        完了
      </TableCell>
    ) : (
      <TableCell align="center" className={classes.yet}>
        {`${status} / 10`}
      </TableCell>
    )

  return (
    <TableBody>
      {katagamis.map(katagami => (
        <TableRow key={katagami.id} className={classes.tableRow}>
          <TableCell align="right">{katagami.id}</TableCell>
          <TableCell className={classes.name}>{katagami.name}</TableCell>
          <UserStatus status={katagami.status} />
          <TableCell align="right">{katagami.annotation_num}</TableCell>
          <TableCell align="center">
            <IconButton
              className={classes.button}
              onClick={() => (window.location.href = `/results/${katagami.id}`)}
            >
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
