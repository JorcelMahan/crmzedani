import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Main from '../layouts/Main/Main';
import { makeStyles } from '@material-ui/core/styles';
import VentasTable from '../components/Ventas/VentasTable';
const GET_VENTAS = gql`
  query ventas {
    ventas {
      id
      total
      fechaDeCompra
      productos {
        codigo
        color
        precioPublico
        image
        sizeSale
        quantity
      }
      cliente {
        nitoci
        razonSocial
      }
      idPromotora {
        nombres
        apellidos
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
const Ventas = () => {
  const { loading, error, data } = useQuery(GET_VENTAS);
  const classes = useStyles();
  if (loading) return 'Loading...';
  if (error) return `Error, ${error}`;
  const { ventas } = data;
  return (
    <Main>
      <div className={classes.root}>
        <div className={classes.content}>
          <VentasTable ventas={ventas} />
        </div>
      </div>
    </Main>
  );
};

export default Ventas;
