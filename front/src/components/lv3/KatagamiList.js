import React, { useState, useEffect } from 'react'
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
import { fetchKatagamis } from 'libs/api'
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

export default function() {
  const [katagamis, setKatagamis] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [isLatest, setIsLatest] = useState(true)
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage)
  const classes = useStyles(theme)

  const handlePaginate = ({ page, per }) => {
    const handleGetKatagamis = response => {
      setKatagamis(response.katagamis)
      setCount(response.count)
      setPage(page)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchKatagamis({
      userId: currentUser().id,
      page: page + 1,
      per: per,
      handleGetKatagamis: handleGetKatagamis,
    })
  }

  useEffect(() => {
    setIsLoading(true)
    handlePaginate({
      page: page,
      per: rowsPerPage,
    })
  }, [isLatest])

  const PaginationActions = props => {
    const { count, page, rowsPerPage, onChangePage } = props

    const handleFirstPageButtonClick = event => {
      onChangePage(event, 0)
    }

    const handleBackButtonClick = event => {
      onChangePage(event, page - 1)
    }

    const handleNextButtonClick = event => {
      onChangePage(event, page + 1)
    }

    const handleLastPageButtonClick = event => {
      onChangePage(event, Math.ceil(count / rowsPerPage) - 1)
    }

    return (
      <div className={classes.footerButtons}>
        <IconButton onClick={handleFirstPageButtonClick} disabled={page === 0}>
          <FirstPage />
        </IconButton>
        <IconButton onClick={handleBackButtonClick} disabled={page === 0}>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
          <KeyboardArrowRight />
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        >
          <LastPage />
        </IconButton>
      </div>
    )
  }

  const handleChangePage = (event, newPage) => {
    handlePaginate({ page: newPage, per: rowsPerPage })
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    handlePaginate({ page: 0, per: parseInt(event.target.value, 10) })
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
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
          {emptyRows > 0 && (
            <TableRow style={{ height: 55 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter className={classes.footer}>
          <TableRow className={classes.tableRow}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={count}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={PaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
