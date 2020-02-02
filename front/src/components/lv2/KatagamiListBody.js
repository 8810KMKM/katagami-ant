import React, { useState } from 'react'
import PropTypes from 'prop-types'
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

const KatagamiListBody = props => {
  const { page, rowsPerPage, katagamis, emptyRows, handleSelectId } = props
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

  const fixedId = i => i + 1 + page * rowsPerPage

  return (
    <TableBody>
      {katagamis.map((katagami, i) => (
        <TableRow key={katagami.id} className={classes.tableRow}>
          <TableCell align="right">{fixedId(i)}</TableCell>
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
              onClick={() =>
                (window.location.href = `/results/${katagami.id}/${fixedId(i)}`)
              }
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

KatagamiListBody.propTypes = {
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
  katagamis: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      status: PropTypes.number.isRequired,
    })
  ).isRequired,
  emptyRows: PropTypes.number,
  handleSelectId: PropTypes.func.isRequired,
}

export default KatagamiListBody
