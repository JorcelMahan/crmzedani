import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import ListZapatos from '../components/Zapatos/ListZapatos';
import ZapatoToolbar from '../components/Zapatos/ZapatoToolbar';
import { makeStyles } from '@material-ui/core/styles';
import { useSearch, useFilterBy } from '../hooks/useSearch';

const GET_ZAPATOS = gql`
  query Zapatos {
    zapatos {
      id
      codigo
      stock
      image
      almacen
      color
      precioPublico
      tipo
      tallas {
        t27
        t28
        t29
        t30
        t31
        t32
        t33
        t34
        t35
        t36
        t37
        t38
        t39
        t40
        t41
        t42
        t43
        t44
        t45
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
}));

const WrapperZapatos = ({ zapatos }) => {
  const classes = useStyles();
  const { field, setfield, filteredElem } = useFilterBy(
    zapatos,
    'tipo',
    'todos'
  );
  const { query, setQuery, filteredItems } = useSearch(filteredElem, 'codigo');

  const csvData = [
    [
      '#',
      'codigo',
      'color',
      '27',
      '28',
      '29',
      '30',
      '31',
      '32',
      '33',
      '34',
      '35',
      '36',
      '37',
      '38',
      '39',
      '40',
      '41',
      '42',
      '43',
      '44',
      '45',
      'stock',
    ],
  ];

  return (
    <div className={classes.root}>
      <ZapatoToolbar
        csvData={csvData}
        query={query}
        setQuery={setQuery}
        field={field}
        setfield={setfield}
      />
      <div className={classes.content}>
        <ListZapatos zapatos={filteredItems} csvData={csvData} />
      </div>
    </div>
  );
};

function zapatos() {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_ZAPATOS
  );
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return 'Cargando...';
  if (error) return `Error ${error.message}`;
  const { zapatos } = data;

  return <WrapperZapatos zapatos={zapatos} />;
}
export default zapatos;
