import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { currentUser } from 'libs/auth'
import { fetchKatagamis } from 'libs/api'
import theme from 'libs/theme'
import PaginationActions from 'components/lv2/PaginationActions'
import KatagamiListBody from 'components/lv2/KatagamiListBody'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  tableRow: {
    '& *': { fontWeight: 'normal' },
  },
  header: { backgroundColor: theme.palette.primary.light },
  footer: { marginTop: theme.spacing(20) },
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
          <TableRow className={classes.header}>
            <TableCell align="right">id</TableCell>
            <TableCell align="left">ファイル名</TableCell>
            <TableCell align="right">アノテーション件数</TableCell>
            <TableCell align="center">あなたの達成度</TableCell>
          </TableRow>
        </TableHead>
        <KatagamiListBody katagamis={katagamis} emptyRows={emptyRows} />
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
