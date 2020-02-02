import React, { useState } from 'react'
import { TableRow, TableCell, TableBody, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { Create, Equalizer } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import ToggledThumbnail from 'components/lv1/ToggledThumbnail'

const useStyles = makeStyles(theme => ({
  tableRow: {
    '& *': { fontWeight: 'normal' },
  },
  done: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
  },
  doing: { color: theme.palette.secondary.main },
  yet: { color: grey[800] },
  button: { padding: 4 },
}))

export default props => {
  const { katagamis, emptyRows, handleSelectId } = props
  const [selectedId, setSelectedId] = useState(0)
  const classes = useStyles()

  const UserStatus = ({ status }) =>
    status === 10 ? (
      <TableCell align="center" className={classes.done}>
        完了
      </TableCell>
    ) : (
      <TableCell
        align="center"
        className={status === 0 ? classes.yet : classes.doing}
      >
        {`${status} / 10`}
      </TableCell>
    )

  return (
    <TableBody>
      {katagamis.map(katagami => (
        <TableRow key={katagami.id} className={classes.tableRow}>
          <TableCell align="right">{katagami.id}</TableCell>
          <ToggledThumbnail
            katagami={katagami}
            selectedId={selectedId}
            handleOpen={setSelectedId}
            handleClose={() => setSelectedId(0)}
          />
          <UserStatus status={katagami.status} />
          <TableCell align="left">
            {katagami.status < 10 && (
              <IconButton
                color="secondary"
                className={classes.button}
                onClick={() => handleSelectId(katagami.id)}
              >
                <Create />
              </IconButton>
            )}
          </TableCell>
          <TableCell align="right">{katagami.annotation_num}</TableCell>
          <TableCell align="center">
            <IconButton
              className={classes.button}
              onClick={() => (window.location.href = `/results/${katagami.id}`)}
            >
              <Equalizer />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
      {emptyRows > 0 && (
        <TableRow style={{ height: 65 * emptyRows }}>
          <TableCell colSpan={6} />
        </TableRow>
      )}
    </TableBody>
  )
}
