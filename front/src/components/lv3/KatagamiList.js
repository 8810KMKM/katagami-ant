import React, { useState, useEffect } from 'react'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  Typography,
  Tooltip,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { currentUser } from 'libs/auth'
import { fetchKatagamis } from 'libs/api'
import theme from 'libs/theme'
import PaginationActions from 'components/lv2/PaginationActions'
import KatagamiListBody from 'components/lv2/KatagamiListBody'
import Modal from 'components/lv2/Modal'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  antButton: {
    left: '85%',
    marginBottom: 16,
  },
  tableRow: {
    '& *': { fontWeight: 'normal' },
  },
  header: { backgroundColor: theme.palette.primary.light },
  footer: { marginTop: theme.spacing(20) },
  profile: { marginBottom: 40 },
}))

export default props => {
  const { ownedUser } = props
  const [katagamis, setKatagamis] = useState([])
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [selectedId, setSelectedId] = useState(0)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [ownedUserEmail, setOwnedUserEmail] = useState('')
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, count - page * rowsPerPage)
  const user = currentUser()
  const isInUserPage = ownedUser !== undefined
  const classes = useStyles(theme)

  const handlePaginate = ({ page, per }) => {
    const handleGetKatagamis = response => {
      setKatagamis(response.katagamis)
      setCount(response.count)
      setPage(page)
      if (isInUserPage) {
        setOwnedUserEmail(response.owned_user_email)
      }
    }
    fetchKatagamis({
      userId: user.id,
      page: page + 1,
      per: per,
      ownedUserId: isInUserPage ? ownedUser : 0,
      handleGetKatagamis: handleGetKatagamis,
    })
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleDoAnnotation = () => {
    window.location.href = `ant/${selectedId}/${user.id}/2`
  }

  const handleModalClose = () => {
    setModalIsOpen(false)
  }

  const handleSelectId = id => {
    setSelectedId(id)
    setModalIsOpen(true)
  }

  useEffect(() => {
    handlePaginate({ page: page, per: rowsPerPage })
  }, [page, rowsPerPage])

  return (
    <div className={classes.root}>
      {isInUserPage && (
        <div>
          <div className={classes.profile}>
            <Typography variant="h2">プロフィール</Typography>
            <Typography className={classes.email}>
              メールアドレス : {ownedUserEmail}
            </Typography>
          </div>
          <Typography variant="h2">アノテーション済みの型紙一覧</Typography>
        </div>
      )}
      <Table>
        <TableHead>
          <TableRow className={classes.header}>
            <TableCell align="right">id</TableCell>
            <TableCell align="left">ファイル名</TableCell>
            <Tooltip
              title="あなたがアノテーション済みのラベル数"
              placement="top"
            >
              <TableCell align="center">達成度</TableCell>
            </Tooltip>
            <Tooltip title="達成度1以上のユーザー数" placement="top">
              <TableCell align="right">ユーザー数</TableCell>
            </Tooltip>
            <TableCell align="center">結果一覧</TableCell>
            <TableCell align="center"></TableCell>
          </TableRow>
        </TableHead>
        <KatagamiListBody
          {...{
            katagamis,
            emptyRows,
            handleSelectId,
            isInUserPage,
          }}
          katagamis={katagamis}
          emptyRows={emptyRows}
          handleSelectId={handleSelectId}
          isInUserPage={isInUserPage}
        />
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
      <Modal
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        title="アノテーションを実行しますか？"
        text="1回約5分で完了します."
        yesText="はい"
        noText="いいえ"
        handleAnswerYes={handleDoAnnotation}
        handleAnswerNo={handleModalClose}
      />
    </div>
  )
}
