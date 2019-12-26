import React, { useState } from 'react'
import { makeStyles } from '@material-ui/styles'
import { Link } from 'react-router-dom'
import {
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Grid,
  Button,
  Typography,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core'
import { AccountBox, ExitToApp } from '@material-ui/icons'
import { grey } from '@material-ui/core/colors'
import UserIcon from 'components/lv1/UserIcon'
import { currentUser } from 'libs/auth'
import theme from 'libs/theme'

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
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    width: 280,
    height: 120,
    padding: '16px 24px',
    backgroundColor: grey[50],
  },
  text: {
    padding: '24px 0',
  },
  button: {
    width: 88,
    margin: '0 auto',
  },
}))

export default function({ handleLogout }) {
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
    setAnchorEl(false)
    setModalIsOpen(true)
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
          <Link to={`/users/${user.id}`} className={classes.link}>
            <ListItem>
              <ListItemIcon>
                <AccountBox color="primary" />
              </ListItemIcon>
              <ListItemText>
                <Typography color="primary">マイページ</Typography>
              </ListItemText>
            </ListItem>
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleModalOpen}>
          <ListItem>
            <ListItemIcon>
              <ExitToApp color="primary" />
            </ListItemIcon>
            <ListItemText>
              <Typography color="primary">ログアウト</Typography>
            </ListItemText>
          </ListItem>
        </MenuItem>
      </Menu>
      <Modal
        aria-labelledby="logunt-modal"
        aria-describedby="logout-modal-description"
        className={classes.modal}
        open={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
      >
        <div className={classes.modalBody}>
          <Typography className={classes.text}>ログアウトしますか？</Typography>
          <Grid container>
            <Grid item xs={8}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSafetyLogout}
              >
                はい
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={() => setModalIsOpen(false)}
              >
                いいえ
              </Button>
            </Grid>
          </Grid>
        </div>
      </Modal>
    </div>
  )
}
