import React from 'react';

import SideBar from '../components/SideBar';
import { useQuery, gql } from '@apollo/client';
import Router from 'next/router';
import ListZapatos from '../components/ListZapatos';
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

// const editPromotora = (id) => {
//   Router.push({
//     pathname: '/editPromotora/[id]',
//     query: {
//       id,
//     },
//   });
// };

export default function SimpleTable() {
  const { loading, error, data } = useQuery(GET_ZAPATOS);
  if (loading) return 'loading...';
  if (error) return 'error...';
  const { zapatos } = data;

  return (
    <SideBar>
      <ListZapatos zapatos={zapatos} />
    </SideBar>
  );
}
