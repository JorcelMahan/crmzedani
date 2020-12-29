import React, { useEffect, useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import WrapperZapatos from '../../components/Zapatos/WrapperZapatos';
import Loader from '../../components/Loader';

const GET_ZAPATOS = gql`
  query zapatos($color: String, $talla: String) {
    zapatos(color: $color, talla: $talla) {
      id
      codigo
      stock
      image
      almacen
      color
      precioPublico
      precioPromotora
      precioPromocion
      tipo
      marca
      catalogo
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

function zapatos() {
  const [color, setColor] = useState('');
  const [talla, setTalla] = useState('');

  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_ZAPATOS,
    {
      variables: {
        color,
        talla,
      },
    }
  );
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return <Loader />;
  if (error) return `Error es aqui ${error.message}`;
  const { zapatos } = data;

  return (
    <WrapperZapatos
      zapatos={zapatos}
      almacen='Todos'
      setColor={setColor}
      setTalla={setTalla}
      talla={talla}
    />
  );
}

export default zapatos;
