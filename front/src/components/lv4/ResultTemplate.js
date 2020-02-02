import React, { useState, useEffect } from 'react'
import { Grid } from '@material-ui/core'
import { Wallpaper } from '@material-ui/icons'
import { fetchKatagamiResult } from 'libs/api'
import { zeroPaddingOf, convertBoolToNumOfTiles } from 'libs/format'
import { MAX_DIVISION } from 'datas/tile'
import Container from 'components/lv1/Container'
import HeadLine from 'components/lv1/HeadLine'
import LoadingModal from 'components/lv1/LoadingModal'
import DivisionSelect from 'components/lv1/DivisionSelect'
import KatagamiImage from 'components/lv3/KatagamiImage'
import ResultDetail from 'components/lv3/ResultDetail'

export default props => {
  const { auth, katagamiId } = props
  const zeroPaddingId = zeroPaddingOf(katagamiId, 6)

  const [katagamiUrl, setKatagamiUrl] = useState('')
  const [katagamiWidth, setKatagamiWidth] = useState(0)
  const [katagamiHeight, setKatagamiHeight] = useState(0)
  const [selectedTiles, setSelectedTiles] = useState(
    new Array(MAX_DIVISION).fill(false)
  )
  const [annotationNum, setAnnotationNum] = useState(0)
  const [wholeLabels, setWholeLabels] = useState([])
  const [hasLabels, setHasLabels] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [activeIndex, setActiveIndex] = useState(-1)
  const [users, setUsers] = useState([])
  const [division, setDivision] = useState(12)
  const [selectIsOpen, setSelectIsOpen] = useState(false)

  const handleSelectUsers = (data, index) => {
    setActiveIndex(index)
    setUsers(data.users)
  }

  const handleToggleTile = number => {
    setSelectedTiles(
      selectedTiles.map((tile, i) => (i === number - 1 ? true : false))
    )
    setActiveIndex(-1)
    setUsers([])
  }

  const handleSelectOpen = () => {
    setSelectIsOpen(true)
  }

  const handleSelectClose = () => {
    setSelectIsOpen(false)
  }

  const handleChangeDivision = event => {
    setSelectedTiles(new Array(MAX_DIVISION).fill(false))
    handleToggleTile(1)
    setDivision(event.target.value)
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
      auth,
      katagamiId,
      handleGetKatagamiResult,
    })
    handleToggleTile(1)
  }, [auth, katagamiId])

  return isLoading ? (
    <LoadingModal
      isLoading={isLoading}
      isOpen={isLoading}
      loadingText="データを取得中です..."
      completeText="取得が完了しました！"
    />
  ) : (
    <Container>
      <HeadLine
        Icon={<Wallpaper fontSize="large" />}
        title={`Result (katagami - ${zeroPaddingId})`}
      />
      <DivisionSelect
        {...{
          division,
          selectIsOpen,
          handleChangeDivision,
          handleSelectOpen,
          handleSelectClose,
          tileIsSelectable: true,
        }}
      />
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
              division,
              selectedTiles,
              isResultPage: true,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <ResultDetail
            {...{
              hasLabels,
              division,
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
