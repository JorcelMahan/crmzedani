import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Input, Paper, Typography } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { gql, useQuery } from '@apollo/client';
import Loader from '../../components/Loader';

const SEARCH_VENTA_BY_NIT_CODIGO = gql`
  query customerPurchases($nitoci: String, $codigo: String) {
    customerPurchases(nitoci: $nitoci, codigo: $codigo) {
      productos {
        codigo
        color
        sizeSale
        quantity
        precioPublico
        precioPromocion
      }
      montoEfectivo
      factura
      cliente {
        nitoci
        razonSocial
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  paper: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
  },
  content: {
    marginTop: theme.spacing(2),
  },
  icon: {
    marginRight: theme.spacing(1),
    color: theme.palette.text.secondary,
  },
  input: {
    flexGrow: 1,
    fontSize: '14px',
    lineHeight: '16px',
    letterSpacing: '-0.05px',
  },
}));

const tienda = () => {
  const classes = useStyles();
  const [nitoci, setNitoci] = useState('');
  // const [codigo, setCodigo] = useState('');
  const [value, setValue] = useState('');
  const { loading, error, data } = useQuery(SEARCH_VENTA_BY_NIT_CODIGO, {
    variables: {
      nitoci,
    },
  });

  if (loading) return <Loader />;
  if (error) return `${error.message}`;
  const { customerPurchases } = data;
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setNitoci(value);
    }
  };
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography>Clientes</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper className={classes.paper}>
              <SearchIcon className={classes.icon} />
              <Input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyUp={handleKeyUp}
                type='text'
                className={classes.input}
                disableUnderline
                placeholder='NIT o CI'
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={12}>
            {customerPurchases ? (
              customerPurchases.map((c) => <p>{c.factura}</p>)
            ) : (
              <p>No hay datos</p>
            )}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default tienda;
