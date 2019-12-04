import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from 'components/lv1/Container';
import { createAnnotation, fetchLabels } from 'lib/api';
import HeadLine from 'components/lv1/HeadLine';
import { Grid } from '@material-ui/core';
import LabelList from 'components/lv3/LabelList';
import KatagamiImage from 'components/lv3/KatagamiImage';

const useStyles = makeStyles(theme => ({
  katagami: {
    width: '640px',
    height: 'auto'
  }
}));

export default function (props) {
  const {
    userId,
    katagamiId
  } = props.match.params;

  const [annotation, setAnnotation] = useState(null);
  const [katagamiUrl, setKatagamiUrl] = useState('');
  const [katagamiWidth, setKatagamiWidth] = useState(0);
  const [katagamiHeight, setKatagamiHeight] = useState(0);
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [islatest, setIsLatest] = useState(true);
  const classes = useStyles();

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
            dividing={9}
          />
        </Grid>
        <Grid item xs={5}>
          <LabelList labels={labels} />
        </Grid>
      </Grid>
    </Container>
  );
}
