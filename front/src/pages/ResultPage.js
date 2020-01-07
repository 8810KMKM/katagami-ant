import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/styles'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import { zeroPaddingOf, convertBoolToNumOfTiles } from 'libs/format'
import { fetchKatagamiResult } from 'libs/api'
import LoadingModal from 'components/lv2/LoadingModal'
import { Grid } from '@material-ui/core'
import KatagamiImage from 'components/lv3/KatagamiImage'
import ResultGraph from 'components/lv2/ResultGraph'
import ResultDetail from 'components/lv3/ResultDetail'

const useStyles = makeStyles(theme => ({
  root: {},
}))

export default props => {
  const { katagamiId } = props.match.params
  const zeroPaddingId = zeroPaddingOf(katagamiId, 6)
  const tileNumber = 9
  const classes = useStyles()

  const [katagamiUrl, setKatagamiUrl] = useState('')
  const [katagamiWidth, setKatagamiWidth] = useState(0)
  const [katagamiHeight, setKatagamiHeight] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState(
    new Array(tileNumber).fill(false)
  )
  const [annotationNum, setAnnotationNum] = useState(0)
  const [wholeLabels, setWholeLabels] = useState([])
  const [hasLabels, setHasLabels] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [users, setUsers] = useState([])

  const handleSelectUsers = (data, index) => {
    setActiveIndex(index)
    setUsers(data.users)
  }

  const handleToggleTile = number => {
    setSelectedTiles(
      selectedTiles.map((tile, i) => (i === number - 1 ? true : false))
    )
    setActiveIndex(-1)
    setUsers(new Array())
  }

  useEffect(() => {
    const handleGetKatagamiResult = response => {
      setKatagamiUrl(response.katagami_url)
      setKatagamiWidth(response.katagami_width)
      setKatagamiHeight(response.katagami_height)
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
    handleToggleTile(1)
  }, [katagamiId])

  return isLoading ? (
    <LoadingModal
      isLoading={isLoading}
      isOpen={isLoading}
      loadingText="データを取得中です..."
      completeText="取得が完了しました！"
    />
  ) : (
    <Container>
      <HeadLine>アノテーション結果 / 型紙 id : {zeroPaddingId}</HeadLine>
      <Grid container>
        <Grid item xs={6}>
          <KatagamiImage
            {...{
              katagamiUrl,
              katagamiHeight,
              katagamiWidth,
              tileIsSelectable: true,
              fixedWidth: 584,
              handleToggleTile,
              tileNumber,
              selectedTiles,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <ResultDetail
            {...{
              hasLabels,
              wholeLabels,
              users,
              activeIndex,
              handleSelectUsers,
              position: convertBoolToNumOfTiles(selectedTiles),
            }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
