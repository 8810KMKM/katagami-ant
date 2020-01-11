import React, { useState, useEffect } from 'react'
import { createAnnotation, fetchLabels, postHasLabels } from 'libs/api'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { initAllTiles } from 'libs/tile'
import { hasLabelsForPost, zeroPaddingOf } from 'libs/format'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import LoadingModal from 'components/lv1/LoadingModal'
import Modal from 'components/lv2/Modal'
import LabelList from 'components/lv3/LabelList'
import KatagamiImage from 'components/lv3/KatagamiImage'

const useStyles = makeStyles(theme => ({
  submit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    width: 180,
    marginLeft: 24,
  },
}))

export default props => {
  const { userId, katagamiId, num } = props.match.params

  const tileNumber = 9
  const zeroPaddingId = zeroPaddingOf(katagamiId, 6)
  const classes = useStyles()

  const [annotation, setAnnotation] = useState(null)
  const [katagamiUrl, setKatagamiUrl] = useState('')
  const [katagamiWidth, setKatagamiWidth] = useState(0)
  const [katagamiHeight, setKatagamiHeight] = useState(0)
  const [labels, setLabels] = useState([])
  const [selectedTiles, setSelectedTiles] = useState(
    new Array(tileNumber).fill(false)
  )
  const [tileIsSelectable, setTileIsSelectable] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [confirmModalIsOpen, setConfirmModalIsOpen] = useState(false)
  const [loadingModalIsOpen, setLoadingModalIsOpen] = useState(false)
  const [backModalIsOpen, setBackModalIsOpen] = useState(false)
  const [isPosting, setIsPosting] = useState(false)

  const handleToggleTile = number => {
    setSelectedTiles(
      selectedTiles.map((tile, i) => (i === number - 1 ? !tile : tile))
    )
  }

  const handleSaveAnnotation = () => {
    const handleCompleteAnnotation = response => {
      setIsPosting(false)
      setTimeout(() => {
        window.location.href = '/'
      }, 2000)
    }
    setIsPosting(true)
    setConfirmModalIsOpen(false)
    setLoadingModalIsOpen(true)
    setTimeout(() => {
      postHasLabels({
        annotationId: annotation,
        hasLabels: hasLabelsForPost(labels),
        handleCompleteAnnotation: handleCompleteAnnotation,
      })
    }, 2000)
  }

  const handleConfirmModalOpen = () => {
    setConfirmModalIsOpen(true)
  }

  const handleConfirmModalClose = () => {
    setConfirmModalIsOpen(false)
  }

  const handleBackToTop = () => {
    window.location.href = '/'
  }

  const handleBackModalOpen = () => {
    setBackModalIsOpen(true)
  }

  const handleBackModalClose = () => {
    setBackModalIsOpen(false)
  }

  // to fecth Katagami image
  useEffect(() => {
    const handleCreateAnnotation = response => {
      setAnnotation(response.id)
      setKatagamiUrl(response.katagami_url)
      setKatagamiWidth(response.katagami_width)
      setKatagamiHeight(response.katagami_height)
      setIsLoading(false)
    }
    setIsLoading(true)
    createAnnotation({
      userId,
      katagamiId,
      handleCreateAnnotation,
    })
  }, [katagamiId, userId, num])

  // to fetch labels
  useEffect(() => {
    const handleGetLabels = response => {
      setLabels(response)
    }
    setIsLoading(true)
    fetchLabels({
      userId,
      katagamiId,
      handleGetLabels,
      num,
    })
  }, [katagamiId, userId, num])

  // init diplayedTiles (localStorage)
  useEffect(() => initAllTiles(num), [katagamiId, userId, num])

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    )
  }

  return (
    <Container>
      <HeadLine>型紙 id : {zeroPaddingId}</HeadLine>
      <Grid container>
        <Grid item xs={7}>
          <KatagamiImage
            {...{
              katagamiUrl,
              katagamiHeight,
              katagamiWidth,
              tileIsSelectable,
              handleToggleTile,
              tileNumber,
              selectedTiles,
              fixedWidth: 640,
            }}
          />
        </Grid>
        <Grid item xs={5}>
          <LabelList
            {...{
              labels,
              tileIsSelectable,
              selectedTiles,
              setSelectedTiles,
              setTileIsSelectable,
              isEditing,
              setIsEditing,
            }}
          />
        </Grid>
      </Grid>
      <Grid className={classes.submit}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          onClick={handleConfirmModalOpen}
        >
          完了
        </Button>
        <Button
          variant="contained"
          className={classes.button}
          onClick={handleBackModalOpen}
        >
          中断してトップへ
        </Button>
      </Grid>
      <Modal
        isOpen={confirmModalIsOpen}
        onClose={handleConfirmModalClose}
        title="アノテーション結果を保存しますか？"
        text="「該当無し」という結果もデータとして保存されます."
        yesText="保存"
        noText="戻る"
        handleAnswerYes={handleSaveAnnotation}
        handleAnswerNo={handleConfirmModalClose}
      />
      <Modal
        isOpen={backModalIsOpen}
        onClose={handleConfirmModalClose}
        title="トップに戻りますか？"
        text="編集中の情報は保存されません."
        yesText="はい"
        noText="いいえ"
        handleAnswerYes={handleBackToTop}
        handleAnswerNo={handleBackModalClose}
      />
      <LoadingModal
        isLoading={isPosting}
        isOpen={loadingModalIsOpen}
        loadingText="結果を保存中です..."
        completeText="保存が完了しました！ ホームに戻ります..."
      />
    </Container>
  )
}
