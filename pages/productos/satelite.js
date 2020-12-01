import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import WrapperZapatos from '../../components/Zapatos/WrapperZapatos';
import Loader from '../../components/Loader';

const GET_ZAPATOS = gql`
  query zapatosAlmacen($almacen: String!) {
    zapatosAlmacen(almacen: $almacen) {
      id
      codigo
      stock
      image
      almacen
      color
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

const Satelite = () => {
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_ZAPATOS,
    {
      variables: { almacen: 'satelite' },
    }
  );
  useEffect(() => {
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);
  if (loading) return <Loader />;
  if (error) return `Error ${error.message}`;
  const { zapatosAlmacen } = data;

  return <WrapperZapatos zapatos={zapatosAlmacen} almacen='Satelite' />;
};
export default Satelite;
