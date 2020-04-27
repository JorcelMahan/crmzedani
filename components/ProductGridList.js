import React, { useContext } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import ProductList from './ProductList';
const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
}));

export default function ProductGridList({ products }) {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.cardGrid} maxWidth='md'>
        <Grid container spacing={4}>
          {products.map((shoe) => (
            <ProductList key={shoe.id} shoe={shoe} />
          ))}
        </Grid>
      </Container>
    </>
  );
}
