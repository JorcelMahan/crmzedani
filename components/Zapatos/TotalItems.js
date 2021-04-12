import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { CircularProgress } from '@material-ui/core';

const TOTALSHOESANDACCESSORIES = gql`
  query totalShoesAndAccessories($almacen: String) {
    totalShoesAndAccessories(almacen: $almacen)
  }
`;

const TotalItems = ({ almacen }) => {
  const { loading, error, data } = useQuery(TOTALSHOESANDACCESSORIES, {
    variables: {
      almacen,
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
