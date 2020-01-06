import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Modal, Button, Typography } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    width: 640,
    padding: '16px 24px 24px 24px',
    backgroundColor: grey[50],
  },
  text: { padding: '24px 0' },
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 24,
  },
  button: {
    width: 88,
    marginLeft: 24,
  },
}))

export default props => {
  const {
    isOpen,
    onClose,
    title,
    text,
    yesText,
    noText,
    handleAnswerYes,
    handleAnswerNo,
  } = props
  const classes = useStyles()

  return (
    <Modal
      aria-labelledby="logunt-modal"
      aria-describedby="logout-modal-description"
      className={classes.modal}
      open={isOpen}
      onClose={onClose}
    >
      <div className={classes.modalBody}>
        <Typography variant="h2" className={classes.text}>
          {title}
        </Typography>
        <Typography>{text}</Typography>
        <div className={classes.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={handleAnswerYes}
          >
            {yesText}
          </Button>
          <Button
            variant="contained"
            className={classes.button}
            onClick={handleAnswerNo}
          >
            {noText}
          </Button>
        </div>
      </div>
    </Modal>
  )
}
