import React, { useState, useEffect } from 'react';
import Container from 'components/lv1/Container';
import { createAnnotation, fetchLabels } from 'lib/api';
import HeadLine from 'components/lv1/HeadLine';
import { Grid } from '@material-ui/core';
import LabelList from 'components/lv3/LabelList';
import KatagamiImage from 'components/lv3/KatagamiImage';

export default function (props) {
  const {
    userId,
    katagamiId
  } = props.match.params;

  const tileNumber = 9;

  const [annotation, setAnnotation] = useState(null);
  const [katagamiUrl, setKatagamiUrl] = useState('');
  const [katagamiWidth, setKatagamiWidth] = useState(0);
  const [katagamiHeight, setKatagamiHeight] = useState(0);
  const [labels, setLabels] = useState([]);
  const [selectedTiles, setSelectedTiles] = useState(new Array(tileNumber).fill(false));
  const [isLoading, setIsLoading] = useState(false);
  const [islatest, setIsLatest] = useState(true);

  const handleToggleTile = number => {
    setSelectedTiles(
      selectedTiles.map((tile, i) => i === number ? !tile : tile)
    );
  }

  useEffect(() => {
    console.log(selectedTiles);
  }, [selectedTiles]);

  useEffect(() => {
    const handleCreateAnnotation = response => {
      setAnnotation(response.id);
      setKatagamiUrl(response.katagami_url);
      setKatagamiWidth(response.katagami_width);
      setKatagamiHeight(response.katagami_height);
      setIsLoading(false);
    }
    setIsLoading(true);
    createAnnotation({
      userId,
      katagamiId,
      handleCreateAnnotation
    });
  }, [islatest]);

  useEffect(() => {
    const handleGetLabels = response => {
      setLabels(response);
    }
    setIsLoading(true);
    fetchLabels(handleGetLabels);
  }, [islatest]);

  if (isLoading) {
    return (
      <Container>
        <p>Loading...</p>
      </Container>
    );
  }

  return (
    <Container>
      <HeadLine>アノテーション (Image {katagamiId})</HeadLine>
      <Grid container>
        <Grid item xs={7}>
          <KatagamiImage
            katagamiUrl={katagamiUrl}
            katagamiHeight={katagamiHeight}
            katagamiWidth={katagamiWidth}
            dividing={tileNumber}
            isSelecteds={selectedTiles}
            handleToggleTile={handleToggleTile}
          />
        </Grid>
        <Grid item xs={5}>
          <LabelList labels={labels} />
        </Grid>
      </Grid>
    </Container>
  );
}
