import React from 'react'
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
}))

export default function(props) {
  const { katagamis } = props
  const classes = useStyles(theme)

  const PaginationActions = () => {
    return (
      <div className={classes.footer}>
        <IconButton>
          <FirstPage />
        </IconButton>
        <IconButton>
          <KeyboardArrowLeft />
        </IconButton>
        <IconButton>
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
        <TableFooter>
          <TableRow className={classes.tableRow}>
            <TablePagination ActionsComponent={PaginationActions} />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  )
}
