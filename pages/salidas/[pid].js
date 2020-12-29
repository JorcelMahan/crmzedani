import React from 'react';
import { Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import { useQuery, useMutation, gql } from '@apollo/client';

const GET_SALIDA = gql`
  query salida($id: String!) {
    salida(id: $id) {
      codigo
      almacen
      retiradoPor
      retiradoHacia
      fechaSalida
      status
    }
  }
`;
const ShowSalida = () => {
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { loading, error, data } = useQuery(GET_SALIDA, {
    variables: {
      id,
    },
  });
  if (loading) return 'Loading';
  if (error) return `${error}`;
  const { salida } = data;
  return (
    <div>
      <Typography>{salida.almacen}</Typography>
    </div>
  );
};

export default ShowSalida;
