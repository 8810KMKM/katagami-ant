import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Modal, Button, Typography, LinearProgress } from '@material-ui/core'
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
  text: {
    padding: '24px 0',
  },
  line: {
    height: 8,
    borderRadius: 2,
  },
}))

export default props => {
  const { isLoading, isOpen, loadingText, completeText } = props
  const classes = useStyles()

  return (
    <Modal open={isOpen} className={classes.modal}>
      <div className={classes.modalBody}>
        {isLoading ? (
          <Typography>{loadingText}</Typography>
        ) : (
          <Typography>{completeText}</Typography>
        )}
        <LinearProgress
          variant="determinate"
          className={classes.line}
          value={!isLoading}
        />
      </div>
    </Modal>
  )
}
