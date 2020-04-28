import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import NewClient from './NewClient';
import VentasContext from '../context/ventas/VentasContext';
import { useQuery, gql } from '@apollo/client';
const GET_CLIENTES = gql`
  query getClientes {
    getClientes {
      id
      razonSocial
      nitoci
    }
  }
`;
const ClientData = () => {
  const { loading, error, data } = useQuery(GET_CLIENTES);
  const [client, setclient] = useState('');
  const ventasContext = useContext(VentasContext);
  const { selectCliente } = ventasContext;
  useEffect(() => {
    selectCliente(client.id);
  }, [client]);
  if (loading) return 'Loading...';
  if (error) return 'Erroor';
  const { getClientes } = data;
  return (
    <div>
      <Select
        onChange={(op) => setclient(op)}
        options={getClientes}
        placeholder='Seleccione el cliente'
        getOptionValue={(op) => op.id}
        getOptionLabel={(op) => `${op.nitoci} ${op.razonSocial}`}
        noOptionsMessage={() => 'No hay resultados'}
      />
      <br />
      Nuevo Cliente
      <NewClient />
    </div>
  );
};

export default ClientData;
