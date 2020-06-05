import React from 'react';

import { useQuery, gql } from '@apollo/client';
import Main from "../layouts/Main/Main";

const GET_CLIENTES = gql`
  query getClientes {
    getClientes {
      id
      razonSocial
      nitoci
    }
  }
`;
const Clientes = () => {
  const { loading, error, data } = useQuery(GET_CLIENTES);
  if (loading) return 'loadong';
  if (error) return 'errror';
  const { getClientes } = data;
  return (
    <Main>
      <h1>Clientes</h1>
      {getClientes.map((c) => (
        <p>{c.id}</p>
      ))}
    </Main>
  );
};

export default Clientes;
