import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import { zeroPaddingOf } from 'libs/format'
import { fetchKatagamiResult } from 'libs/api'
import LoadingModal from 'components/lv2/LoadingModal'
import { Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid',
  },
}))

export default props => {
  const { katagamiId } = props.match.params
  const zeroPaddingId = zeroPaddingOf(katagamiId, 6)

  const [katagamiUrl, setKatagamiUrl] = useState('')
  const [annotationNum, setAnnotationNum] = useState(0)
  const [wholeLabels, setWholeLabels] = useState([])
  const [hasLabels, setHasLabels] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    const handleGetKatagamiResult = response => {
      setKatagamiUrl(response.katagami_url)
      setAnnotationNum(response.annotation_num)
      setWholeLabels(response.whole_labels)
      setHasLabels(response.has_labels)
      setIsLoading(false)
    }
    setIsLoading(true)
    fetchKatagamiResult({
      katagamiId,
      handleGetKatagamiResult,
    })
  }, [katagamiId])

  return (
    <Container>
      <HeadLine>型紙 id : {zeroPaddingId}</HeadLine>
      <div>
        <Typography>{katagamiUrl}</Typography>
        <Typography>{annotationNum}</Typography>
        <Typography>{wholeLabels.length}</Typography>
        <Typography>{hasLabels.length}</Typography>
      </div>
      <LoadingModal
        isLoading={isLoading}
        isOpen={isLoading}
        loadingText="データを取得中です..."
        completeText="取得が完了しました！"
      />
    </Container>
  )
}
