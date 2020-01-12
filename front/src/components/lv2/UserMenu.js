import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { AccountBox, ExitToApp } from '@material-ui/icons'
import { currentUser } from 'libs/auth'
import theme from 'libs/theme'
import UserIcon from 'components/lv1/UserIcon'
import Modal from 'components/lv2/Modal'

const useStyle = makeStyles(theme => ({
  link: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  menuItem: {
    width: 320,
  },
  icon: {
    display: 'inlineBlock',
    marginTop: 5,
    marginRight: 8,
  },
}))

export default props => {
  const { handleLogout } = props
  const [anchorEl, setAnchorEl] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const open = Boolean(anchorEl)
  const user = currentUser()
  const classes = useStyle(theme)

  const handleSafetyLogout = () => {
    setModalIsOpen(false)
    setAnchorEl(false)
    handleLogout()
  }

  const handleModalOpen = () => {
    setAnchorEl(true)
    setModalIsOpen(true)
  }

  const handleModalClose = () => {
    setModalIsOpen(false)
  }

  return (
    <div>
      <IconButton
        aria-label="current user"
        aria-haspopup="true"
        aria-controls="menu-appbar"
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <UserIcon size={40} email={user.email} />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          className={classes.menuItem}
          onClick={() => setAnchorEl(false)}
        >
          <Link to={`/users/${user.id}/${user.email}`} className={classes.link}>
            <ListItemIcon>
              <AccountBox color="primary" />
            </ListItemIcon>
            <ListItemText primary="マイページ" />
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleModalOpen}>
          <ListItemIcon>
            <ExitToApp color="primary" />
          </ListItemIcon>
          <ListItemText primary="ログアウト" />
        </MenuItem>
      </Menu>
      <Modal
        isOpen={modalIsOpen}
        onClose={handleModalClose}
        title="ログアウトしますか？"
        text="ログアウトした場合, 編集中の情報は保存されません."
        yesText="はい"
        noText="いいえ"
        handleAnswerYes={handleSafetyLogout}
        handleAnswerNo={handleModalClose}
      />
    </div>
  )
}
