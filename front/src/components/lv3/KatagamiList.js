import React, { useState } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
  IconButton,
  TablePagination,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { currentUser } from 'libs/auth'
import theme from 'libs/theme'
import {
  FirstPage,
  KeyboardArrowRight,
  KeyboardArrowLeft,
  LastPage,
} from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  tableHead: {
    backgroundColor: theme.palette.primary.light,
  },
  tableRow: {
    '& *': {
      fontWeight: 'normal',
    },
  },
  done: {
    color: theme.palette.primary.main,
  },
  yet: {
    color: theme.palette.secondary.main,
  },
  footer: {
    marginTop: theme.spacing(20),
  },
  footerButtons: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))

export default function(props) {
  const { katagamis, handlePaginate } = props
  const [page, setPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const user = currentUser()
  const classes = useStyles(theme)

  const PaginationActions = () => {
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = () => {
      onChangePage({ page: 1, per: rowsPerPage })
    }

    const handleLastPageButtonClick = () => {
      onChangePage({ page: 0, per: rowsPerPage })
    }

    return (
      <div className={classes.footerButtons}>
        <IconButton>
          <FirstPage />
        </IconButton>
        <IconButton>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton onClick={() => console.log('hoge')}>
          <KeyboardArrowRight />
        </IconButton>
        <IconButton>
          <LastPage />
        </IconButton>
      </div>
    )
  }

  return (
    <div className={classes.root}>
      <Table>
        <TableHead>
          <TableRow className={classes.tableHead}>
            <TableCell align="right">id</TableCell>
            <TableCell align="left">ファイル名</TableCell>
            <TableCell align="right">アノテーション件数</TableCell>
            <TableCell align="center">あなたの達成度</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {katagamis.map(katagami => (
            <TableRow key={katagami.id} className={classes.tableRow}>
              <TableCell align="right">{katagami.id}</TableCell>
              <TableCell>{katagami.name}</TableCell>
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
        </TableBody>
        <TableFooter className={classes.footer}>
          <TableRow className={classes.tableRow}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={10}
              rowsPerPage={5}
              page={0}
              onChangePage={handlePaginate}
              onChangeRowsPerPage={handlePaginate}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
