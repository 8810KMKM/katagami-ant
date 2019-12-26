import React, { useState, useEffect } from 'react'
import Container from 'components/lv1/Container'
import { createAnnotation, fetchLabels, postHasLabels } from 'libs/api'
import HeadLine from 'components/lv1/HeadLine'
import { Grid, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import LabelList from 'components/lv3/LabelList'
import KatagamiImage from 'components/lv3/KatagamiImage'
import { initAllTiles } from 'libs/tile'
import { hasLabelsForPost } from 'libs/format'

const useStyles = makeStyles(theme => ({
  submit: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
}))

export default function(props) {
  const { userId, katagamiId } = props.match.params

  const tileNumber = 9
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

  const handleToggleTile = number => {
    setSelectedTiles(
      selectedTiles.map((tile, i) => (i === number ? !tile : tile))
    )
  }

  const handleCompleteAnnotation = response => {
    console.log(response)
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
  }, [katagamiId, userId])

  // to fetch labels
  useEffect(() => {
    const handleGetLabels = response => {
      setLabels(response)
    }
    setIsLoading(true)
    fetchLabels(handleGetLabels)
  }, [katagamiId, userId])

  // init diplayedTiles (localStorage)
  useEffect(() => initAllTiles(3), [katagamiId, userId])

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    )
  }

  return (
    <Container>
      <HeadLine>アノテーション (Image {katagamiId})</HeadLine>
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
          color="secondary"
          onClick={() =>
            postHasLabels({
              annotationId: annotation,
              hasLabels: hasLabelsForPost(labels),
              handleCompleteAnnotation: handleCompleteAnnotation,
            })
          }
        >
          完了
        </Button>
      </Grid>
    </Container>
  )
}
