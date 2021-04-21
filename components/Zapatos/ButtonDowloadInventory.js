import React, { useEffect } from 'react';
import { CSVLink } from 'react-csv';
import { makeStyles } from '@material-ui/styles';
import { Button, CircularProgress } from '@material-ui/core';
import { useQuery, gql } from '@apollo/client';

const GET_ZAPATOS_TO_DOWLOAD = gql`
  query zapatosToDownload($almacen: String, $tipo: String) {
    zapatosToDownload(almacen: $almacen, tipo: $tipo) {
      codigo
      almacen
      tipo
      stock
      color
      tallas {
        t19
        t20
        t21
        t22
        t23
        t24
        t25
        t26
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
        t46
      }
    }
  }
`;
const useStyles = makeStyles((theme) => ({
  exportButton: {
    marginRight: theme.spacing(1),
    backgroundColor: '#21A464',
    '&:hover': {
      backgroundColor: '#21A414',
    },
  },

  csvLink: {
    textDecoration: 'none',
    color: 'white',
  },
}));

let csvData = [];

const addProductsToDowload = (zapatos) => {
  csvData = [
    [
      '#',
      'almacen',
      'codigo',
      'color',
      'tipo',
      '19',
      '20',
      '21',
      '22',
      '23',
      '24',
      '25',
      '26',
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
      '46',
      'stock',
    ],
  ];
  if (zapatos.length > 0) {
    zapatos.forEach((zapato, i) => {
      csvData.push([
        ++i,
        zapato.almacen,
        zapato.codigo,
        zapato.color,
        zapato.tipo,
        zapato.tallas['t19'] ? zapato.tallas['t19'] : 0,
        zapato.tallas['t20'] ? zapato.tallas['t20'] : 0,
        zapato.tallas['t21'] ? zapato.tallas['t21'] : 0,
        zapato.tallas['t22'] ? zapato.tallas['t22'] : 0,
        zapato.tallas['t23'] ? zapato.tallas['t23'] : 0,
        zapato.tallas['t24'] ? zapato.tallas['t24'] : 0,
        zapato.tallas['t25'] ? zapato.tallas['t25'] : 0,
        zapato.tallas['t26'] ? zapato.tallas['t26'] : 0,
        zapato.tallas['t27'] ? zapato.tallas['t27'] : 0,
        zapato.tallas['t28'] ? zapato.tallas['t28'] : 0,
        zapato.tallas['t29'] ? zapato.tallas['t29'] : 0,
        zapato.tallas['t30'] ? zapato.tallas['t30'] : 0,
        zapato.tallas['t31'] ? zapato.tallas['t31'] : 0,
        zapato.tallas['t32'] ? zapato.tallas['t32'] : 0,
        zapato.tallas['t33'] ? zapato.tallas['t33'] : 0,
        zapato.tallas['t34'] ? zapato.tallas['t34'] : 0,
        zapato.tallas['t35'] ? zapato.tallas['t35'] : 0,
        zapato.tallas['t36'] ? zapato.tallas['t36'] : 0,
        zapato.tallas['t37'] ? zapato.tallas['t37'] : 0,
        zapato.tallas['t38'] ? zapato.tallas['t38'] : 0,
        zapato.tallas['t39'] ? zapato.tallas['t39'] : 0,
        zapato.tallas['t40'] ? zapato.tallas['t40'] : 0,
        zapato.tallas['t41'] ? zapato.tallas['t41'] : 0,
        zapato.tallas['t42'] ? zapato.tallas['t42'] : 0,
        zapato.tallas['t43'] ? zapato.tallas['t43'] : 0,
        zapato.tallas['t44'] ? zapato.tallas['t44'] : 0,
        zapato.tallas['t45'] ? zapato.tallas['t45'] : 0,
        zapato.tallas['t46'] ? zapato.tallas['t46'] : 0,
        zapato.stock,
      ]);
    });
  }
};
const ButtonDowloadInventory = React.memo(({ almacen, tipo }) => {
  const classes = useStyles();
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_ZAPATOS_TO_DOWLOAD,
    {
      variables: {
        almacen,
        tipo,
      },
    }
  );
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return <CircularProgress />;
  if (error) return `${error.message}`;
  const { zapatosToDownload } = data;
  addProductsToDowload(zapatosToDownload);

  return (
    <Button className={classes.exportButton}>
      <CSVLink
        data={csvData}
        filename={`inventario-${new Date().getDay()}-${new Date().getMonth()}-${new Date().getFullYear()}-${new Date().getHours()}:${new Date().getMinutes()}:${new Date().getSeconds()}.csv`}
        className={classes.csvLink}>
        Exportar
      </CSVLink>
    </Button>
  );
});

export default ButtonDowloadInventory;
