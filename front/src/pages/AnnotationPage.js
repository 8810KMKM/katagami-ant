import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from 'components/lv1/Container';
import { createAnnotation, fetchLabels } from 'lib/api';
import HeadLine from 'components/lv1/HeadLine';
import { Grid } from '@material-ui/core';
import LabelList from 'components/lv3/LabelList';

const useStyles = makeStyles(theme => ({
  root: {
    border: '1px solid'
  },
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
  const [labels, setLabels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [islatest, setIsLatest] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const handleCreateAnnotation = ({id, katagami_url}) => {
      setAnnotation(id);
      setKatagamiUrl(katagami_url);
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
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <HeadLine>アノテーション (Image {katagamiId})</HeadLine>
      <Grid container>
        <Grid item xs={6}>
        <img
        src={katagamiUrl}
        alt={`Image ${katagamiId}`}
        className={classes.katagami}
      />
        </Grid>
        <Grid item xs={6}>
          <LabelList labels={labels} />
        </Grid>
      </Grid>
    </Container>
  );
}
