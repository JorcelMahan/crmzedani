import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';

const TOTALSHOESANDACCESSORIES = gql`
  query totalShoesAndAccessories(
    $almacen: String
    $tipo: String
    $color: String
    $talla: String
    $stock: Boolean
    $codigo: String
  ) {
    totalShoesAndAccessories(
      almacen: $almacen
      tipo: $tipo
      color: $color
      talla: $talla
      stock: $stock
      codigo: $codigo
    )
  }
`;

const TotalItems = ({ almacen, tipo, color, talla, stock, codigo }) => {
  const { loading, error, data } = useQuery(TOTALSHOESANDACCESSORIES, {
    variables: {
      almacen,
      tipo,
      color,
      talla,
      stock,
      codigo
    },
  });
  if (loading) return <CircularProgress color='primary' />;
  if (error) return `${error.message}`;
  const { totalShoesAndAccessories } = data;
  const [totalShoes, totalAccesorios] = totalShoesAndAccessories;
  return (
    <div>
      Zapatos: {totalShoes} <br /> Accesorios: {totalAccesorios}
    </div>
  );
};

export default TotalItems;
