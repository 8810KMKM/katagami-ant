import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Link } from 'react-router-dom';
import {
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Grid,
  Button,
  Box
} from '@material-ui/core';
import { AccountBox, ExitToApp } from '@material-ui/icons';
import { grey } from '@material-ui/core/colors';
import UserIcon from 'components/lv1/UserIcon';
import { currentUser } from 'lib/auth';

const useStyle = makeStyles(theme => ({
  link: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    alignItems: 'center',
    color: grey[900]
  },
  menuItem: {
    padding: '6px 32px'
  },
  icon: {
    marginTop: 5,
    marginRight: 3
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    width: 240,
    height: 120,
    padding: '16px 24px',
    backgroundColor: grey[50]
  },
  text: {
    paddingBottom: 8
  },
  button: {
    margin: '0 auto'
  }
}));

export default function ({ handleLogout }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const open = Boolean(anchorEl);
  const user = currentUser();
  const classes = useStyle();

  const handleSafetyLogout = () => {
    setModalIsOpen(false);
    setAnchorEl(false);
    handleLogout();
  }

  const handleModalOpen = () => {
    setAnchorEl(false);
    setModalIsOpen(true);
  }

  return (
    <div>
      <IconButton
        aria-label='current user'
        aria-haspopup='true'
        aria-controls='menu-appbar'
        onClick={e => setAnchorEl(e.currentTarget)}
      >
        <UserIcon size={40} email={user.email} />
      </IconButton>
      <Menu
        id='menu-appbar'
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
        <MenuItem className={classes.menuItem} onClick={() => setAnchorEl(false)}>
          <Link
            to={`/users/${user.id}`}
            className={classes.link}
          >
            <Box className={classes.icon}>
              <AccountBox />
            </Box>
            マイページ
          </Link>
        </MenuItem>
        <MenuItem className={classes.menuItem} onClick={handleModalOpen}>
          <Box className={classes.icon}>
            <ExitToApp />
          </Box>
         ログアウト
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
          <p className={classes.text}>ログアウトしますか？</p>
          <Grid container>
            <Grid item xs={8}>
              <Button
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={handleSafetyLogout}
              >
                はい
              </Button>
            </Grid>
            <Grid item xs={4}>
              <Button
                variant='contained'
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
  );
}
