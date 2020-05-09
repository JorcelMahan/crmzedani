import React, { useState, useEffect, useContext } from 'react';
import Select from 'react-select';
import NewClient from './NewClient';
import VentasContext from '../context/ventas/VentasContext';
import { useQuery, gql } from '@apollo/client';
import { makeStyles } from '@material-ui/core/styles';

const GET_CLIENTES = gql`
  query getClientes {
    getClientes {
      id
      razonSocial
      nitoci
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  boxNewClient: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '1rem',
  },
}));
const ClientData = () => {
  const classes = useStyles();
  const { loading, error, data, startPolling, stopPolling } = useQuery(
    GET_CLIENTES
  );
  const [client, setclient] = useState('');
  const ventasContext = useContext(VentasContext);
  const { selectCliente } = ventasContext;
  useEffect(() => {
    selectCliente(client);
    startPolling(1000);
    return () => {
      stopPolling();
    };
  }, [client, startPolling, stopPolling]);

  if (loading) return 'Loading...';
  if (error) return 'Erroor';
  const { getClientes } = data;
  return (
    <div className={classes.boxNewClient}>
      <h2>Datos Cliente</h2>
      <NewClient />
      <Select
        onChange={(op) => setclient(op)}
        options={getClientes}
        placeholder='Seleccione el cliente'
        getOptionValue={(op) => op.id}
        getOptionLabel={(op) => `${op.nitoci} ${op.razonSocial}`}
        noOptionsMessage={() => 'No hay resultados'}
      />
    </div>
  );
};

export default ClientData;
