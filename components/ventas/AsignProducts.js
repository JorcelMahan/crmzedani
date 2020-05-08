import React from 'react';
import { useQuery, gql } from '@apollo/client';
import ProductGridList from '../ProductGridList';
import Link from 'next/link';
import CardBadge from '../CardBadge';
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

const AsignProducts = () => {
  const { loading, error, data } = useQuery(GET_ZAPATOS);
  if (loading) return 'Loading...';
  if (error) return `Error ${error.message}`;
  const { zapatos } = data;
  return (
    <>
      <h2>Elige los zapatos</h2>
      <CardBadge />
      <ProductGridList products={zapatos} />
    </>
  );
};

export default AsignProducts;
