import React from 'react';
import SideBar from '../components/SideBar';
import { useQuery, gql } from '@apollo/client';

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
const Ventas = () => {
  const { loading, error, data } = useQuery(GET_VENTAS);
  if (loading) return 'Loading...';
  if (error) return `Error, ${error}`;
  console.log(data.ventas);
  return (
    <SideBar>
      <h2>Ventas</h2>
    </SideBar>
  );
};

export default Ventas;
