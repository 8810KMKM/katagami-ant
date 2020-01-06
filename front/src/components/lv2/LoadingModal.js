import React from 'react'
import { makeStyles } from '@material-ui/styles'
import { Modal, Typography, LinearProgress } from '@material-ui/core'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    width: 640,
    padding: '40px 24px 48px',
    backgroundColor: grey[50],
  },
  text: {
    padding: '24px 0',
  },
  line: {
    height: 8,
    borderRadius: 2,
    marginTop: 16,
  },
}))

export default props => {
  const { isLoading, isOpen, loadingText, completeText } = props
  const classes = useStyles()

  return (
    <Modal open={isOpen} className={classes.modal}>
      <div className={classes.modalBody}>
        {isLoading ? (
          <div>
            <Typography color="primary">{loadingText}</Typography>
            <LinearProgress className={classes.line} />
          </div>
        ) : (
          <div>
            <Typography color="secondary">{completeText}</Typography>
            <LinearProgress
              variant="determinate"
              color="secondary"
              className={classes.line}
              value={100}
            />
          </div>
        )}
      </div>
    </Modal>
  )
}
