import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/lv1/Container'
import LoadingModal from 'components/lv2/LoadingModal'
import HeadLine from 'components/lv1/HeadLine'
import { fetchUser } from 'libs/api'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const { userId } = props.match.params
  const [email, setEmail] = useState('')
  const [katagamis, setKatagamis] = useState([])
  const [annotationNum, setAnnotationNum] = useState(0)
  const [isLoading, setIsLoading] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    const handleGetUser = response => {
      setEmail(response.email)
      setKatagamis(response.katagamis)
      setAnnotationNum(response.katagamis.length)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchUser({ userId, handleGetUser })
  }, [userId])

  return isLoading ? (
    <LoadingModal
      isLoading={isLoading}
      isOpen={isLoading}
      loadingText="データを取得中です..."
      completeText="取得が完了しました！"
    />
  ) : (
    <Container>
      <HeadLine>{email} さん</HeadLine>
      <Typography>累計アノテーション件数 : {annotationNum}</Typography>
    </Container>
  )
}
