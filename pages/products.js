import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Input, Paper } from '@material-ui/core';

import { useQuery, useLazyQuery, gql } from '@apollo/client';
import Loader from '../components/Loader';
import SearchIcon from '@material-ui/icons/Search';
import TableProducts from '../components/Zapatos/TableProducts';

const GIFT_CARDS = gql`
  query giftCards($codigo: String) {
    giftCards(codigo: $codigo) {
      products {
        id
        codigo
        almacen
        precioPublico
        precioPromocion
        tipo
        status
        stock
        image
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },

  content: {
    marginTop: theme.spacing(2),
  },
  search: {
    borderRadius: '4px',
    alignItems: 'center',
    padding: theme.spacing(1),
    display: 'flex',
    flexBasis: 420,
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

const products = () => {
  const classes = useStyles();
  const [value, setValue] = useState('');
  const [codigo, setCodigo] = useState('');
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GIFT_CARDS,
    {
      variables: {
        codigo: codigo,
      },
    }
  );
  // const [executeSearch, { data, loading, error }] = useLazyQuery(GIFT_CARDS);

  // const handleKeyUp = (e) => {
  //   if (e.key === 'Enter') {
  //     executeSearch({
  //       variables: {
  //         codigo: value.toUpperCase(),
  //       },
  //     });
  //   }
  // };
  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      setCodigo(value.toUpperCase());
    }
  };
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  if (loading) return <Loader />;
  if (error) return `${error.message}`;

  return (
    <div className={classes.root}>
      <Paper className={classes.search}>
        <SearchIcon className={classes.icon} />
        <Input
          type='text'
          value={value}
          className={classes.input}
          disableUnderline
          placeholder='Introduce el codigo de la Gift Card'
          onChange={(e) => setValue(e.target.value)}
          onKeyUp={handleKeyUp}
        />
      </Paper>
      <div className={classes.content}>
        {data && <TableProducts giftCards={data.giftCards.products} />}
      </div>
    </div>
  );
};

export default products;
