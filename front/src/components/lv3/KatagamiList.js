import React from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { currentUser } from 'libs/auth'
import theme from 'libs/theme'

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
  done: {
    color: theme.palette.primary.main,
  },
  yet: {
    color: theme.palette.secondary.main,
  },
}))

export default function(props) {
  const { katagamis } = props
  const user = currentUser()
  const classes = useStyles(theme)

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
            <TableRow key={katagami.id}>
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
      </Table>
    </div>
  )
}
