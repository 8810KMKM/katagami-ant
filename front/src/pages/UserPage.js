import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/lv1/Container'
import LoadingModal from 'components/lv2/LoadingModal'
import HeadLine from 'components/lv1/HeadLine'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const { userId } = props.match.params
  const [isLoading, setIsLoading] = useState(false)

  const classes = useStyles()

  return isLoading ? (
    <LoadingModal
      isLoading={isLoading}
      isOpen={isLoading}
      loadingText="データを取得中です..."
      completeText="取得が完了しました！"
    />
  ) : (
    <Container>
        <HeadLine>{userId}</HeadLine>
    </Container>
  )
}
