import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import Container from 'components/lv1/Container';
import { createAnnotation } from 'lib/api';
import HeadLine from 'components/lv1/HeadLine';

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
  const [isLoading, setIsLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(true);
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
  }, [isCreated]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <HeadLine>アノテーション (Image {katagamiId})</HeadLine>
      <img
        src={katagamiUrl}
        alt={`Image ${katagamiId}`}
        className={classes.katagami}
      />
    </Container>
  );
}
