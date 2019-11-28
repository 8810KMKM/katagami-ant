import React, { useState, useEffect } from 'react';
import Container from 'components/lv1/Container';
import { Grid } from '@material-ui/core';

export default function() {
  return (
    <Container>
      <Grid container>
        <Grid item xs={6}>Good night,</Grid>
        <Grid item xs={3}>world</Grid>
        <Grid item xs={3}>!!</Grid>
      </Grid>
    </Container>
  );
}
