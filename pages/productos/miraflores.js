import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useQuery, gql } from '@apollo/client';
import Loader from '../../components/Loader';

const WrapperZapatos = dynamic(() =>
  import('../../components/Zapatos/WrapperZapatos')
);

const GET_ZAPATOS = gql`
  query zapatosAlmacen($almacen: String!, $color: String, $talla: String) {
    zapatosAlmacen(almacen: $almacen, color: $color, talla: $talla) {
      id
      codigo
      stock
      image
      almacen
      color
      costo
      precioPublico
      precioPromotora
      precioPromocion
      catalogo
      marca
      tipo
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

const Miraflores = () => {
  const [color, setColor] = useState('');
  const [talla, setTalla] = useState('');
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_ZAPATOS,
    {
      variables: { almacen: 'miraflores', color, talla },
    }
  );

  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling, color, talla]);
  if (loading) return <Loader />;
  if (error) return `Error ${error}`;
  const { zapatosAlmacen } = data;

  return (
    <WrapperZapatos
      zapatos={zapatosAlmacen}
      almacen='Miraflores'
      setColor={setColor}
      setTalla={setTalla}
      talla={talla}
    />
  );
};
export default Miraflores;
